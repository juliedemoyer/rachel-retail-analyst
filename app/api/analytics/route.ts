import { NextRequest, NextResponse } from "next/server";

const PH_BASE = "https://eu.posthog.com";
const PH_PROJECT = process.env.POSTHOG_PROJECT_ID;
const PH_KEY = process.env.POSTHOG_API_KEY;
const CLERK_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_BASE = "https://api.clerk.com/v1";

function phHeaders() {
  return { Authorization: `Bearer ${PH_KEY}` };
}

function clerkHeaders() {
  return { Authorization: `Bearer ${CLERK_KEY}` };
}

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get("authorization");
  const hasCookie = false; // legacy cookie gate removed
  const allowed =
    cronSecret === `Bearer ${process.env.CRON_SECRET}` || hasCookie;
  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!PH_PROJECT || !PH_KEY) {
    return NextResponse.json({ error: "PostHog not configured" }, { status: 503 });
  }

  const now = new Date();
  const h24ago = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const h24agoIso = h24ago.toISOString();
  // Clerk expects Unix timestamp in milliseconds
  const h24agoMs = h24ago.getTime();

  try {
    const [clerkNewUsersRes, clerkCountRes, eventsRes] = await Promise.all([
      // Clerk: recent users sorted by -created_at; filter client-side by 24h window
      // (Clerk's created_after query param is not supported on this endpoint)
      CLERK_KEY
        ? fetch(
            `${CLERK_BASE}/users?order_by=-created_at&limit=50`,
            { headers: clerkHeaders(), signal: AbortSignal.timeout(8_000) }
          )
            .then((r) => r.json())
            .catch(() => null)
        : Promise.resolve(null),
      // Clerk: total user count
      CLERK_KEY
        ? fetch(`${CLERK_BASE}/users/count`, {
            headers: clerkHeaders(),
            signal: AbortSignal.timeout(8_000),
          })
            .then((r) => r.json())
            .catch(() => null)
        : Promise.resolve(null),
      // PostHog: events for DAU + top pages
      fetch(
        `${PH_BASE}/api/projects/${PH_PROJECT}/events/?after=${encodeURIComponent(h24agoIso)}&limit=1000`,
        { headers: phHeaders(), signal: AbortSignal.timeout(15_000) }
      ).then((r) => r.json()),
    ]);

    // New signups + emails from Clerk
    interface ClerkUser {
      created_at?: number;
      email_addresses?: Array<{ email_address: string }>;
    }
    const allRecentUsers: ClerkUser[] = Array.isArray(clerkNewUsersRes)
      ? clerkNewUsersRes
      : [];
    const newSignupUsers = allRecentUsers.filter(
      (u) => typeof u.created_at === "number" && u.created_at >= h24agoMs
    );
    const newSignups = newSignupUsers.length;
    const newSignupEmails = newSignupUsers
      .slice(0, 5)
      .map((u) => u.email_addresses?.[0]?.email_address ?? "")
      .filter(Boolean);

    // Total registered users from Clerk
    const totalUsers: number = clerkCountRes?.total_count ?? 0;

    // PostHog events
    const events: Record<string, unknown>[] = eventsRes.results ?? [];

    // DAU: distinct users in last 24h
    const dau = new Set(events.map((e) => e.distinct_id as string)).size;

    // Top pages by $current_url
    const pageCount: Record<string, number> = {};
    for (const ev of events) {
      if (ev.event !== "$pageview") continue;
      const props = ev.properties as Record<string, unknown> | undefined;
      const raw =
        (props?.["$current_url"] as string) ??
        (props?.["$pathname"] as string) ??
        "";
      const path = raw.replace(/https?:\/\/[^/]+/, "").split("?")[0] || "/";
      pageCount[path] = (pageCount[path] ?? 0) + 1;
    }
    const topPages = Object.entries(pageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([path, views]) => ({ path, views }));

    const pageviews = topPages.reduce((s, p) => s + p.views, 0);

    return NextResponse.json({
      ts: now.toISOString(),
      dau,
      totalUsers,
      newSignups,
      newSignupEmails,
      pageviews,
      topPages,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
