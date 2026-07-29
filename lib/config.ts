/**
 * Single entry point for everything in `config/`.
 *
 * Nothing in `app/`, `lib/`, or `scripts/` should hardcode a company name, a
 * person, a region, or a vendor. It all comes from here, so a fork only ever
 * has to edit JSON.
 */

import profile from "../config/profile.json";
import watchlist from "../config/watchlist.json";
import scoring from "../config/scoring.json";

export const PROFILE = profile;
export const WATCHLIST = watchlist;
export const SCORING = scoring;

/** Display name used in outbound email signatures and the admin UI. */
export const OWNER_NAME = process.env.OWNER_NAME ?? profile.ownerName;

/** Slugs pre-loaded into a new visitor's priority watchlist. */
export const PRIORITY_SEED_SLUGS = watchlist.prioritySeed;

/** Public base URL of your deployment. */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/**
 * Optional shared kanban used for cross-agent handoffs. Leave
 * SPRINT_BOARD_URL unset and every sprint-board call becomes a no-op.
 */
export const SPRINT_BOARD_URL = process.env.SPRINT_BOARD_URL ?? "";
