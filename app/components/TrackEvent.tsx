"use client";

import { useEffect } from "react";
import { track } from "./PostHogProvider";

/**
 * Mounts inside a server component to fire a single PostHog event on render.
 * Use for page-level events (profile_view, leaderboard_view, financials_view, etc.)
 * where the parent is a server component and we don't want to make the
 * whole page client-side just to capture one event.
 */
export default function TrackEvent({
  event, props,
}: {
  event: string;
  props?: Record<string, unknown>;
}) {
  useEffect(() => {
    track(event, props);
  }, [event, props]);
  return null;
}
