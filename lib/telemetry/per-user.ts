/**
 * Per-user usage metering for Ask Rachel.
 *
 * Tracks engagements (sessions), questions, tokens, and USD spend per user
 * across all-time, this-month, and today. Enforces a per-user monthly cap
 * to keep one heavy user from blowing the bill.
 *
 * Redis schema (Upstash hash per user):
 *   rachel:usage:user:{userId}                           lifetime totals
 *   rachel:usage:user:{userId}:month:{YYYY-MM}           monthly totals
 *   rachel:usage:user:{userId}:day:{YYYY-MM-DD}          daily totals
 *
 * Hash fields (same on all three):
 *   engagements   — incremented at session start (first question of a session)
 *   questions     — incremented per /api/ask call
 *   inputTokens
 *   outputTokens
 *   costUsd
 *   lastAt        — ISO timestamp of last activity
 *
 * Cap config:
 *   rachel:usage:cap:default  → { monthlyUsd: number, monthlyQuestions: number }
 *   rachel:usage:cap:{userId} → per-user override (optional)
 */

import { redis } from "../redis";

export interface UsageBucket {
  engagements: number;
  questions: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  lastAt: string | null;
}

export interface UsageSummary {
  userId: string;
  lifetime: UsageBucket;
  thisMonth: UsageBucket;
  today: UsageBucket;
  cap: UserCap;
  capStatus: {
    monthlyUsdRemaining: number;
    monthlyQuestionsRemaining: number;
    blocked: boolean;
    reason?: string;
  };
}

export interface UserCap {
  monthlyUsd: number;
  monthlyQuestions: number;
  /** True if this is the default cap, false if user has an override. */
  isDefault: boolean;
}

const DEFAULT_MONTHLY_USD = 5;
const DEFAULT_MONTHLY_QUESTIONS = 200;

function ymd(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
function ym(d = new Date()): string {
  return d.toISOString().slice(0, 7);
}

function lifetimeKey(userId: string) {
  return `rachel:usage:user:${userId}`;
}
function monthKey(userId: string, month = ym()) {
  return `rachel:usage:user:${userId}:month:${month}`;
}
function dayKey(userId: string, day = ymd()) {
  return `rachel:usage:user:${userId}:day:${day}`;
}

async function readBucket(key: string): Promise<UsageBucket> {
  const raw = (await redis.hgetall<Record<string, string | number>>(key)) ?? {};
  const num = (v: unknown) => (typeof v === "number" ? v : v ? Number(v) || 0 : 0);
  return {
    engagements: num(raw.engagements),
    questions: num(raw.questions),
    inputTokens: num(raw.inputTokens),
    outputTokens: num(raw.outputTokens),
    costUsd: num(raw.costUsd),
    lastAt: typeof raw.lastAt === "string" ? raw.lastAt : null,
  };
}

export async function getUserCap(userId: string): Promise<UserCap> {
  const override = await redis.get<{ monthlyUsd?: number; monthlyQuestions?: number }>(
    `rachel:usage:cap:${userId}`,
  );
  if (override && (override.monthlyUsd || override.monthlyQuestions)) {
    return {
      monthlyUsd: override.monthlyUsd ?? DEFAULT_MONTHLY_USD,
      monthlyQuestions: override.monthlyQuestions ?? DEFAULT_MONTHLY_QUESTIONS,
      isDefault: false,
    };
  }
  const def = await redis.get<{ monthlyUsd?: number; monthlyQuestions?: number }>(
    "rachel:usage:cap:default",
  );
  return {
    monthlyUsd: def?.monthlyUsd ?? DEFAULT_MONTHLY_USD,
    monthlyQuestions: def?.monthlyQuestions ?? DEFAULT_MONTHLY_QUESTIONS,
    isDefault: true,
  };
}

export async function setDefaultCap(c: { monthlyUsd: number; monthlyQuestions: number }) {
  await redis.set("rachel:usage:cap:default", c);
}

export async function setUserCap(
  userId: string,
  c: { monthlyUsd: number; monthlyQuestions: number },
) {
  await redis.set(`rachel:usage:cap:${userId}`, c);
}

/**
 * Check if the user is within their monthly cap. Call BEFORE the model call.
 * Returns `{ blocked: false }` to proceed, or `{ blocked: true, reason }` to refuse.
 */
export async function checkUserCap(userId: string): Promise<{
  blocked: boolean;
  reason?: string;
  cap: UserCap;
  spentUsd: number;
  questionsThisMonth: number;
}> {
  const cap = await getUserCap(userId);
  const month = await readBucket(monthKey(userId));
  if (month.costUsd >= cap.monthlyUsd) {
    return {
      blocked: true,
      reason: `Monthly USD cap reached ($${month.costUsd.toFixed(2)} / $${cap.monthlyUsd}). Resets at start of next month.`,
      cap,
      spentUsd: month.costUsd,
      questionsThisMonth: month.questions,
    };
  }
  if (month.questions >= cap.monthlyQuestions) {
    return {
      blocked: true,
      reason: `Monthly question cap reached (${month.questions} / ${cap.monthlyQuestions}). Resets at start of next month.`,
      cap,
      spentUsd: month.costUsd,
      questionsThisMonth: month.questions,
    };
  }
  return {
    blocked: false,
    cap,
    spentUsd: month.costUsd,
    questionsThisMonth: month.questions,
  };
}

/**
 * Record one Ask Rachel question. Writes to lifetime, this-month, and today
 * buckets atomically (best-effort — telemetry never throws).
 *
 * `isNewEngagement` should be true if this is the first question in a fresh
 * session/page-view; the caller decides what counts as a session boundary.
 */
export async function recordUserQuestion(args: {
  userId: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  isNewEngagement?: boolean;
}): Promise<void> {
  const { userId, inputTokens, outputTokens, costUsd, isNewEngagement } = args;
  const now = new Date().toISOString();
  const keys = [lifetimeKey(userId), monthKey(userId), dayKey(userId)];

  try {
    await Promise.all(
      keys.map(async (k) => {
        await redis.hincrby(k, "questions", 1);
        if (isNewEngagement) await redis.hincrby(k, "engagements", 1);
        if (inputTokens) await redis.hincrby(k, "inputTokens", inputTokens);
        if (outputTokens) await redis.hincrby(k, "outputTokens", outputTokens);
        if (costUsd) await redis.hincrbyfloat(k, "costUsd", costUsd);
        await redis.hset(k, { lastAt: now });
      }),
    );
    // Day rollups expire after 90 days; month rollups after 2 years.
    await redis.expire(dayKey(userId), 60 * 60 * 24 * 90);
    await redis.expire(monthKey(userId), 60 * 60 * 24 * 730);
  } catch (error) {
    console.warn(
      JSON.stringify({
        level: "warn",
        msg: "per_user_usage_write_failed",
        userId,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
  }
}

export async function getUserUsageSummary(userId: string): Promise<UsageSummary> {
  const [lifetime, thisMonth, today, cap] = await Promise.all([
    readBucket(lifetimeKey(userId)),
    readBucket(monthKey(userId)),
    readBucket(dayKey(userId)),
    getUserCap(userId),
  ]);
  const monthlyUsdRemaining = Math.max(0, cap.monthlyUsd - thisMonth.costUsd);
  const monthlyQuestionsRemaining = Math.max(0, cap.monthlyQuestions - thisMonth.questions);
  const blocked = thisMonth.costUsd >= cap.monthlyUsd || thisMonth.questions >= cap.monthlyQuestions;
  return {
    userId,
    lifetime,
    thisMonth,
    today,
    cap,
    capStatus: {
      monthlyUsdRemaining,
      monthlyQuestionsRemaining,
      blocked,
      reason: blocked
        ? thisMonth.costUsd >= cap.monthlyUsd
          ? "USD cap reached"
          : "question cap reached"
        : undefined,
    },
  };
}

/**
 * Scan every tracked user. Used by the admin usage endpoint.
 */
export async function listAllUserSummaries(): Promise<UsageSummary[]> {
  const ids = new Set<string>();
  let cursor: string | number = 0;
  do {
    const result: [string | number, string[]] = await redis.scan(cursor, {
      match: "rachel:usage:user:*",
      count: 200,
    });
    cursor = result[0];
    for (const key of result[1]) {
      // Lifetime keys are exactly `rachel:usage:user:{id}` — skip month/day variants.
      const tail = key.replace("rachel:usage:user:", "");
      if (!tail.includes(":")) ids.add(tail);
    }
  } while (cursor !== 0 && cursor !== "0");

  const summaries = await Promise.all([...ids].map((id) => getUserUsageSummary(id)));
  return summaries.sort((a, b) => b.thisMonth.costUsd - a.thisMonth.costUsd);
}
