/**
 * GET /api/ir/status — per-company IR health snapshot.
 * Public read (same pattern as /api/ask — demo-safe).
 */

import { NextResponse } from "next/server";
import { getIRStatus } from "@/lib/sources/ir-scraper";

export async function GET() {
  const requestId = crypto.randomUUID();
  const t0 = Date.now();
  console.log(JSON.stringify({ level: "info", msg: "ir_status_start", route: "/api/ir/status", requestId }));

  try {
    const statuses = await getIRStatus();
    console.log(JSON.stringify({ level: "info", msg: "ir_status_done", requestId, ms: Date.now() - t0, count: statuses.length }));
    return NextResponse.json({ statuses });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(JSON.stringify({ level: "error", msg: "ir_status_error", requestId, error }));
    return NextResponse.json({ error }, { status: 500 });
  }
}
