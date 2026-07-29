import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const raw = await redis.get("rachel:matrix:changes");
    if (!raw) return NextResponse.json([]);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json(Array.isArray(parsed) ? parsed : []);
  } catch {
    return NextResponse.json([]);
  }
}
