/**
 * POST /api/ir/scrape — manual trigger for a single company's IR scrape.
 *
 * Body: { accountId: string, irUrl?: string }
 * Auth: Clerk (write endpoint).
 */

import { NextResponse } from "next/server";
import { scrapeAccount } from "@/lib/sources/ir-scraper";

export const maxDuration = 120;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as { accountId?: string; irUrl?: string };
  if (!body.accountId) {
    return NextResponse.json({ error: "accountId is required" }, { status: 400 });
  }

  const requestId = crypto.randomUUID();
  console.log(JSON.stringify({ level: "info", msg: "ir_scrape_manual", accountId: body.accountId, requestId }));

  try {
    const result = await scrapeAccount(body.accountId, { irUrl: body.irUrl });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(JSON.stringify({ level: "error", msg: "ir_scrape_manual_error", accountId: body.accountId, requestId, error }));
    return NextResponse.json({ error }, { status: 500 });
  }
}
