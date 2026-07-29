/**
 * GET /api/snapshots/[slug]            → full trend
 * POST /api/snapshots/[slug]           → write snapshot dated `earningsDate`
 *                                         (admin-gated)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { readProfile, readTrend, writeSnapshot } from "@/lib/profiles/store";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  try {
    const trend = await readTrend(slug);
    if (!trend || trend.length === 0) {
      // Distinguish "company exists but has no snapshots yet" from "unknown
      // slug". Without this check we 200/empty for every typo, masking dead
      // links from the UI.
      const profile = await readProfile(slug);
      if (!profile) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
    return NextResponse.json({ slug, trend });
  } catch (err) {
    console.error({ route: "GET /api/snapshots/[slug]", slug, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to load trend" }, { status: 500 });
  }
}

const PostBody = z.object({
  earningsDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  const session = await auth();
  // Admin gate: Clerk userId must match the configured owner. Defence in depth — middleware
  // already gates /admin/* but this route may be called from cron or scripts.
  if (
    session.userId !== process.env.OWNER_USER_ID &&
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = PostBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  try {
    const snap = await writeSnapshot(slug, parsed.data.earningsDate);
    if (!snap) {
      return NextResponse.json(
        { error: `Profile ${slug} not found` },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, snapshot: snap });
  } catch (err) {
    console.error({ route: "POST /api/snapshots/[slug]", slug, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to write snapshot" }, { status: 500 });
  }
}
