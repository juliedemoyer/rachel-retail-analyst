/**
 * GET /api/admin/who-am-i
 *
 * Returns the current Clerk user ID + their publicMetadata. Used to debug
 * "I have role:owner but the admin page redirects me" — typically means the
 * caller is signed in as a different user than the one whose metadata was set.
 *
 * No CRON_SECRET — relies on the caller's own signed-in session.
 */

import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ signedIn: false });

  const client = await clerkClient();
  const me = await client.users.getUser(userId);

  return NextResponse.json({
    signedIn:        true,
    userId,
    primaryEmail:    me.emailAddresses.find((e) => e.id === me.primaryEmailAddressId)?.emailAddress,
    allEmails:       me.emailAddresses.map((e) => e.emailAddress),
    publicMetadata:  me.publicMetadata,
    sessionClaimsKeys: Object.keys(sessionClaims ?? {}),
    hasSessionMeta:  Boolean((sessionClaims as { publicMetadata?: unknown })?.publicMetadata),
  });
}
