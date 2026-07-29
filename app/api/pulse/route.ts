import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

type PulseItem = Record<string, unknown> & { id: number | string };

async function get(): Promise<PulseItem[]> {
  const r = await redis.get("rachel:pulse");
  return (typeof r === "string" ? JSON.parse(r) : r) ?? [];
}

async function save(p: PulseItem[]): Promise<void> {
  await redis.set("rachel:pulse", JSON.stringify(p));
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
    const body = await req.json() as Omit<PulseItem, "id">;
    const p = await get();
    const numericIds = p.map(x => x.id).filter((id): id is number => typeof id === "number" && !isNaN(id));
    const id = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
    p.unshift({ id, ...body });
    await save(p);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
