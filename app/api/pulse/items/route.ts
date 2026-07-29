import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// rachel:pulse may be stored as a Redis list (list of JSON-stringified items)
// or as a single string holding a JSON array. Handle both transparently.
export async function GET() {
  try {
    const type = await redis.type("rachel:pulse");

    if (type === "list") {
      const raw = await redis.lrange("rachel:pulse", 0, 49);
      const items = (raw ?? []).map((item) =>
        typeof item === "string" ? JSON.parse(item) : item
      );
      return NextResponse.json(items);
    }

    if (type === "string") {
      const raw = await redis.get("rachel:pulse");
      if (!raw) return NextResponse.json([]);
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      return NextResponse.json(Array.isArray(parsed) ? parsed.slice(0, 50) : []);
    }

    return NextResponse.json([]);
  } catch {
    return NextResponse.json([]);
  }
}
