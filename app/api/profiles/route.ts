/**
 * GET /api/profiles
 *
 * Returns the denormalised list of all CompanyProfiles. Source for the
 * matrix, leaderboard, companies list, financials. Reads `rachel:profiles:all`
 * (one Redis GET, ~50ms cold). No LLM, no PDF reads.
 *
 * Query params:
 *   ?sector=Luxury%20%26%20Beauty
 *   ?country=FR
 *   ?quadrant=performer
 *   ?priority=1                  (intersect with caller's watchlist if signed in)
 *   ?count=true                  (return { count } only — for landing page chips)
 */

import { NextResponse } from "next/server";
import { readAllProfiles } from "@/lib/profiles/store";

export const revalidate = 60; // edge cache: 1 minute

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sector = url.searchParams.get("sector");
  const country = url.searchParams.get("country");
  const quadrant = url.searchParams.get("quadrant");
  const wantCount = url.searchParams.get("count") === "true";

  try {
    const all = await readAllProfiles();

    let filtered = all;
    if (sector) filtered = filtered.filter((p) => p.meta.sector === sector);
    if (country) filtered = filtered.filter((p) => p.meta.hq.country === country);
    if (quadrant)
      filtered = filtered.filter(
        (p) => p.aiPerception.score.quadrant === quadrant,
      );

    if (wantCount) {
      return NextResponse.json({ count: filtered.length });
    }

    // Bare array — every consumer (matrix, companies, leaderboard, benchmark,
    // financials) does `Array.isArray(data) ? data : []`. Wrapping breaks all
    // five surfaces silently.
    return NextResponse.json(filtered);
  } catch (err) {
    console.error({ route: "GET /api/profiles", error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to load profiles" }, { status: 500 });
  }
}
