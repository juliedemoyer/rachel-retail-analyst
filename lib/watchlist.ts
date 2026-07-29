"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "rachel:priority-watchlist";
const EVENT_NAME = "rachel:watchlist-change";
const SEEDED_FLAG = "rachel:priority-watchlist:seeded";

// First-visit defaults — companies marked with ★ in the sidebar / index page.
// These get pre-loaded into the watchlist on the user's first visit so the
// "Priority (4)" pill, the priority page, and the per-profile button all
// reflect the same starting state. Toggling any company writes its own
// state and never re-seeds.
import watchlistConfig from "../config/watchlist.json";

export const PRIORITY_SEED_SLUGS = watchlistConfig.prioritySeed;

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

// Seed the priority watchlist on first visit. Idempotent: writes a one-shot
// flag in localStorage so we never overwrite a user's curated list, even if
// they later remove all their priorities.
export function seedPriorityWatchlistOnce() {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(SEEDED_FLAG) === "1") return;
    const existing = read();
    if (existing.length > 0) {
      window.localStorage.setItem(SEEDED_FLAG, "1");
      return;
    }
    write([...PRIORITY_SEED_SLUGS]);
    window.localStorage.setItem(SEEDED_FLAG, "1");
  } catch {
    /* localStorage may be disabled — silently ignore */
  }
}

export function useWatchlist() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    // Seed on every first mount: idempotent, only runs once per browser.
    // This way users who land directly on /app/companies/lvmh see the
    // "Remove from priorities" state immediately, without needing to visit
    // /app/companies first.
    seedPriorityWatchlistOnce();
    setSlugs(read());
    const onChange = () => setSlugs(read());
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const add = useCallback((slug: string) => {
    const next = Array.from(new Set([...read(), slug]));
    write(next);
  }, []);

  const remove = useCallback((slug: string) => {
    const next = read().filter((s) => s !== slug);
    write(next);
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    if (current.includes(slug)) {
      write(current.filter((s) => s !== slug));
      return false;
    }
    write([...current, slug]);
    return true;
  }, []);

  return { slugs, has, add, remove, toggle };
}
