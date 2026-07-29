/**
 * POST /api/admin/companies/approve
 *
 * Approves a candidate company: adds it to rachel:accounts with template
 * values. The company will appear on the Companies page immediately as a
 * stub card; full profile appears once IR documents are indexed.
 *
 * Requires role === "owner".
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { requireAdmin } from "@/lib/admin";

const Body = z.object({
  company: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  sector: z.string().min(1).max(100),
  aiSignal: z.number().int().min(1).max(5).default(3),
  reason: z.string().max(500).optional(),
});

async function getAccounts(): Promise<Record<string, unknown>[]> {
  const r = await redis.get("rachel:accounts");
  if (!r) return [];
  const parsed = typeof r === "string" ? JSON.parse(r) : r;
  return Array.isArray(parsed) ? parsed : [];
}

async function saveAccounts(accounts: Record<string, unknown>[]) {
  await redis.set("rachel:accounts", JSON.stringify(accounts));
}

export async function POST(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json(
      { error: gate.reason === "unauthenticated" ? "Unauthorized" : "Forbidden" },
      { status: gate.reason === "unauthenticated" ? 401 : 403 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid", issues: parsed.error.issues }, { status: 400 });
  }

  const { company, country, sector, aiSignal, reason } = parsed.data;

  const accounts = await getAccounts();

  const alreadyExists = accounts.some(
    (a) => (a.company as string)?.toLowerCase() === company.toLowerCase(),
  );
  if (alreadyExists) {
    return NextResponse.json({ ok: true, skipped: true, reason: "already exists" });
  }

  const newId = accounts.length > 0
    ? Math.max(...accounts.map((a) => Number(a.id) || 0)) + 1
    : 1;

  const now = new Date().toISOString();

  const newAccount = {
    id: newId,
    company,
    country,
    sector,
    aiMaturity: aiSignal,
    quadrant: aiSignal >= 4 ? "challenger" : "not_visible",
    approvedAt: now,
    notes: reason ?? "Approved from candidate queue. IR ingestion pending.",
    vendors: {},
    financials: {},
    pendingIngestion: true,
  };

  accounts.push(newAccount);
  await saveAccounts(accounts);

  console.log(JSON.stringify({
    level: "info",
    msg: "company_approved",
    company,
    country,
    sector,
    approvedBy: gate.user.id,
  }));

  return NextResponse.json({ ok: true, id: newId, company });
}
