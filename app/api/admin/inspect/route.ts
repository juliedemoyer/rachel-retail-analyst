/**
 * GET /api/admin/inspect?email=...
 *
 * Diagnostic helper. Returns the Clerk user record for an email — primary
 * email, verification status, password status, public metadata. Used to
 * troubleshoot sign-in failures.
 *
 * Auth: Authorization: Bearer $CRON_SECRET.
 */

import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const client = await clerkClient();
  const list = await client.users.getUserList({ emailAddress: [email] });
  if (list.data.length > 1) {
    return NextResponse.json({
      multiple: true,
      count:    list.data.length,
      users: list.data.map((u) => ({
        id:             u.id,
        publicMetadata: u.publicMetadata,
        createdAt:      new Date(u.createdAt).toISOString(),
        lastSignInAt:   u.lastSignInAt ? new Date(u.lastSignInAt).toISOString() : null,
        passwordEnabled: u.passwordEnabled,
      })),
    });
  }
  const user = list.data[0];
  if (!user) return NextResponse.json({ found: false });

  return NextResponse.json({
    found:                  true,
    id:                     user.id,
    firstName:              user.firstName,
    lastName:               user.lastName,
    primaryEmailAddressId:  user.primaryEmailAddressId,
    passwordEnabled:        user.passwordEnabled,
    twoFactorEnabled:       user.twoFactorEnabled,
    bannedOrLocked: {
      banned:  user.banned,
      locked:  user.locked,
    },
    emailAddresses: user.emailAddresses.map((e) => ({
      id:           e.id,
      email:        e.emailAddress,
      verification: e.verification?.status,
      isPrimary:    e.id === user.primaryEmailAddressId,
    })),
    publicMetadata: user.publicMetadata,
    createdAt: new Date(user.createdAt).toISOString(),
    updatedAt: new Date(user.updatedAt).toISOString(),
    lastSignInAt: user.lastSignInAt ? new Date(user.lastSignInAt).toISOString() : null,
  });
}
