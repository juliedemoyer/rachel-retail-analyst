/**
 * Ask Rachel — eval runner.
 *
 * Pipes 50 questions through the live /api/ask SSE endpoint, captures every
 * tool call and text delta, and produces an actionable diagnostics report.
 *
 * Usage:
 *   tsx scripts/eval/run-eval.ts                           # prod
 *   ASK_BASE_URL=http://localhost:3000 tsx scripts/eval/run-eval.ts
 *   tsx scripts/eval/run-eval.ts --concurrency 3 --filter wl-
 *
 * Output:
 *   scripts/eval/results/eval-<ISO>.json   raw transcripts
 *   scripts/eval/results/eval-<ISO>.md     human-readable report
 *
 * Goal: make every failure mode actionable. The report names the *fix lever*
 * for each broken question — KB ingest, retrieval threshold, system prompt,
 * tool wiring, or model upgrade.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { QUESTIONS, type EvalQuestion } from "./questions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = join(__dirname, "results");

const BASE = process.env.ASK_BASE_URL ?? "https://your-domain.example";
const ENDPOINT = `${BASE}/api/ask`;
const args = process.argv.slice(2);
const argVal = (flag: string) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const CONCURRENCY = Number(argVal("--concurrency") ?? 2);
const FILTER = argVal("--filter");
const TIMEOUT_MS = 90_000;
const INTER_REQUEST_MS = Number(argVal("--delay") ?? 0);

interface ToolCallTrace {
  toolName: string;
  input?: unknown;
  output?: unknown;
  resultFound?: boolean;
}

interface QuestionResult {
  q: EvalQuestion;
  ok: boolean;
  errorText?: string;
  httpError?: string;
  finalText: string;
  toolCalls: ToolCallTrace[];
  latencyMs: number;
  citationsFound: number;
  hasSoWhat: boolean;
  refusalDetected: boolean;
  mentionedAll: boolean;
  missingMentions: string[];
  grade: "pass" | "partial" | "fail";
  failReasons: string[];
  fixLever: string | null;
}

const REFUSAL_PATTERNS = [
  /don'?t have a grounded source/i,
  /no grounded source/i,
  /no source.*(knowledge base|kb)/i,
  /can'?t find.*(knowledge base|kb)/i,
  /knowledge base.*no.*results/i,
  /don'?t have access to.*internal/i,
  /outside my knowledge base/i,
  /not (currently )?a monitored account/i,
  /not on.*watchlist/i,
  /kb (search(es)?|returns?) (return(ed)?|surfaced|no) (no |zero )?results/i,
];

function detectRefusal(text: string): boolean {
  return REFUSAL_PATTERNS.some((re) => re.test(text));
}

function detectCitations(text: string): number {
  // System prompt mandates: [Source: {title} · {source type} · {date}]
  const matches = text.match(/\[\s*Source:\s*[^\]]+\]/gi);
  return matches?.length ?? 0;
}

function detectSoWhat(text: string): boolean {
  return /so what:/i.test(text);
}

async function runOne(q: EvalQuestion): Promise<QuestionResult> {
  const t0 = Date.now();
  const toolCalls: ToolCallTrace[] = [];
  let finalText = "";
  let errorText: string | undefined;
  let httpError: string | undefined;

  // toolCallId → trace
  const inflight = new Map<string, ToolCallTrace>();

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            parts: [{ type: "text", text: q.q }],
          },
        ],
      }),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      httpError = `HTTP ${res.status}`;
    }
    if (!res.body) {
      httpError ??= "no response body";
    } else {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let nlIdx: number;
        while ((nlIdx = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, nlIdx).trim();
          buf = buf.slice(nlIdx + 1);
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;

          try {
            const ev = JSON.parse(payload);
            switch (ev.type) {
              case "text-delta":
                finalText += ev.delta ?? "";
                break;
              case "text":
                // Some clients receive a whole-message text event.
                if (typeof ev.text === "string" && !finalText.includes(ev.text)) {
                  finalText += ev.text;
                }
                break;
              case "tool-input-available": {
                const trace: ToolCallTrace = {
                  toolName: ev.toolName,
                  input: ev.input,
                };
                inflight.set(ev.toolCallId, trace);
                toolCalls.push(trace);
                break;
              }
              case "tool-output-available": {
                const trace = inflight.get(ev.toolCallId);
                if (trace) {
                  trace.output = ev.output;
                  if (ev.output && typeof ev.output === "object" && "found" in ev.output) {
                    trace.resultFound = Boolean((ev.output as { found?: boolean }).found);
                  }
                }
                break;
              }
              case "error":
                errorText = ev.errorText ?? ev.error ?? "unknown stream error";
                break;
            }
          } catch {
            // ignore malformed line
          }
        }
      }
    }
  } catch (e) {
    httpError = e instanceof Error ? e.message : String(e);
  } finally {
    clearTimeout(timer);
  }

  const latencyMs = Date.now() - t0;
  const citationsFound = detectCitations(finalText);
  const hasSoWhat = detectSoWhat(finalText);
  const refusalDetected = detectRefusal(finalText);

  // Normalize accents and apostrophes before matching so "L'Oréal" matches "loreal".
  function normalize(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['']/g, "").toLowerCase();
  }
  const lowerNorm = normalize(finalText);
  const missingMentions = (q.shouldMention ?? []).filter((m) => !lowerNorm.includes(normalize(m)));
  const mentionedAll = missingMentions.length === 0;

  // ── Grade & diagnose ─────────────────────────────────────────────────────
  const failReasons: string[] = [];
  let fixLever: string | null = null;
  const ok = !errorText && !httpError && finalText.length > 0;

  if (!ok) {
    failReasons.push(`endpoint failed: ${errorText ?? httpError}`);
    if (errorText && /credit card/i.test(errorText)) {
      fixLever = "Vercel AI Gateway billing — add a card at vercel.com/dashboard → AI";
    } else if (errorText) {
      fixLever = "Investigate stream error in /api/ask — possible model/route bug";
    } else {
      fixLever = `Network/HTTP — ${httpError}`;
    }
  } else if (q.mustRefuse) {
    if (!refusalDetected) {
      failReasons.push("hallucinated answer for off-KB question");
      fixLever = "System prompt — strengthen rule 2 (refuse on empty KB) or raise minScore";
    }
  } else {
    // Honest refusal counts: an answer that detected no grounded source and refused
    // doesn't need a [Source: ...] tag — there's nothing to cite.
    if (citationsFound === 0 && !refusalDetected) {
      failReasons.push("no [Source: …] citation in answer");
      fixLever = "System prompt — citations rule not enforced; consider few-shot example";
    }
    if (!hasSoWhat) {
      failReasons.push("missing 'So what:' line");
      fixLever ??= "System prompt — 'So what:' rule not enforced";
    }
    if (!mentionedAll) {
      failReasons.push(`missing expected mentions: ${missingMentions.join(", ")}`);
      fixLever ??= "Retrieval — KB doc may be missing or below minScore (0.25)";
    }
    if (q.expectTools && q.expectTools.length > 0) {
      const called = new Set(toolCalls.map((t) => t.toolName));
      const missingTools = q.expectTools.filter((t) => !called.has(t));
      if (missingTools.length > 0) {
        failReasons.push(`expected tools not called: ${missingTools.join(", ")}`);
        fixLever ??= "Tool routing — system prompt or tool descriptions not steering correctly";
      }
    }
    // Empty-KB fallthrough: tool was called and found nothing, but agent answered anyway.
    const sawEmptyKb = toolCalls.some(
      (t) => t.toolName === "searchKnowledgeBase" && t.resultFound === false,
    );
    if (sawEmptyKb && !refusalDetected && citationsFound === 0) {
      failReasons.push("KB returned no results, agent answered anyway");
      fixLever = "Critical: agent ignoring empty-KB signal — strengthen system prompt rule 2";
    }
  }

  let grade: "pass" | "partial" | "fail";
  if (!ok || failReasons.length >= 3) grade = "fail";
  else if (failReasons.length === 0) grade = "pass";
  else grade = "partial";

  return {
    q, ok, errorText, httpError,
    finalText, toolCalls, latencyMs,
    citationsFound, hasSoWhat, refusalDetected,
    mentionedAll, missingMentions,
    grade, failReasons, fixLever,
  };
}

async function runWithConcurrency<T, R>(
  items: T[],
  fn: (x: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx]);
      if (INTER_REQUEST_MS > 0) {
        await new Promise((r) => setTimeout(r, INTER_REQUEST_MS));
      }
    }
  });
  await Promise.all(workers);
  return out;
}

function pct(n: number, d: number): string {
  if (d === 0) return "0%";
  return `${Math.round((n / d) * 100)}%`;
}

function buildReport(results: QuestionResult[]): string {
  const total = results.length;
  const pass = results.filter((r) => r.grade === "pass").length;
  const partial = results.filter((r) => r.grade === "partial").length;
  const fail = results.filter((r) => r.grade === "fail").length;
  const transportFail = results.filter((r) => !r.ok).length;
  const avgLatency = Math.round(
    results.reduce((s, r) => s + r.latencyMs, 0) / Math.max(total, 1),
  );

  const cats: Record<string, QuestionResult[]> = {};
  for (const r of results) {
    (cats[r.q.category] ??= []).push(r);
  }

  // Aggregate fix levers
  const leverCounts = new Map<string, number>();
  for (const r of results) {
    if (r.fixLever) leverCounts.set(r.fixLever, (leverCounts.get(r.fixLever) ?? 0) + 1);
  }
  const ranked = [...leverCounts.entries()].sort((a, b) => b[1] - a[1]);

  const lines: string[] = [];
  lines.push(`# Ask Rachel — Eval Report`);
  lines.push(`Generated ${new Date().toISOString()} against ${ENDPOINT}`);
  lines.push("");
  lines.push(`## Headline`);
  lines.push(`- **${pass}/${total} pass** (${pct(pass, total)}), ${partial} partial, ${fail} fail`);
  lines.push(`- Transport failures: ${transportFail} (endpoint did not return text)`);
  lines.push(`- Avg latency: ${avgLatency}ms`);
  lines.push("");

  lines.push(`## Top fix levers (most impactful changes, ranked by # of questions affected)`);
  if (ranked.length === 0) {
    lines.push(`- All questions passed cleanly.`);
  } else {
    for (const [lever, count] of ranked) {
      lines.push(`- **${count}× — ${lever}**`);
    }
  }
  lines.push("");

  lines.push(`## By category`);
  for (const [cat, list] of Object.entries(cats)) {
    const p = list.filter((r) => r.grade === "pass").length;
    lines.push(`- ${cat}: ${p}/${list.length} pass (${pct(p, list.length)})`);
  }
  lines.push("");

  lines.push(`## Per-question detail`);
  for (const r of results) {
    const icon = r.grade === "pass" ? "✓" : r.grade === "partial" ? "~" : "✗";
    lines.push(`### ${icon} ${r.q.id} · ${r.q.category} · ${r.q.difficulty}`);
    lines.push(`> ${r.q.q}`);
    lines.push("");
    lines.push(`- Latency: ${r.latencyMs}ms`);
    lines.push(`- Tool calls: ${r.toolCalls.map((t) => t.toolName).join(", ") || "none"}`);
    lines.push(`- Citations: ${r.citationsFound} | So-what: ${r.hasSoWhat ? "yes" : "no"} | Refusal: ${r.refusalDetected ? "yes" : "no"}`);
    if (r.failReasons.length > 0) {
      lines.push(`- Issues: ${r.failReasons.join("; ")}`);
    }
    if (r.fixLever) {
      lines.push(`- **Fix:** ${r.fixLever}`);
    }
    if (r.finalText) {
      const preview = r.finalText.replace(/\s+/g, " ").slice(0, 280);
      lines.push("");
      lines.push(`Answer preview: _${preview}${r.finalText.length > 280 ? "…" : ""}_`);
    } else if (r.errorText || r.httpError) {
      lines.push("");
      lines.push(`Error: ${r.errorText ?? r.httpError}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

async function main() {
  const filtered = FILTER ? QUESTIONS.filter((q) => q.id.includes(FILTER)) : QUESTIONS;
  console.log(`Running ${filtered.length} questions against ${ENDPOINT} (concurrency=${CONCURRENCY})…\n`);

  let done = 0;
  const results = await runWithConcurrency(filtered, async (q) => {
    const r = await runOne(q);
    done++;
    const icon = r.grade === "pass" ? "✓" : r.grade === "partial" ? "~" : "✗";
    console.log(`  ${icon} [${done}/${filtered.length}] ${q.id} · ${r.latencyMs}ms · ${r.failReasons[0] ?? "ok"}`);
    return r;
  }, CONCURRENCY);

  await mkdir(RESULTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = join(RESULTS_DIR, `eval-${stamp}.json`);
  const mdPath = join(RESULTS_DIR, `eval-${stamp}.md`);
  await writeFile(jsonPath, JSON.stringify(results, null, 2));
  await writeFile(mdPath, buildReport(results));

  const pass = results.filter((r) => r.grade === "pass").length;
  const partial = results.filter((r) => r.grade === "partial").length;
  const groundedAndCited = results.filter(
    (r) => r.ok && (r.citationsFound > 0 || r.refusalDetected),
  ).length;

  console.log(`\nDone. ${pass}/${results.length} pass.`);
  console.log(`  ${mdPath}`);
  console.log(`  ${jsonPath}`);

  // ── Fail-threshold gate (used by CI) ──────────────────────────────────────
  const failBelowArg = argVal("--fail-below");
  if (failBelowArg) {
    const threshold = Number(failBelowArg);
    const groundedAndCitedRate = groundedAndCited / Math.max(results.length, 1);
    console.log(`grounded&cited rate=${(groundedAndCitedRate * 100).toFixed(1)}% (threshold ${(threshold * 100).toFixed(1)}%)`);
    if (groundedAndCitedRate < threshold) {
      console.error("REGRESSION: grounded&cited rate below threshold");
      process.exitCode = 1;
    }
  }

  // ── Upload to Redis so the Ask Rachel UI badge picks it up ────────────────
  if (args.includes("--upload")) {
    const upstashUrl =
      process.env.UPSTASH_URL ??
      process.env.KV_REST_API_URL ??
      process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken =
      process.env.UPSTASH_TOKEN ??
      process.env.KV_REST_API_TOKEN ??
      process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!upstashUrl || !upstashToken) {
      console.warn("[--upload] Skipping: no Upstash Redis env vars set");
    } else {
      const week = new Date().toISOString().slice(0, 10);
      const byCategory: Record<string, { total: number; pass: number }> = {};
      for (const r of results) {
        const c = (byCategory[r.q.category] ??= { total: 0, pass: 0 });
        c.total += 1;
        if (r.grade === "pass") c.pass += 1;
      }
      const payload = {
        week,
        ranAt: new Date().toISOString(),
        totalQuestions: results.length,
        groundedAndCited,
        correct: pass,
        partial,
        passRate: pass / Math.max(results.length, 1),
        groundedAndCitedRate: groundedAndCited / Math.max(results.length, 1),
        byCategory,
        endpoint: ENDPOINT,
      };
      const url = `${upstashUrl}/set/rachel:eval:latest`;
      const res = await fetch(url, {
        method: "POST",
        headers: { authorization: `Bearer ${upstashToken}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        console.log(`  uploaded rachel:eval:latest (passRate=${(payload.passRate * 100).toFixed(1)}%)`);
        // Also archive under the weekly key for trend tracking.
        await fetch(`${upstashUrl}/set/rachel:eval:weekly:${week}`, {
          method: "POST",
          headers: { authorization: `Bearer ${upstashToken}`, "content-type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => undefined);
      } else {
        console.warn(`[--upload] Redis SET failed: ${res.status} ${await res.text()}`);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
