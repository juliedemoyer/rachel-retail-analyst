/**
 * Clerk authentication proxy (Next.js 16 — replaces middleware.ts).
 *
 * Rules:
 *   /app/*            requires an active session; unauthenticated users redirect to /sign-in
 *   All other routes (/, /sign-in/*, /api/*) are public
 *
 * Demo mode short-circuits all of it: `?demo=1` on any URL skips auth and
 * serves fictional data from config/demo-companies.json. See lib/demo.ts.
 *
 * Per-page enforcement (handled in server components, NOT here):
 *   /app/admin/(.*)   role === "owner" check via fresh user record fetch
 *
 * Why not check role/expiry in the proxy?
 *   Clerk's default session JWT does NOT include publicMetadata, so
 *   sessionClaims.publicMetadata is always empty here. Fetching the user
 *   from clerkClient on every request adds a Clerk API round-trip to every
 *   protected page navigation, which is expensive. Pages do the fresh fetch.
 */

import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { DEMO_COOKIE } from "./lib/demo";

const isProductRoute   = createRouteMatcher(["/app", "/app/(.*)"]);

const DEMO_MAX_AGE = 60 * 60 * 6; // six hours

export const proxy = clerkMiddleware(async (auth, req) => {
  // ── Demo mode ───────────────────────────────────────────────────────────
  const demoParam = req.nextUrl.searchParams.get("demo");
  const inDemo =
    demoParam === "1" ||
    (demoParam !== "0" && req.cookies.get(DEMO_COOKIE)?.value === "1");

  if (demoParam !== null) {
    const res = NextResponse.next();
    if (demoParam === "1") {
      res.cookies.set(DEMO_COOKIE, "1", { path: "/", maxAge: DEMO_MAX_AGE, sameSite: "lax" });
    } else {
      res.cookies.delete(DEMO_COOKIE);
    }
    if (inDemo) return res;
  }

  if (inDemo) return; // demo mode: no auth, no backend, fictional data only

  const isProduct = isProductRoute(req);

  if (!isProduct) return; // public route -- pass through

  // Enforce sign-in only. Role and expiry are enforced per-page using the
  // fresh user record (see comment above for why). Unauthenticated users
  // get redirected to /sign-in instead of Clerk's default 404 rewrite.
  await auth.protect({
    unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
  });
});

export const proxyConfig = {
  matcher: [
    // Explicitly include gated HTML pages so the html exclusion below doesn't skip them.
    // Skip Next.js internals and all static files.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
