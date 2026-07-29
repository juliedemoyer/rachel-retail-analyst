/**
 * topics-proposer — Cluster recent pulse items, propose new Smart Topics.
 *
 * Runs as a Vercel cron weekly. Reads rachel:pulse + rachel:topics, asks
 * Claude to cluster the last 7 days of pulse into themes, and proposes any
 * cluster of >= 3 items not already covered as a topic candidate.
 *
 * Output goes to rachel:topics:candidates (not rachel:topics) — the owner reviews
 * and promotes. Never auto-publishes. Idempotent: same cluster proposed twice
 * is deduped on headline.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { redis } from "../redis";
import { generateTextTracked } from "../telemetry/tokens";

interface PulseItem {
  id: string | number;
  headline: string;
  summary?: string;
  source?: string;
  url?: string;
  ts: string;
}

interface Topic {
  id?: number;
  headline: string;
  tldr?: string;
  tags?: string[];
  companies?: string[];
}

interface TopicCandidate {
  id: string;
  proposed_at: string;
  headline: string;
  tldr: string;
  why_this_matters?: string;
  evidence: Array<{ pulse_id: string | number; headline: string; url?: string }>;
  suggested_tags: string[];
  suggested_companies: string[];
  reason: string;
}

interface ProposerResult {
  proposed: number;
  candidates: TopicCandidate[];
  raw_pulse_count: number;
  recent_pulse_count: number;
  error?: string;
}

const SYSTEM_PROMPT = `You are a senior retail intelligence analyst proposing new "smart topics" for a watchlist dashboard.

INPUTS:
- recent_pulse_items: news items from the last 7 days
- existing_topics: topics already on the dashboard

YOUR JOB:
1. Cluster pulse items by underlying theme.
2. For each cluster of >= 3 items, check whether the theme is already covered by an existing topic.
3. If NOT already covered, propose a new topic with both a TLDR and a WHY_THIS_MATTERS explanation.

OUTPUT FORMAT — strict JSON array, no prose or markdown:
[
  {
    "headline": "8-12 word punchy title",
    "tldr": "2-3 sentence summary for an EMEA retail analyst",
    "why_this_matters": "3-4 sentence business-impact explanation: why this matters to retail executives and AI vendors. Include: competitive advantage, financial impact, or strategic shift. Lead with the wedge.",
    "evidence_ids": ["pulse_id_1", "pulse_id_2", "pulse_id_3"],
    "tags": ["retail", "ai"],
    "companies": ["loreal", "carrefour"],
    "reason": "Why this is distinct from existing topics"
  }
]

TONE for why_this_matters:
- Executive-first: assume the reader is a CFO or C-suite retail leader, not a technologist
- Quantified when possible: link to margin impact, cost savings, or revenue uplift
- Vendor-perspective: what does this mean for the selling story
- Action-oriented: what does a retailer or vendor need to DO about this trend

If no new theme worth surfacing: return [].
Minimum 3 evidence items per topic. Maximum 4 new topics per run. Be ruthless about overlap with existing topics.`;

function parseArr<T>(raw: unknown): T[] {
  if (typeof raw === "string") {
    try { const p = JSON.parse(raw); return Array.isArray(p) ? p : []; } catch { return []; }
  }
  if (Array.isArray(raw)) return raw as T[];
  return [];
}

export async function proposeTopics(): Promise<ProposerResult> {
  const [pulseRaw, topicsRaw, candRaw] = await Promise.all([
    redis.get("rachel:pulse"),
    redis.get("rachel:topics"),
    redis.get("rachel:topics:candidates"),
  ]);
  const pulse: PulseItem[] = parseArr(pulseRaw);
  const topics: Topic[] = parseArr(topicsRaw);
  const existingCandidates: TopicCandidate[] = parseArr(candRaw);

  const cutoff = Date.now() - 7 * 86400000;
  const recent = pulse
    .filter((p) => {
      const t = new Date(p.ts ?? "").getTime();
      return !isNaN(t) && t >= cutoff;
    })
    .slice(0, 60);

  if (recent.length < 5) {
    return {
      proposed: 0,
      candidates: [],
      raw_pulse_count: pulse.length,
      recent_pulse_count: recent.length,
      error: "not_enough_recent_pulse",
    };
  }

  const userPayload = {
    today: new Date().toISOString().slice(0, 10),
    existing_topics: topics.map((t) => ({
      headline: t.headline,
      tldr: typeof t.tldr === "string" ? t.tldr.slice(0, 200) : "",
      tags: t.tags ?? [],
      companies: t.companies ?? [],
    })),
    recent_pulse_items: recent.map((p) => ({
      id: p.id,
      headline: p.headline,
      summary: p.summary?.slice(0, 220) ?? "",
      source: p.source ?? "",
      ts: typeof p.ts === "string" ? p.ts.slice(0, 10) : "",
    })),
  };

  let text = "";
  try {
    const out = await generateTextTracked({
      workflow: "topics_proposer",
      // Haiku 4.5 is sufficient for clustering pulse headlines + tldr matching.
      // Reasoning load is light: group by theme, check overlap with existing.
      // Saves ~4-5× cost vs Sonnet 4.6 with no observed quality loss for this task.
      model: anthropic("claude-haiku-4-5"),
      system: SYSTEM_PROMPT,
      prompt: JSON.stringify(userPayload),
      temperature: 0.4,
    });
    text = out.text;
  } catch (e) {
    return {
      proposed: 0,
      candidates: [],
      raw_pulse_count: pulse.length,
      recent_pulse_count: recent.length,
      error: `llm_error: ${e instanceof Error ? e.message : String(e)}`,
    };
  }

  let proposals: Array<{
    headline?: string;
    tldr?: string;
    why_this_matters?: string;
    evidence_ids?: (string | number)[];
    tags?: string[];
    companies?: string[];
    reason?: string;
  }> = [];
  try {
    const m = text.match(/\[[\s\S]*\]/);
    if (m) proposals = JSON.parse(m[0]);
  } catch {
    return {
      proposed: 0,
      candidates: [],
      raw_pulse_count: pulse.length,
      recent_pulse_count: recent.length,
      error: "parse_failed",
    };
  }

  const existingHeadlines = new Set(
    [...topics.map((t) => t.headline?.toLowerCase()), ...existingCandidates.map((c) => c.headline.toLowerCase())].filter(Boolean),
  );

  const candidates: TopicCandidate[] = proposals
    .filter((p) => p.headline && p.tldr && Array.isArray(p.evidence_ids) && p.evidence_ids.length >= 3)
    .filter((p) => !existingHeadlines.has(p.headline!.toLowerCase()))
    .slice(0, 4)
    .map((p) => ({
      id: `proposal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      proposed_at: new Date().toISOString(),
      headline: p.headline!,
      tldr: p.tldr!,
      why_this_matters: p.why_this_matters,
      evidence: p.evidence_ids!.map((id) => {
        const m = recent.find((r) => String(r.id) === String(id));
        return m
          ? { pulse_id: m.id, headline: m.headline, url: m.url }
          : { pulse_id: id, headline: "(unknown — id no longer in 7d window)" };
      }),
      suggested_tags: p.tags ?? [],
      suggested_companies: p.companies ?? [],
      reason: p.reason ?? "",
    }));

  if (candidates.length > 0) {
    const merged = [...candidates, ...existingCandidates].slice(0, 20);
    await redis.set("rachel:topics:candidates", JSON.stringify(merged));
  }

  return {
    proposed: candidates.length,
    candidates,
    raw_pulse_count: pulse.length,
    recent_pulse_count: recent.length,
  };
}
