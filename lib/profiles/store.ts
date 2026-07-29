/**
 * Profile + snapshot store.
 *
 * Read-once architecture: every product surface (matrix, leaderboard,
 * benchmark, financials, profile) reads from `rachel:profiles:all` —
 * a denormalised list rebuilt atomically whenever a profile or snapshot
 * is approved. Zero LLM calls and zero PDF reads at render time.
 *
 * Keys:
 *   rachel:profile:{slug}                   → CompanyProfile JSON
 *   rachel:profiles:all                     → CompanyProfile[] (denormalised)
 *   rachel:scores:{slug}:{earningsDate}     → Snapshot JSON (immutable)
 *   rachel:scores:{slug}:trend              → TrendPoint[] (sorted ascending)
 *   rachel:scores:{slug}:latest             → earningsDate string
 *   rachel:candidates:{slug}:{ts}           → Candidate JSON (pending diff)
 *   rachel:sector:{sector}:appointments     → SectorAppointment[]
 */

import { redis } from "../redis";
import { isDemo, demoProfile, demoProfiles } from "../demo";
import {
  CompanyProfile,
  Snapshot,
  TrendPoint,
  type CompanyProfile as TCompanyProfile,
  type Snapshot as TSnapshot,
  type TrendPoint as TTrendPoint,
  type SectorAppointment,
  RUBRIC_VERSION,
  deriveComposite,
} from "./schema";

const K = {
  profile: (slug: string) => `rachel:profile:${slug}`,
  profilesAll: "rachel:profiles:all",
  snapshot: (slug: string, date: string) => `rachel:scores:${slug}:${date}`,
  trend: (slug: string) => `rachel:scores:${slug}:trend`,
  latest: (slug: string) => `rachel:scores:${slug}:latest`,
  candidate: (slug: string, ts: string) => `rachel:candidates:${slug}:${ts}`,
  candidatesIndex: "rachel:candidates:index",
  sectorAppts: (sector: string) =>
    `rachel:sector:${sector.toLowerCase().replace(/\s+/g, "-")}:appointments`,
};

// ── Profiles ──────────────────────────────────────────────────────────────────

export async function writeProfile(profile: TCompanyProfile): Promise<void> {
  if (await isDemo()) return; // demo mode: writes stay in memory, never reach Redis
  await redis.set(K.profile(profile.slug), profile);
  await rebuildProfilesAll();
}

export async function readProfile(
  slug: string,
): Promise<TCompanyProfile | null> {
  if (await isDemo()) return demoProfile(slug);
  const raw = await redis.get(K.profile(slug));
  if (!raw) return null;
  const parsed = CompanyProfile.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function readAllProfiles(): Promise<TCompanyProfile[]> {
  if (await isDemo()) return demoProfiles();
  const raw = await redis.get<TCompanyProfile[]>(K.profilesAll);
  if (!raw || raw.length === 0) return rebuildProfilesAll();
  // If cached count is less than actual key count, the list is stale — rebuild.
  const keys = await redis.keys("rachel:profile:*");
  if (keys.length > raw.length) return rebuildProfilesAll();
  return raw;
}

/**
 * Re-fetch every `rachel:profile:*` key and write the denormalised list
 * back to `rachel:profiles:all`. Called whenever a profile or snapshot
 * is written.
 */
export async function rebuildProfilesAll(): Promise<TCompanyProfile[]> {
  const keys = await redis.keys("rachel:profile:*");
  if (!keys.length) {
    await redis.set(K.profilesAll, []);
    return [];
  }
  // Fetch in parallel; small N (≤ 50 in v1).
  const raws = await Promise.all(keys.map((k) => redis.get(k)));
  const profiles: TCompanyProfile[] = [];
  for (const raw of raws) {
    if (!raw) continue;
    const parsed = CompanyProfile.safeParse(raw);
    if (parsed.success) profiles.push(parsed.data);
  }
  // Stable sort: company name asc.
  profiles.sort((a, b) => a.meta.company.localeCompare(b.meta.company));
  await redis.set(K.profilesAll, profiles);
  return profiles;
}

// ── Snapshots ─────────────────────────────────────────────────────────────────

/**
 * Build a snapshot from the current profile state, write it immutably,
 * push to the trend, update the latest pointer, and rebuild the
 * denormalised list. Idempotent: re-running with the same earningsDate
 * overwrites the snapshot but keeps the trend deduped.
 */
export async function writeSnapshot(
  slug: string,
  earningsDate: string,
): Promise<TSnapshot | null> {
  const profile = await readProfile(slug);
  if (!profile) return null;

  // omit notes + sectorAppointments from snapshot
  const { notes: _notes, sectorAppointments: _sa, ...aiPerceptionForSnap } =
    profile.aiPerception;

  const snap: TSnapshot = {
    slug,
    earningsDate,
    rubricVersion: RUBRIC_VERSION,
    capturedAt: new Date().toISOString(),
    investorSnapshot: profile.investorSnapshot,
    aiPerception: aiPerceptionForSnap,
  };

  // Validate before persisting — protects against drift if schema changes.
  const parsed = Snapshot.safeParse(snap);
  if (!parsed.success) {
    throw new Error(
      `Snapshot validation failed for ${slug} ${earningsDate}: ${JSON.stringify(parsed.error.issues)}`,
    );
  }

  await redis.set(K.snapshot(slug, earningsDate), parsed.data);
  await redis.set(K.latest(slug), earningsDate);

  // Update trend: replace any existing point with same date, then sort.
  const trend = await readTrend(slug);
  const filtered = trend.filter((t) => t.date !== earningsDate);
  const point: TTrendPoint = {
    date: earningsDate,
    rhetoric: profile.aiPerception.score.rhetoric,
    production: profile.aiPerception.score.production,
    composite:
      profile.aiPerception.score.composite ??
      deriveComposite(profile.aiPerception.score),
    quadrant: profile.aiPerception.score.quadrant,
    rubricVersion: profile.aiPerception.score.rubricVersion ?? RUBRIC_VERSION,
  };
  filtered.push(point);
  filtered.sort((a, b) => a.date.localeCompare(b.date));
  await redis.set(K.trend(slug), filtered);

  await rebuildProfilesAll();
  return parsed.data;
}

export async function readSnapshot(
  slug: string,
  earningsDate: string,
): Promise<TSnapshot | null> {
  const raw = await redis.get(K.snapshot(slug, earningsDate));
  if (!raw) return null;
  const parsed = Snapshot.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function readLatestSnapshot(
  slug: string,
): Promise<TSnapshot | null> {
  const date = await redis.get<string>(K.latest(slug));
  if (!date) return null;
  return readSnapshot(slug, date);
}

export async function readTrend(slug: string): Promise<TTrendPoint[]> {
  const raw = (await redis.get<unknown[]>(K.trend(slug))) ?? [];
  const out: TTrendPoint[] = [];
  for (const r of raw) {
    const parsed = TrendPoint.safeParse(r);
    if (parsed.success) out.push(parsed.data);
  }
  return out;
}

// ── Sector appointments (AI #13, sector-scoped) ───────────────────────────────

export async function readSectorAppointments(
  sector: string,
): Promise<SectorAppointment[]> {
  return (await redis.get<SectorAppointment[]>(K.sectorAppts(sector))) ?? [];
}

export async function writeSectorAppointments(
  sector: string,
  appts: SectorAppointment[],
): Promise<void> {
  await redis.set(K.sectorAppts(sector), appts);
}

// ── Candidates (LLM-proposed field diffs awaiting approval) ───────────────────

export interface Candidate {
  id: string; // `${slug}:${ts}`
  slug: string;
  ts: string; // ISO
  earningsDate: string;
  proposedFields: Record<string, unknown>;
  citations: Record<string, { sourceUrl: string; quote?: string }>;
  status: "pending" | "approved" | "rejected" | "partial";
  approvedFields?: string[];
  reviewedAt?: string;
  reviewedBy?: string;
}

export async function writeCandidate(c: Candidate): Promise<void> {
  await redis.set(K.candidate(c.slug, c.ts), c);
  await redis.zadd(K.candidatesIndex, { score: Date.now(), member: c.id });
}

export async function readPendingCandidates(): Promise<Candidate[]> {
  const ids = await redis.zrange<string[]>(K.candidatesIndex, 0, -1, {
    rev: true,
  });
  if (!ids?.length) return [];
  const all = await Promise.all(
    ids.map((id) => {
      const [slug, ...rest] = id.split(":");
      const ts = rest.join(":");
      return redis.get<Candidate>(K.candidate(slug, ts));
    }),
  );
  return all.filter(
    (c): c is Candidate => !!c && c.status === "pending",
  );
}

export async function readAllCandidates(): Promise<Candidate[]> {
  const ids = await redis.zrange<string[]>(K.candidatesIndex, 0, -1, {
    rev: true,
  });
  if (!ids?.length) return [];
  const all = await Promise.all(
    ids.map((id) => {
      const [slug, ...rest] = id.split(":");
      const ts = rest.join(":");
      return redis.get<Candidate>(K.candidate(slug, ts));
    }),
  );
  return all.filter((c): c is Candidate => !!c);
}

export async function updateCandidateStatus(
  slug: string,
  ts: string,
  patch: Partial<Pick<Candidate, "status" | "approvedFields" | "reviewedAt" | "reviewedBy">>,
): Promise<void> {
  const existing = await redis.get<Candidate>(K.candidate(slug, ts));
  if (!existing) return;
  await redis.set(K.candidate(slug, ts), { ...existing, ...patch });
}

export const KEYS = K;
