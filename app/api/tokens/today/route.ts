/**
 * GET /api/tokens/today — Today's token usage aggregated by workflow.
 *
 * Returns:
 *   {
 *     totalCostUsd: number,
 *     budgetUsd: number,
 *     pct: number (0–100),
 *     totalInputTokens: number,
 *     totalOutputTokens: number,
 *     byWorkflow: Record<workflow, { inputTokens, outputTokens, costUsd, calls }>
 *   }
 *
 * Called by TokenMeter component (polled every 60s).
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { todayKey, getDailyBudgetUsd } from "@/lib/telemetry/tokens";

export const revalidate = 0; // always fresh

export async function GET() {
  // Operational metrics — must not leak token counts or budget to anonymous
  // callers. TokenMeter polls this from authenticated client sessions.
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestId = crypto.randomUUID();
  const t0 = Date.now();
  console.log(
    JSON.stringify({ level: "info", msg: "tokens_today_start", route: "/api/tokens/today", requestId }),
  );

  try {
    const today = todayKey();
    const pattern = `rachel:tokens:${today}:*`;

    // Scan for all today's keys
    const keys: string[] = [];
    let cursor: string | number = 0;
    do {
      const result = (await redis.scan(cursor, {
        match: pattern,
        count: 200,
      })) as [string | number, string[]];
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== 0 && cursor !== "0");

    const byWorkflow: Record<
      string,
      { inputTokens: number; outputTokens: number; costUsd: number; calls: number }
    > = {};

    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalCostUsd = 0;

    for (const key of keys) {
      // Key format: rachel:tokens:{date}:{workflow}:{model}
      const parts = key.split(":");
      const workflow = parts[3] ?? "unknown";
      const data = await redis.hgetall<{
        inputTokens?: string;
        outputTokens?: string;
        costUsd?: string;
        calls?: string;
      }>(key);

      if (!data) continue;

      const inp = Number(data.inputTokens ?? 0);
      const out = Number(data.outputTokens ?? 0);
      const cost = Number(data.costUsd ?? 0);
      const calls = Number(data.calls ?? 0);

      if (!byWorkflow[workflow]) {
        byWorkflow[workflow] = { inputTokens: 0, outputTokens: 0, costUsd: 0, calls: 0 };
      }
      byWorkflow[workflow].inputTokens += inp;
      byWorkflow[workflow].outputTokens += out;
      byWorkflow[workflow].costUsd += cost;
      byWorkflow[workflow].calls += calls;

      totalInputTokens += inp;
      totalOutputTokens += out;
      totalCostUsd += cost;
    }

    const budgetUsd = await getDailyBudgetUsd();
    const pct = Math.min(100, Math.round((totalCostUsd / budgetUsd) * 100));

    const payload = {
      totalCostUsd: Math.round(totalCostUsd * 10000) / 10000,
      budgetUsd,
      pct,
      totalInputTokens,
      totalOutputTokens,
      byWorkflow,
    };

    console.log(
      JSON.stringify({
        level: "info",
        msg: "tokens_today_done",
        route: "/api/tokens/today",
        requestId,
        ms: Date.now() - t0,
        keys: keys.length,
        totalCostUsd: payload.totalCostUsd,
      }),
    );

    return NextResponse.json(payload);
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(
      JSON.stringify({
        level: "error",
        msg: "tokens_today_error",
        route: "/api/tokens/today",
        requestId,
        ms: Date.now() - t0,
        error,
      }),
    );
    return NextResponse.json({ error }, { status: 500 });
  }
}
