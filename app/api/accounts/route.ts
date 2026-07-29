import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

type Account = Record<string, unknown> & { id: number; company?: string };

async function get(): Promise<Account[]> {
  const r = await redis.get("rachel:accounts");
  return (typeof r === "string" ? JSON.parse(r) : r) ?? [];
}

async function save(a: Account[]): Promise<void> {
  await redis.set("rachel:accounts", JSON.stringify(a));
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
    const body = await req.json() as Omit<Account, "id">;
    const a = await get();
    const id = a.length > 0 ? Math.max(...a.map(x => x.id)) + 1 : 1;
    a.push({ id, ...body });
    await save(a);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json() as Partial<Account>;
    const a = await get();
    const i = a.findIndex(x => x.id === body.id || x.company?.toLowerCase() === body.company?.toLowerCase());
    if (i === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    a[i] = { ...a[i], ...body };
    await save(a);
    return NextResponse.json({ ok: true, account: a[i] });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
