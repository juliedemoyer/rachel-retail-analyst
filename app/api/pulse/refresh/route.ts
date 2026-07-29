/**
 * /api/pulse/refresh — Grounded pulse generation.
 *
 * Replaces the hallucinated Claude generator with a proper agentic pass:
 * Rachel searches the knowledge base first, then calls postPulseItem only for
 * items grounded in KB results. No citation = no pulse item.
 *
 * Pillar 1 — kill hallucination.
 */

import { stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { pollAllFeeds } from "@/lib/sources/rss";
import { RACHEL_SYSTEM_PROMPT, rachelTools } from "@/lib/agents/rachel";
import { streamTextTracked } from "@/lib/telemetry/tokens";
import { redis } from "@/lib/redis";
import { SPRINT_BOARD_URL } from "@/lib/config";
import { PRIORITY_SEED_SLUGS } from "@/lib/watchlist-seed";

export const maxDuration = 60;

const REFRESH_PROMPT = `You are generating today's pulse feed update for Rachel.

Task: Search the knowledge base for the 3 most significant recent developments across retail, consumer, and AI and generate exactly 2–3 pulse items from what you find.

Rules:
1. Run at least 5 KB searches with varied queries to maximise the chance of hitting recent content:
   - Start broad: "retail news", "grocery AI", "fashion luxury", "consumer brand", "retail technology"
   - Then narrow: "EMEA retail AI", "Microsoft Google retail", "earnings results", "supply chain retail"
2. Only post items you can ground in KB results. Zero hallucination.
3. Freshness gate: for every candidate, check citation.publishedAt. If it is missing OR older than 14 days from today, SKIP the candidate. Do not call postPulseItem with stale sources.
4. When you call postPulseItem, pass the citation.publishedAt value as originalPublishedAt. If publishedAt is missing, skip the item entirely.
5. If the KB returns no fresh results across all queries, post nothing and return. Better empty than stale.
6. Aim to cover at least two different companies, sectors, or vendors across your items.

Run at least 5 KB searches before deciding what to post.`;

async function runGroundedRefresh() {
  // Prompt caching: RACHEL_SYSTEM_PROMPT identical every refresh run.
  // Cron fires every 2 days so cache TTL won't hit between runs, but within
  // a single run the agent may make multiple model calls (tool loop up to
  // stepCountIs(10)) which all share the system prompt — those benefit.
  const result = await streamTextTracked({
    workflow: "pulse_refresh",
    model: anthropic("claude-haiku-4-5-20251001"),
    messages: [
      {
        role: "system" as const,
        content: RACHEL_SYSTEM_PROMPT,
        providerOptions: {
          anthropic: { cacheControl: { type: "ephemeral" as const, ttl: "1h" as const } },
        },
      },
      { role: "user" as const, content: REFRESH_PROMPT },
    ],
    tools: rachelTools,
    stopWhen: stepCountIs(10),
  });

  // Collect tool outputs to find posted pulse items
  const postedItems: Array<{ id: string; headline: string }> = [];
  const steps = await result.steps;

  for (const step of steps) {
    for (const toolResult of step.toolResults ?? []) {
      const output = (toolResult as { toolName: string; output: unknown }).output;
      const toolName = (toolResult as { toolName: string }).toolName;
      if (
        toolName === "postPulseItem" &&
        typeof output === "object" &&
        output !== null &&
        (output as Record<string, unknown>).ok === true
      ) {
        const r = output as { id: string; headline: string };
        postedItems.push({ id: r.id, headline: r.headline });

        // Cross-agent: post a sprint task when a headline touches one of the
        // companies in config/watchlist.json -> prioritySeed. Leave
        // SPRINT_BOARD_URL unset and this whole branch is a no-op.
        const flagged = PRIORITY_SEED_SLUGS.find((slug) =>
          r.headline.toLowerCase().includes(slug.replace(/-/g, " ")),
        );
        if (SPRINT_BOARD_URL && flagged) {
          fetch(`${SPRINT_BOARD_URL}/api/tasks`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-dashboard-secret": process.env.DASHBOARD_SECRET ?? "",
            },
            body: JSON.stringify({
              agentId: "rachel",
              title: `${flagged} signal — ${r.headline.slice(0, 80)}`,
              description: `Grounded pulse item added: ${r.headline}`,
              priority: "high",
              estimatedHours: 0.25,
              tags: ["collab:josh"],
              source: "rachel-pulse-cron",
            }),
          }).catch(() => {
            // Non-fatal
          });
        }
      }
    }
  }

  return { added: postedItems.length, items: postedItems };
}

function patchSprintRun(startedAt: number, status: "ok" | "error", note: string): void {
  const secret = process.env.DASHBOARD_SECRET;
  if (!secret) return;
  fetch(`${SPRINT_BOARD_URL}/api/sprints`, {
    method: "PATCH",
    headers: { "content-type": "application/json", "x-dashboard-secret": secret },
    body: JSON.stringify({
      agent: "rachel",
      started_at: new Date(startedAt).toISOString(),
      finished_at: new Date().toISOString(),
      status,
      note: `[cron:pulse-refresh] ${note}`,
    }),
  }).catch(() => { /* non-fatal */ });
}

export async function GET(req: Request) {
  // Cron jobs hit GET; require Vercel cron header. Other access gated by password middleware (see proxy.ts).
  const cronSecret = req.headers.get("authorization");
  const allowed = cronSecret === `Bearer ${process.env.CRON_SECRET}`;
  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const t0 = Date.now();
  try {
    const result = await runGroundedRefresh();
    patchSprintRun(t0, "ok", "completed");
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(JSON.stringify({ level: "error", msg: "pulse_refresh_error", error: msg }));
    patchSprintRun(t0, "error", msg.slice(0, 200));
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(_req: Request) {
  // Admin-only: triggered from the Refresh Now button on /app/pulse.
  // Runs the cheap RSS poll first (deterministic baseline that always writes
  // to rachel:pulse), then the LLM-grounded refresh on top.
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rss = await pollAllFeeds().catch((e) => ({ error: String(e) }));
    const grounded = await runGroundedRefresh();
    return NextResponse.json({ rss, grounded });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
