import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

type CalendarEntry = { next_earnings_date?: string };
type Calendar = { entries: CalendarEntry[] } | null;
type Briefing = { ts: number; text: string } | null;

export async function GET() {
  try {
    const [a, p, t, c, b] = await Promise.all([
      redis.get("rachel:accounts"),
      redis.get("rachel:pulse"),
      redis.get("rachel:topics"),
      redis.get("rachel:calendar"),
      redis.get("rachel:briefing"),
    ]);
    const parse = (v: unknown) => (typeof v === "string" ? JSON.parse(v) : v) ?? [];
    const cal: Calendar = typeof c === "string" ? JSON.parse(c) : (c as Calendar) ?? null;
    const briefing: Briefing = typeof b === "string" ? JSON.parse(b) : (b as Briefing) ?? null;
    const today = new Date().toISOString().slice(0, 10);
    const calendar =
      cal && Array.isArray(cal.entries)
        ? { ...cal, entries: cal.entries.filter((e) => (e.next_earnings_date ?? "9999") >= today) }
        : null;
    return NextResponse.json({
      accounts: parse(a),
      pulse: parse(p),
      topics: parse(t),
      calendar,
      briefing,
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

// Accepts { "briefing": { "ts": <epoch_ms>, "text": "<markdown>" } } or { "briefing": null }
// Writes to rachel:briefing so the dashboard "Today's brief" card stays in sync with the chat brief.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { briefing?: Briefing };
    if (!("briefing" in body)) {
      return NextResponse.json({ error: "expected { briefing }" }, { status: 400 });
    }
    const value = body.briefing;
    if (value === null) {
      await redis.del("rachel:briefing");
      return NextResponse.json({ ok: true, cleared: true });
    }
    if (
      typeof value !== "object" ||
      typeof value.ts !== "number" ||
      typeof value.text !== "string"
    ) {
      return NextResponse.json(
        { error: "briefing must be { ts: number, text: string } or null" },
        { status: 400 },
      );
    }
    await redis.set("rachel:briefing", JSON.stringify({ ts: value.ts, text: value.text }));
    return NextResponse.json({ ok: true, ts: value.ts });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
