/**
 * Server-safe re-export of the priority seed list.
 *
 * `lib/watchlist.ts` is a "use client" module (it owns the localStorage
 * hook), so server routes read the seed from here instead.
 */
import watchlistConfig from "../config/watchlist.json";

export const PRIORITY_SEED_SLUGS: string[] = watchlistConfig.prioritySeed;
export const WATCHLIST_COMPANIES: string[] = watchlistConfig.companies;
