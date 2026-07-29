/**
 * GET  /api/admin/usage           — list all users' usage, sorted by this-month spend
 * GET  /api/admin/usage?userId=…  — single user's full breakdown
 * PATCH /api/admin/usage          — update default cap or per-user cap override
 *
 * Body for PATCH:
 *   { "scope": "default", "monthlyUsd": 5, "monthlyQuestions": 200 }
 *   { "scope": "user", "userId": "user_abc", "monthlyUsd": 20, "monthlyQuestions": 1000 }
 *
 * Auth: requires a Clerk session with publicMetadata.role === "owner".
 */

import { NextResponse } from "next/server";
import {
  getUserUsageSummary,
  listAllUserSummaries,
  setDefaultCap,
  setUserCap,
} from "@/lib/telemetry/per-user";
import { requireAdmin as requireAdminUser } from "@/lib/admin";

async function requireAdmin() {
  const gate = await requireAdminUser();
  if (gate.ok) return { ok: true as const };
  return { ok: false as const, status: gate.reason === "unauthenticated" ? 401 : 403 };
}

export async function GET(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: gate.status });

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (userId) {
    const summary = await getUserUsageSummary(userId);
    return NextResponse.json({ summary });
  }

  const summaries = await listAllUserSummaries();
  const totals = summaries.reduce(
    (acc, s) => {
      acc.questionsThisMonth += s.thisMonth.questions;
      acc.costUsdThisMonth += s.thisMonth.costUsd;
      acc.engagementsLifetime += s.lifetime.engagements;
      acc.questionsLifetime += s.lifetime.questions;
      acc.costUsdLifetime += s.lifetime.costUsd;
      return acc;
    },
    {
      users: summaries.length,
      questionsThisMonth: 0,
      costUsdThisMonth: 0,
      engagementsLifetime: 0,
      questionsLifetime: 0,
      costUsdLifetime: 0,
    },
  );
  return NextResponse.json({ totals, summaries });
}

export async function PATCH(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: gate.status });

  const body = await req.json().catch(() => ({}));
  const { scope, userId, monthlyUsd, monthlyQuestions } = body as {
    scope?: "default" | "user";
    userId?: string;
    monthlyUsd?: number;
    monthlyQuestions?: number;
  };

  if (typeof monthlyUsd !== "number" || typeof monthlyQuestions !== "number") {
    return NextResponse.json(
      { error: "monthlyUsd and monthlyQuestions are required numbers" },
      { status: 400 },
    );
  }

  if (scope === "default") {
    await setDefaultCap({ monthlyUsd, monthlyQuestions });
    return NextResponse.json({ ok: true, scope: "default", monthlyUsd, monthlyQuestions });
  }
  if (scope === "user" && userId) {
    await setUserCap(userId, { monthlyUsd, monthlyQuestions });
    return NextResponse.json({ ok: true, scope: "user", userId, monthlyUsd, monthlyQuestions });
  }
  return NextResponse.json(
    { error: "scope must be 'default', or 'user' with a userId" },
    { status: 400 },
  );
}
