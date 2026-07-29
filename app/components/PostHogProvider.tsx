"use client";

/**
 * PostHog analytics provider.
 *
 * Wraps the product layout and:
 *   - initialises PostHog once on mount
 *   - identifies the signed-in Clerk user so events tie to a person
 *   - fires a manual $pageview on every App Router route change
 *
 * Safe to render when NEXT_PUBLIC_POSTHOG_KEY is absent — init is
 * skipped silently so local dev and staging deployments without a
 * key don't log errors.
 *
 * Setup (one-time):
 *   1. Create a project at https://app.posthog.com (EU host recommended)
 *   2. Add NEXT_PUBLIC_POSTHOG_KEY to Vercel env vars (all environments)
 *   3. Optionally add NEXT_PUBLIC_POSTHOG_HOST (default: https://eu.i.posthog.com)
 *
 * Event catalogue:
 *   $pageview                { $current_url, pathname }   automatic per route change
 *   matrix_chip_click        { slug, quadrant, sector }
 *   profile_view             { slug }
 *   ask_rachel_query         { slug?, query_length }
 *   ask_rachel_answer        { slug?, sources_count }
 *   benchmark_compare        { slugs }
 *   leaderboard_view         { sector }
 *   financials_view          {}
 *   candidate_approved       { slug, fields_count }
 *   candidate_rejected       { slug }
 */

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";

const POSTHOG_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY  ?? "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

let initialised = false;

export function usePostHog() {
  return posthog;
}

/** Thin wrapper, call from any client component. */
export function track(event: string, props?: Record<string, unknown>) {
  if (!initialised) return;
  posthog.capture(event, props);
}

function PostHogIdentifier() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!initialised || !isLoaded) return;

    if (isSignedIn && user) {
      const meta = (user.publicMetadata ?? {}) as {
        persona?: string;
        company?: string;
        role?: string;
            };
      posthog.identify(user.id, {
        email:    user.primaryEmailAddress?.emailAddress,
        name:     [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
        persona:  meta.persona,
        company:  meta.company,
        role:     meta.role ?? "viewer",
      });
    } else {
      posthog.reset();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}

function PostHogPageviewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initialised || !pathname) return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    posthog.capture("$pageview", { $current_url: url, pathname });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set — analytics disabled");
      }
      return;
    }
    if (initialised) return;
    posthog.init(POSTHOG_KEY, {
      api_host:                    POSTHOG_HOST,
      person_profiles:             "identified_only",
      capture_pageview:            false,
      capture_pageleave:           true,
      autocapture:                 false,
      disable_session_recording:   true,
    });
    initialised = true;
  }, []);

  return (
    <>
      <PostHogIdentifier />
      <Suspense fallback={null}>
        <PostHogPageviewInner />
      </Suspense>
      {children}
    </>
  );
}
