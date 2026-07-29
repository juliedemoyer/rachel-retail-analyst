/**
 * Token telemetry — the wrapper every model call passes through.
 *
 * Pillar 3b-ii requires per-workflow, per-model accounting with a daily
 * cap so you can see what Rachel is costing you and heavy workflows
 * pause when the budget is hit. Every call must carry a `workflow`
 * label; unlabeled calls are rejected in dev to force compliance.
 *
 * Persistence model (Upstash Redis):
 *   rachel:tokens:{YYYY-MM-DD}:{workflow}:{model}
 *     → { promptTokens, completionTokens, costUsd, calls, at }
 *   rachel:tokens:budget → { dailyUsd }   (default  via getDailyBudgetUsd)
 *
 * Workflow labels (extend this union as new ones land):
 */

import { generateText, streamText, type LanguageModel } from "ai";

import { redis } from "../redis";

export type Workflow =
  | "daily_brief"
  | "pulse_refresh"
  | "ask_rachel"
  | "meeting_prep"
  | "weekly_synthesis"
  | "ingest_pdf"
  | "ingest_url"
  | "ir_scraper"
  | "ir_learn"
  | "lever_extraction"
  | "clustering_label"
  | "so_what"
  | "pattern_detection"
  | "provocation"
  | "scenario"
  | "thesis_builder"
  | "capability_benchmark"
  | "startup_scout"
  | "risk_map"
  | "vendor_lens_rank"
  | "vendor_lens_brief"
  | "framework_mece"
  | "framework_porter"
  | "framework_pyramid"
  | "framework_bcg"
  | "framework_hypothesis"
  | "framework_swot"
  | "framework_so_what_test"
  | "framework_product_classification"
  | "dev_probe"
  | "ir_extract"
  | "topics_proposer"
  | "ask_rachel_pdf";

export interface TokenUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  /**
   * Cache-read input tokens — billed at 0.1× the standard input rate by
   * Anthropic. Populated when a request hits a `cache_control` breakpoint
   * within the 5m / 1h TTL.
   */
  cacheReadTokens?: number;
  /**
   * Cache-write input tokens — billed at 1.25× the standard input rate
   * (the premium pays for storing the prefix). Populated on the first
   * request that establishes a cache entry.
   */
  cacheWriteTokens?: number;
  /**
   * Non-cached input tokens — billed at standard input rate. Populated
   * with the portion of the prompt that wasn't covered by a cache hit.
   */
  noCacheTokens?: number;
}

export interface ModelCallRecord {
  workflow: Workflow;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  at: string; // ISO
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  noCacheTokens?: number;
}

/**
 * Per-million-token USD prices. Keep this list tight — every entry is a
 * deliberate model choice. Falls back to zero if the model isn't listed
 * so unknown slugs still record token counts without pretending to know
 * the price.
 *
 * Aliases: callers pass either the gateway-namespaced priceKey
 * ("anthropic/claude-sonnet-4.6") or the raw Anthropic SDK modelId
 * ("claude-sonnet-4-6"). Both must resolve to the same price.
 */
const SONNET_46 = { input: 3, output: 15 };
const HAIKU_45  = { input: 1, output: 5 };
const GPT_54    = { input: 2.5, output: 10 };

const PRICE_PER_MILLION: Record<string, { input: number; output: number }> = {
  // Gateway / priceKey form (dots).
  "anthropic/claude-sonnet-4.6": SONNET_46,
  "anthropic/claude-haiku-4.5":  HAIKU_45,
  "openai/gpt-5.4":              GPT_54,

  // Raw Anthropic SDK modelId form (hyphens). These are what the model
  // field in rachel:tokens:* actually contains when callers pass modelId
  // directly to streamTextTracked. Without the aliases all rollups were
  // recording $0.00 since 2026-04. Fixed 2026-05-11.
  "claude-sonnet-4-6":           SONNET_46,
  "claude-haiku-4-5":            HAIKU_45,
  "claude-haiku-4-5-20251001":   HAIKU_45,
};

/**
 * Anthropic prompt-caching multipliers (relative to standard input price):
 *   - cache write: 1.25× (premium for storing the prefix)
 *   - cache read:  0.10× (savings for re-using the prefix within TTL)
 *   - non-cached:  1.00× (standard)
 *
 * When `usage` carries cache-token breakdown, this function bills each
 * bucket separately. When it doesn't (legacy callers), it falls back to
 * the flat `inputTokens × price.input` calculation — same behaviour as
 * before so no historical rollups become inconsistent.
 */
export function estimateCostUsd(model: string, usage: TokenUsage): number {
  const price = PRICE_PER_MILLION[model];
  if (!price) return 0;

  const output = usage.outputTokens ?? 0;
  const outputCost = (output * price.output) / 1_000_000;

  const hasCacheBreakdown =
    typeof usage.cacheReadTokens === "number" ||
    typeof usage.cacheWriteTokens === "number" ||
    typeof usage.noCacheTokens === "number";

  if (!hasCacheBreakdown) {
    const input = usage.inputTokens ?? 0;
    return (input * price.input) / 1_000_000 + outputCost;
  }

  const read   = usage.cacheReadTokens  ?? 0;
  const write  = usage.cacheWriteTokens ?? 0;
  const fresh  = usage.noCacheTokens    ?? 0;
  const inputCost =
    (fresh * price.input + read * price.input * 0.1 + write * price.input * 1.25) /
    1_000_000;
  return inputCost + outputCost;
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Record a single model call. Safe to call from anywhere — failures
 * during persistence log a warning but never throw (telemetry must
 * never break the user-facing call).
 */
export async function recordCall(record: ModelCallRecord): Promise<void> {
  try {
    const key = `rachel:tokens:${record.at.slice(0, 10)}:${record.workflow}:${record.model}`;
    await redis.hincrby(key, "inputTokens", record.inputTokens);
    await redis.hincrby(key, "outputTokens", record.outputTokens);
    await redis.hincrbyfloat(key, "costUsd", record.costUsd);
    await redis.hincrby(key, "calls", 1);
    // Cache breakdown — written even when 0 so an entry of 0 (vs missing key)
    // tells us "provider reported zero" vs "provider didn't report".
    if (typeof record.cacheReadTokens === "number") {
      await redis.hincrby(key, "cacheReadTokens", record.cacheReadTokens);
    }
    if (typeof record.cacheWriteTokens === "number") {
      await redis.hincrby(key, "cacheWriteTokens", record.cacheWriteTokens);
    }
    if (typeof record.noCacheTokens === "number") {
      await redis.hincrby(key, "noCacheTokens", record.noCacheTokens);
    }
    // Expire daily rollups after 90 days — you can still view them in
    // history, but we don't want unbounded growth.
    await redis.expire(key, 60 * 60 * 24 * 90);
  } catch (error) {
    console.warn(
      JSON.stringify({
        level: "warn",
        msg: "token_telemetry_write_failed",
        workflow: record.workflow,
        model: record.model,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
  }
}

const DEFAULT_DAILY_BUDGET_USD = 5;

export async function getDailyBudgetUsd(): Promise<number> {
  const v = await redis.get<number>("rachel:tokens:budget");
  return typeof v === "number" && v > 0 ? v : DEFAULT_DAILY_BUDGET_USD;
}

export async function setDailyBudgetUsd(usd: number): Promise<void> {
  if (!Number.isFinite(usd) || usd <= 0) {
    throw new Error("Daily budget must be a positive number");
  }
  await redis.set("rachel:tokens:budget", usd);
}

/**
 * Sum of today's cost across all workflows.
 */
export async function getTodayCostUsd(): Promise<number> {
  const pattern = `rachel:tokens:${todayKey()}:*`;
  const keys: string[] = [];
  let cursor: string | number = 0;
  do {
    const result: [string | number, string[]] = await redis.scan(cursor, {
      match: pattern,
      count: 200,
    });
    cursor = result[0];
    keys.push(...result[1]);
  } while (cursor !== 0 && cursor !== "0");

  if (keys.length === 0) return 0;
  let total = 0;
  for (const key of keys) {
    const cost = await redis.hget<number>(key, "costUsd");
    if (typeof cost === "number") total += cost;
  }
  return total;
}

/**
 * Hard categorization — heavy workflows pause at cap, light ones run.
 * Keep in sync with Pillar 3b-ii.
 */
const HEAVY_WORKFLOWS: ReadonlySet<Workflow> = new Set<Workflow>([
  "daily_brief",
  "weekly_synthesis",
  "pattern_detection",
  "clustering_label",
  "thesis_builder",
  "scenario",
  "vendor_lens_rank",
  "vendor_lens_brief",
  "capability_benchmark",
  "startup_scout",
  "risk_map",
  "ir_learn",
]);

export async function assertWithinBudget(workflow: Workflow): Promise<void> {
  if (!HEAVY_WORKFLOWS.has(workflow)) return;
  const [spent, cap] = await Promise.all([getTodayCostUsd(), getDailyBudgetUsd()]);
  if (spent >= cap) {
    throw new BudgetExceededError(workflow, spent, cap);
  }
}

export class BudgetExceededError extends Error {
  readonly workflow: Workflow;
  readonly spentUsd: number;
  readonly capUsd: number;
  constructor(workflow: Workflow, spentUsd: number, capUsd: number) {
    super(
      `Daily token budget exceeded: workflow=${workflow} spent=${spentUsd.toFixed(4)} cap=${capUsd}`,
    );
    this.name = "BudgetExceededError";
    this.workflow = workflow;
    this.spentUsd = spentUsd;
    this.capUsd = capUsd;
  }
}

/**
 * Wrap `generateText` with telemetry. Use this instead of importing
 * `generateText` directly in workflow code.
 */
export async function generateTextTracked(
  params: Parameters<typeof generateText>[0] & {
    workflow: Workflow;
    model: string | LanguageModel;
  },
): Promise<Awaited<ReturnType<typeof generateText>>> {
  const { workflow, ...rest } = params;
  await assertWithinBudget(workflow);
  const result = await generateText(rest);
  const modelId = typeof params.model === "string" ? params.model : params.model.modelId;
  const usage = extractTokenUsage(result.usage);
  await recordCall({
    workflow,
    model: modelId,
    inputTokens: usage.inputTokens ?? 0,
    outputTokens: usage.outputTokens ?? 0,
    cacheReadTokens: usage.cacheReadTokens,
    cacheWriteTokens: usage.cacheWriteTokens,
    noCacheTokens: usage.noCacheTokens,
    costUsd: estimateCostUsd(modelId, usage),
    at: new Date().toISOString(),
  });
  return result;
}

/**
 * Normalise the AI SDK usage object into TokenUsage with cache fields.
 *
 * AI SDK v6 exposes the cache breakdown via `inputTokenDetails`:
 *   { noCacheTokens, cacheReadTokens, cacheWriteTokens }
 *
 * `inputTokens` is the total across all three buckets.
 */
function extractTokenUsage(
  raw: { inputTokens?: number; outputTokens?: number; totalTokens?: number } & {
    inputTokenDetails?: {
      noCacheTokens?: number;
      cacheReadTokens?: number;
      cacheWriteTokens?: number;
    };
  } | undefined,
): TokenUsage {
  const details = raw?.inputTokenDetails;
  return {
    inputTokens: raw?.inputTokens,
    outputTokens: raw?.outputTokens,
    totalTokens: raw?.totalTokens,
    cacheReadTokens: details?.cacheReadTokens,
    cacheWriteTokens: details?.cacheWriteTokens,
    noCacheTokens: details?.noCacheTokens,
  };
}

/**
 * Wrap `streamText` with telemetry. Records usage in the `onFinish`
 * callback so streaming consumers don't have to await the full result.
 */
export function streamTextTracked(
  params: Parameters<typeof streamText>[0] & {
    workflow: Workflow;
    model: string | LanguageModel;
  },
): ReturnType<typeof streamText> {
  const { workflow, onFinish, ...rest } = params;
  const modelId = typeof params.model === "string" ? params.model : params.model.modelId;
  return streamText({
    ...rest,
    onFinish: async (event) => {
      const usage = extractTokenUsage(event.totalUsage);
      await recordCall({
        workflow,
        model: modelId,
        inputTokens: usage.inputTokens ?? 0,
        outputTokens: usage.outputTokens ?? 0,
        cacheReadTokens: usage.cacheReadTokens,
        cacheWriteTokens: usage.cacheWriteTokens,
        noCacheTokens: usage.noCacheTokens,
        costUsd: estimateCostUsd(modelId, usage),
        at: new Date().toISOString(),
      });
      if (onFinish) await onFinish(event);
    },
  });
}
