/**
 * Shared read/write helpers for the rachel:pulse Redis key.
 *
 * The key has historically been created as both a List (from legacy lpush
 * calls) and a String (from the current get/set path). Mixing operations
 * across those types produces WRONGTYPE errors that silently block RSS
 * ingestion and agent writes. These helpers normalise to String on every
 * read so the key is self-healing after one access.
 */

import { redis } from "./redis";
import { isDemo, demoPulse } from "./demo";

export type PulseRecord = Record<string, unknown>;

export async function readPulseItems(): Promise<PulseRecord[]> {
  if (await isDemo()) return demoPulse();
  try {
    const keyType = await redis.type("rachel:pulse");

    if (keyType === "list") {
      // Migrate: read all list items, convert to string storage.
      const raw = await redis.lrange("rachel:pulse", 0, 99);
      const items: PulseRecord[] = (raw ?? []).map((it) =>
        typeof it === "string" ? (JSON.parse(it) as PulseRecord) : (it as PulseRecord)
      );
      await redis.del("rachel:pulse");
      if (items.length > 0) {
        await redis.set("rachel:pulse", JSON.stringify(items));
      }
      return items;
    }

    if (keyType === "string") {
      const existing = await redis.get<string>("rachel:pulse");
      if (!existing) return [];
      const parsed: unknown =
        typeof existing === "string" ? JSON.parse(existing) : existing;
      return Array.isArray(parsed) ? (parsed as PulseRecord[]) : [];
    }

    return [];
  } catch {
    return [];
  }
}

export async function writePulseItems(items: PulseRecord[]): Promise<void> {
  if (await isDemo()) return; // demo mode: writes stay in memory
  await redis.set("rachel:pulse", JSON.stringify(items));
}
