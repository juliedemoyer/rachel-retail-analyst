/**
 * GET /api/usage/me — return the signed-in user's own Ask Rachel usage.
 *
 * No admin gating. Returns counts + cap status so the Ask Rachel UI can
 * show a "you've used X of Y this month" widget. Anonymous callers get a
 * minimal response (we don't bucket anon usage on the client side).
 */

import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUserUsageSummary } from "@/lib/telemetry/per-user";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ signedIn: false });
  }
  const [summary, client] = await Promise.all([
    getUserUsageSummary(userId),
    clerkClient(),
  ]);
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as Record<string, unknown>)?.role ?? null;
  return NextResponse.json({
    signedIn: true,
    role,
    questionsThisMonth: summary.thisMonth.questions,
    engagementsThisMonth: summary.thisMonth.engagements,
    costUsdThisMonth: Number(summary.thisMonth.costUsd.toFixed(4)),
    cap: summary.cap,
    remaining: summary.capStatus,
  });
}
