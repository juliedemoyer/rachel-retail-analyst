/**
 * GET /api/earnings-calendar
 *
 * Returns the earnings calendar from Redis `rachel:calendar` (synced from
 * your notes vault § 3 via `tsx scripts/sync-calendar.ts`).
 *
 * Server-side future-only filter: rows with next_earnings_date < today are
 * never returned. This guarantees the landing widget never shows past dates.
 *
 * Response shape preserves `nextTradingUpdate` for the existing landing
 * widget JS while adding the new fields.
 */

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const revalidate = 300;

interface CalendarEntry {
  slug: string;
  company: string;
  sector: string;
  last_earnings: string;
  next_earnings: string;
  next_earnings_date: string;
  is_tbc: boolean;
  ir_url: string | null;
}

interface CalendarPayload {
  generatedAt: string;
  source: string;
  count: number;
  entries: CalendarEntry[];
}

export async function GET() {
  const raw = await redis.get<CalendarPayload | string>("rachel:calendar");
  if (!raw) {
    return NextResponse.json({ generatedAt: new Date().toISOString(), entries: [] });
  }
  const payload: CalendarPayload =
    typeof raw === "string" ? JSON.parse(raw) : raw;

  const today = new Date().toISOString().slice(0, 10);

  const entries = (payload.entries ?? [])
    .filter((e) => (e.next_earnings_date || "9999") >= today)
    .map((e) => ({
      slug: e.slug,
      company: e.company,
      sector: e.sector,
      country: undefined as string | undefined, // legacy field, not in new schema
      // legacy field name for backward-compat with existing landing widget
      nextTradingUpdate: e.next_earnings_date,
      latestReportDate: e.last_earnings,
      // new fields
      next_earnings: e.next_earnings,
      next_earnings_date: e.next_earnings_date,
      last_earnings: e.last_earnings,
      is_tbc: e.is_tbc,
      ir_url: e.ir_url,
    }))
    .sort((a, b) =>
      (a.nextTradingUpdate ?? "9999").localeCompare(b.nextTradingUpdate ?? "9999"),
    );

  return NextResponse.json({
    generatedAt: payload.generatedAt ?? new Date().toISOString(),
    source: payload.source ?? "rachel:calendar",
    entries,
  });
}
