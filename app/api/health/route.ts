import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  return NextResponse.json({ status: "ok", agent: "rachel", ts: Date.now() });
}
