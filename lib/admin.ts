import { auth, clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "").toLowerCase();

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && !!ADMIN_EMAIL && email.toLowerCase() === ADMIN_EMAIL;
}

export function primaryEmailOf(user: User): string | undefined {
  return user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress
    ?? user.emailAddresses[0]?.emailAddress;
}

export function isAdminUser(user: User): boolean {
  return isAdminEmail(primaryEmailOf(user))
    || user.publicMetadata?.role === "owner";
}

/**
 * Server-side admin guard. Returns the Clerk user when the caller is the
 * configured admin (ADMIN_EMAIL env var), otherwise a reason.
 */
export async function requireAdmin(): Promise<
  | { ok: true; user: User }
  | { ok: false; reason: "unauthenticated" | "forbidden" }
> {
  const { userId } = await auth();
  if (!userId) return { ok: false, reason: "unauthenticated" };
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!isAdminUser(user)) return { ok: false, reason: "forbidden" };
  return { ok: true, user };
}
