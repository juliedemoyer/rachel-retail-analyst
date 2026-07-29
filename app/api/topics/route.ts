import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

type Topic = Record<string, unknown> & { id: number };

async function get(): Promise<Topic[]> {
  const r = await redis.get("rachel:topics");
  return (typeof r === "string" ? JSON.parse(r) : r) ?? [];
}

async function save(t: Topic[]): Promise<void> {
  await redis.set("rachel:topics", JSON.stringify(t));
}

export async function GET() {
  try {
    return NextResponse.json(await get());
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Omit<Topic, "id">;
    const t = await get();
    const id = t.length > 0 ? Math.max(...t.map(x => x.id)) + 1 : 1;
    const item: Topic = { id, ...body };
    t.push(item);
    await save(t);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
