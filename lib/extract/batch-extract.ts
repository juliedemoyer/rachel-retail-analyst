/**
 * Batch-API variant of propose-fields.
 *
 * Anthropic's Message Batches API gives a 50% discount on input + output
 * tokens vs the synchronous /v1/messages endpoint. Tradeoff: results are
 * asynchronous with a 24h SLA (typically minutes for small batches).
 *
 * Design:
 *  - Build one request per company (same prompt + cache breakpoint as
 *    propose-fields.ts).
 *  - Submit as a single batch via raw HTTP (the @ai-sdk/anthropic wrapper
 *    does not expose the batches endpoint).
 *  - Poll for completion up to MAX_WAIT_MS (default 4 minutes — within
 *    Vercel cron maxDuration of 300s).
 *  - On completion: parse each result the same way propose-fields parses
 *    a synchronous response, and write candidates.
 *  - If the batch doesn't finish in the wait window, store the batch ID
 *    in Redis and return — a follow-up cron `?job=ir-extract-poll` (TODO)
 *    can collect the results later.
 *
 * Feature flag: enabled when IR_EXTRACT_USE_BATCH === "true". Defaults to
 * off. Safe to switch on and off per cron run.
 *
 * NOTE: this module does NOT route through generateTextTracked. Token
 * usage is recorded manually after results come back so the telemetry
 * still flows into rachel:tokens:ir_extract:* but at 50% effective rate.
 */

import type { Candidate } from "@/lib/profiles/store";
import {
  buildCompanyContext,
  readPdfExcerpt,
  type PdfExcerpt,
} from "./pdf-reader";
import { recordCall, estimateCostUsd } from "@/lib/telemetry/tokens";
import { redis } from "@/lib/redis";

const ANTHROPIC_API = "https://api.anthropic.com/v1";
const DEFAULT_MODEL = "claude-haiku-4-5";
const MAX_WAIT_MS = 4 * 60 * 1000; // 4 minutes
const POLL_INTERVAL_MS = 5_000;

// Reused from propose-fields.ts via duplication rather than circular import.
// If either side changes prompts, the other must be updated in lockstep.
// (Sync prompt is shared via the same buildSystemPrompt() — exported below.)

// ── Public API ─────────────────────────────────────────────────────────────────

export interface BatchInput {
  slug: string;
  companyName: string;
  pdfSources: string[];
}

export interface BatchExtractResult {
  batchId: string;
  status: "completed" | "in_progress" | "errored" | "expired";
  /** Candidates ready to write (only present when status === "completed"). */
  candidates?: Candidate[];
  /** Slugs that failed inside the batch. */
  failures?: Array<{ slug: string; error: string }>;
  /** Total input + output tokens across the batch (post-completion). */
  usage?: { inputTokens: number; outputTokens: number };
  /** Set when waited beyond MAX_WAIT_MS — caller should poll later. */
  pendingSlugs?: string[];
}

/**
 * Submit a batch of companies to Anthropic's Message Batches API and wait
 * for completion (up to MAX_WAIT_MS). Returns candidates on success.
 *
 * Caller is responsible for calling writeCandidate() on each returned item.
 */
export async function proposeFieldsBatch(
  inputs: BatchInput[],
  systemPromptBuilder: () => string,
  userPromptBuilder: (companyName: string, context: string) => string,
  parseResponse: (raw: string) => unknown,
): Promise<BatchExtractResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not set — cannot use batch API");
  }

  if (inputs.length === 0) {
    return { batchId: "empty", status: "completed", candidates: [] };
  }

  // 1. Build per-company contexts (re-using sync PDF reader).
  const modelId = process.env.EXTRACT_MODEL ?? DEFAULT_MODEL;
  const systemPrompt = systemPromptBuilder();

  const contexts: Array<{ slug: string; companyName: string; context: string }> = [];
  for (const input of inputs) {
    const excerpts: PdfExcerpt[] = [];
    for (const source of input.pdfSources) {
      try {
        const ex = await readPdfExcerpt(source);
        if (ex.text) excerpts.push(ex);
      } catch (e) {
        console.warn(`[batch-extract] ${input.slug}: PDF read failed for ${source}: ${(e as Error).message}`);
      }
    }
    if (excerpts.length === 0) {
      console.warn(`[batch-extract] ${input.slug}: no usable PDF excerpts — skipping`);
      continue;
    }
    const context = buildCompanyContext(input.companyName, excerpts);
    contexts.push({ slug: input.slug, companyName: input.companyName, context });
  }

  if (contexts.length === 0) {
    return { batchId: "empty", status: "completed", candidates: [] };
  }

  // 2. Construct batch requests.
  const batchRequests = contexts.map((c) => ({
    custom_id: c.slug,
    params: {
      model: modelId,
      max_tokens: 3_000,
      temperature: 0,
      messages: [
        {
          role: "user" as const,
          content: [
            {
              type: "text" as const,
              text: systemPrompt,
              cache_control: { type: "ephemeral" as const, ttl: "1h" as const },
            },
            {
              type: "text" as const,
              text: userPromptBuilder(c.companyName, c.context),
            },
          ],
        },
      ],
    },
  }));

  // 3. Submit batch.
  const submitRes = await fetch(`${ANTHROPIC_API}/messages/batches`, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ requests: batchRequests }),
  });
  if (!submitRes.ok) {
    const errBody = await submitRes.text();
    throw new Error(
      `Batch submit failed (${submitRes.status}): ${errBody.slice(0, 500)}`,
    );
  }
  const submitJson = (await submitRes.json()) as { id: string; processing_status: string };
  const batchId = submitJson.id;
  console.log(`[batch-extract] submitted batch ${batchId} with ${batchRequests.length} requests`);

  // Persist batch metadata so a follow-up poller can pick it up if we time out.
  await redis.set(
    `rachel:batches:${batchId}`,
    JSON.stringify({
      submittedAt: new Date().toISOString(),
      slugs: contexts.map((c) => c.slug),
      modelId,
    }),
    { ex: 60 * 60 * 48 }, // 48h TTL
  );

  // 4. Poll for completion.
  const started = Date.now();
  let lastStatus = "in_progress";
  while (Date.now() - started < MAX_WAIT_MS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    const statusRes = await fetch(`${ANTHROPIC_API}/messages/batches/${batchId}`, {
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
    });
    if (!statusRes.ok) {
      console.warn(`[batch-extract] poll failed (${statusRes.status}) — retrying`);
      continue;
    }
    const statusJson = (await statusRes.json()) as {
      processing_status: string;
      results_url?: string;
    };
    lastStatus = statusJson.processing_status;
    if (lastStatus === "ended") {
      return await collectBatchResults(batchId, apiKey, contexts, modelId, parseResponse);
    }
    if (lastStatus === "canceling" || lastStatus === "expired") {
      return {
        batchId,
        status: "errored",
        failures: contexts.map((c) => ({ slug: c.slug, error: `batch ${lastStatus}` })),
      };
    }
  }

  // Timed out — return pending so the caller can poll later.
  console.warn(
    `[batch-extract] batch ${batchId} not complete after ${MAX_WAIT_MS}ms (status=${lastStatus}). ` +
      `Pending slugs: ${contexts.map((c) => c.slug).join(", ")}`,
  );
  return {
    batchId,
    status: "in_progress",
    pendingSlugs: contexts.map((c) => c.slug),
  };
}

/**
 * Fetch and parse results from a completed batch. Records token telemetry.
 */
async function collectBatchResults(
  batchId: string,
  apiKey: string,
  contexts: Array<{ slug: string; companyName: string; context: string }>,
  modelId: string,
  parseResponse: (raw: string) => unknown,
): Promise<BatchExtractResult> {
  const detailsRes = await fetch(`${ANTHROPIC_API}/messages/batches/${batchId}`, {
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
  });
  const details = (await detailsRes.json()) as { results_url: string };
  if (!details.results_url) {
    throw new Error(`Batch ${batchId} ended without results_url`);
  }

  const resultsRes = await fetch(details.results_url, {
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
  });
  const resultsText = await resultsRes.text();

  // Results are JSONL: one JSON object per line.
  const candidates: Candidate[] = [];
  const failures: Array<{ slug: string; error: string }> = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const line of resultsText.split("\n").filter(Boolean)) {
    let row: {
      custom_id: string;
      result: {
        type: string;
        message?: {
          content: Array<{ type: string; text?: string }>;
          usage?: { input_tokens?: number; output_tokens?: number };
        };
        error?: { type: string; message: string };
      };
    };
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }
    const ctx = contexts.find((c) => c.slug === row.custom_id);
    if (!ctx) continue;

    if (row.result.type !== "succeeded" || !row.result.message) {
      failures.push({
        slug: row.custom_id,
        error: row.result.error?.message ?? `unexpected result type ${row.result.type}`,
      });
      continue;
    }

    const usage = row.result.message.usage;
    if (usage) {
      totalIn += usage.input_tokens ?? 0;
      totalOut += usage.output_tokens ?? 0;
    }

    const rawText = row.result.message.content
      .filter((p) => p.type === "text")
      .map((p) => p.text ?? "")
      .join("");

    let extraction: { earningsDate?: string; fields?: Record<string, unknown>; citations?: Record<string, { sourceUrl?: string; quote?: string }> };
    try {
      extraction = parseResponse(rawText) as typeof extraction;
    } catch (e) {
      failures.push({ slug: row.custom_id, error: `parse failed: ${(e as Error).message}` });
      continue;
    }

    if (!extraction.earningsDate || !extraction.fields) {
      failures.push({ slug: row.custom_id, error: "response missing earningsDate or fields" });
      continue;
    }

    const ts = new Date().toISOString();
    const citations: Candidate["citations"] = Object.fromEntries(
      Object.entries(extraction.citations ?? {}).map(([k, v]) => [
        k,
        { sourceUrl: v.sourceUrl ?? "", quote: v.quote },
      ]),
    );

    candidates.push({
      id: `${row.custom_id}:${ts}`,
      slug: row.custom_id,
      ts,
      earningsDate: extraction.earningsDate,
      proposedFields: extraction.fields as Candidate["proposedFields"],
      citations,
      status: "pending",
    });
  }

  // Record telemetry — single rollup for the whole batch. Apply the 50%
  // batch discount manually so the cost figure reflects what Anthropic
  // actually bills us.
  const fullCost = estimateCostUsd(modelId, {
    inputTokens: totalIn,
    outputTokens: totalOut,
  });
  await recordCall({
    workflow: "ir_extract",
    model: modelId,
    inputTokens: totalIn,
    outputTokens: totalOut,
    costUsd: fullCost * 0.5,
    at: new Date().toISOString(),
  });

  console.log(
    `[batch-extract] batch ${batchId} done — ${candidates.length} candidates, ${failures.length} failures, ` +
      `${totalIn} in + ${totalOut} out tokens, cost $${(fullCost * 0.5).toFixed(4)} (50% batch discount)`,
  );

  return {
    batchId,
    status: "completed",
    candidates,
    failures,
    usage: { inputTokens: totalIn, outputTokens: totalOut },
  };
}
