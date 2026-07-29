/**
 * POST /api/admin/bootstrap
 *
 * One-shot helper to grant the admin role to a Clerk
 * user that was created manually in the Clerk dashboard. Used to break the
 * chicken-and-egg of needing an admin to approve the first admin.
 *
 * Auth: Authorization: Bearer $CRON_SECRET (the same secret used for cron jobs).
 *
 * Body: { email: string, role?: "owner" }
 *
 * Once the owner is bootstrapped this route can be removed (or left — calling it
 * again is a no-op, just refreshes the metadata).
 */

import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const email: string = body?.email;
  const role:  string = body?.role ?? "owner";
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const client = await clerkClient();
  const list = await client.users.getUserList({ emailAddress: [email] });
  const user = list.data[0];
  if (!user) {
    return NextResponse.json(
      { error: `No Clerk user found for ${email}. Create them in the dashboard first.` },
      { status: 404 },
    );
  }

  const existing = (user.publicMetadata ?? {}) as Record<string, unknown>;
  const updated  = await client.users.updateUser(user.id, {
    publicMetadata: {
      ...existing,
      role,
      approvedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({
    ok:     true,
    userId: updated.id,
    email,
    role,
  });
}
