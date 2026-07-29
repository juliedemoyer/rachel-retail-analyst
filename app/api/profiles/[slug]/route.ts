/**
 * GET /api/profiles/[slug]
 *
 * Full profile + latest snapshot + trend (last N points). Powers the
 * /app/companies/[slug] surface. One Redis MGET ~ 60ms cold.
 */

import { NextResponse } from "next/server";
import {
  readProfile,
  readLatestSnapshot,
  readTrend,
  readSectorAppointments,
} from "@/lib/profiles/store";

export const revalidate = 60;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const profile = await readProfile(slug);
    if (!profile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const [latest, trend, sectorAppointments] = await Promise.all([
      readLatestSnapshot(slug),
      readTrend(slug),
      readSectorAppointments(profile.meta.sector),
    ]);
    // Last 8 trend points = 2 years quarterly
    const recentTrend = trend.slice(-8);
    return NextResponse.json({
      profile,
      latestSnapshot: latest,
      trend: recentTrend,
      sectorAppointments,
    });
  } catch (err) {
    console.error({ route: "GET /api/profiles/[slug]", slug, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}
