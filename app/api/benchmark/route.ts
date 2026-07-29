/**
 * GET /api/benchmark?slugs=lvmh,kering,richemont
 *
 * Returns 2–3 profiles in parallel, ready for diff rendering on
 * /app/benchmark.
 */

import { NextResponse } from "next/server";
import { readProfile } from "@/lib/profiles/store";

export const revalidate = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slugs = (url.searchParams.get("slugs") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  if (slugs.length < 2) {
    return NextResponse.json(
      { error: "Pass 2–3 slugs as ?slugs=a,b,c" },
      { status: 400 },
    );
  }
  const profiles = await Promise.all(slugs.map((s) => readProfile(s)));
  const found = profiles.filter((p): p is NonNullable<typeof p> => !!p);
  if (found.length < 2) {
    return NextResponse.json(
      { error: "Not enough profiles found" },
      { status: 404 },
    );
  }
  // Bare array — matches /api/profiles convention; benchmark page does
  // `Array.isArray(data) ? data : []`.
  return NextResponse.json(found);
}
