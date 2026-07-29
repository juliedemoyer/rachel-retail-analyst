/**
 * /api/candidates
 *
 * GET  — returns all pending candidates (admin only via CRON_SECRET or Clerk role)
 * POST — creates a new candidate (called by ir-diff cron pipeline)
 * PATCH — approves or rejects a candidate; approve triggers writeSnapshot
 *
 * Candidate shape lives in lib/profiles/store.ts.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redis } from "@/lib/redis";
import { readProfile, writeProfile, writeSnapshot } from "@/lib/profiles/store";
import { isAdminUser } from "@/lib/admin";

// ── Types ──────────────────────────────────────────────────────────────────────

const CandidateBody = z.object({
  slug: z.string().min(1).max(60),
  earningsDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  proposedFields: z.record(z.string(), z.unknown()),
  citations: z.record(z.string(), z.string()).default({}),
});

const PatchBody = z.object({
  candidateId: z.string().min(1),
  decision: z.enum(["approved", "rejected"]),
  approvedFields: z.array(z.string()).optional(),
});

// ── Auth helpers ───────────────────────────────────────────────────────────────

async function isAdmin(req: Request): Promise<boolean> {
  const cronSecret = req.headers.get("authorization");
  if (cronSecret === `Bearer ${process.env.CRON_SECRET}`) return true;
  try {
    const { userId } = await auth();
    if (!userId) return false;
    // Fresh user fetch — sessionClaims.publicMetadata is empty in Clerk's
    // default session JWT, so we must hit the user record directly.
    const client = await clerkClient();
    const me = await client.users.getUser(userId);
    return isAdminUser(me);
  } catch (err) {
    console.error({ route: "isAdmin", error: err instanceof Error ? err.message : String(err) });
    return false;
  }
}

// ── Route handlers ─────────────────────────────────────────────────────────────

export async function GET(req: Request) {
  if (!(await isAdmin(req)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    // Index is a sorted set written by writeCandidate() via zadd — must use zrange, not get.
    const ids = await redis.zrange<string[]>("rachel:candidates:index", 0, -1, { rev: true });

    if (!ids?.length) return NextResponse.json({ candidates: [] });

    const entries = await Promise.all(
      ids.map(async (id) => {
        // id format from propose-fields: "${slug}:${ts}" — reconstruct full redis key.
        const [slug, ...rest] = id.split(":");
        const ts = rest.join(":");
        const key = `rachel:candidates:${slug}:${ts}`;
        const raw = await redis.get(key);
        const candidate = typeof raw === "string" ? JSON.parse(raw) : raw;
        // Normalise id to the full key so PATCH can use it directly.
        if (candidate) candidate.id = key;
        return candidate;
      }),
    );

    const candidates = entries.filter(Boolean).sort((a, b) =>
      new Date(b.ts).getTime() - new Date(a.ts).getTime(),
    );

    return NextResponse.json({ candidates });
  } catch (err) {
    console.error({ route: "GET /api/candidates", error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to load candidates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin(req)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = CandidateBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const { slug, earningsDate, proposedFields, citations } = parsed.data;
    const ts = new Date().toISOString();
    const candidateKey = `rachel:candidates:${slug}:${ts}`;

    const candidate = {
      id: candidateKey,
      slug,
      ts,
      earningsDate,
      proposedFields,
      citations,
      status: "pending",
    };

    await redis.set(candidateKey, candidate);

    // Update index
    const indexRaw = await redis.get("rachel:candidates:index");
    const index: string[] = Array.isArray(indexRaw) ? indexRaw : [];
    index.unshift(candidateKey);
    // Cap index at 200 entries
    await redis.set("rachel:candidates:index", index.slice(0, 200));

    return NextResponse.json({ ok: true, candidateKey });
  } catch (err) {
    console.error({ route: "POST /api/candidates", error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to create candidate" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdmin(req)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = PatchBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const { candidateId, decision, approvedFields } = parsed.data;
    const rawCandidate = await redis.get(candidateId);
    if (!rawCandidate)
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });

    const candidate = typeof rawCandidate === "string" ? JSON.parse(rawCandidate) : rawCandidate;

    // Update candidate status
    const updated = {
      ...candidate,
      status: decision,
      approvedFields: approvedFields ?? Object.keys(candidate.proposedFields ?? {}),
      reviewedAt: new Date().toISOString(),
    };
    await redis.set(candidateId, updated);

    // If approved, merge fields into the profile and write a snapshot
    if (decision === "approved") {
      const profile = await readProfile(candidate.slug);
      if (profile && candidate.proposedFields) {
        // Deep-merge proposed fields into the current profile
        const fields = approvedFields ?? Object.keys(candidate.proposedFields);
        const merged = { ...profile } as Record<string, unknown>;

        for (const field of fields) {
          if (field in (candidate.proposedFields as Record<string, unknown>)) {
            // Support dot-notation paths like "investorSnapshot.revenue"
            const parts = field.split(".");
            if (parts.length === 2) {
              const [section, key] = parts;
              const sectionData = merged[section] as Record<string, unknown> ?? {};
              merged[section] = { ...sectionData, [key]: (candidate.proposedFields as Record<string, unknown>)[field] };
            } else {
              merged[field] = (candidate.proposedFields as Record<string, unknown>)[field];
            }
          }
        }

        await writeProfile(merged as Parameters<typeof writeProfile>[0]);
        await writeSnapshot(candidate.slug, candidate.earningsDate);
      }
    }

    return NextResponse.json({ ok: true, status: decision });
  } catch (err) {
    console.error({ route: "PATCH /api/candidates", error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Failed to process candidate" }, { status: 500 });
  }
}
