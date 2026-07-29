/**
 * scripts/extract-all-candidates.ts
 *
 * Batch extraction runner. Reads data/pdf-manifest.json, groups PDFs by slug,
 * calls proposeFields() for each company, and writes the resulting Candidates
 * to Redis for the owner to review in /app/admin/candidates.
 *
 * Usage:
 *   npx tsx scripts/extract-all-candidates.ts
 *   npx tsx scripts/extract-all-candidates.ts --slug lvmh        # single company
 *   npx tsx scripts/extract-all-candidates.ts --slug lvmh,kering  # comma-separated
 *   npx tsx scripts/extract-all-candidates.ts --dry-run           # parse only, no Redis write
 *
 * Environment required:
 *   ANTHROPIC_API_KEY        — for the LLM call
 *   UPSTASH_URL + UPSTASH_TOKEN — for Redis writes
 *   EXTRACT_MODEL            — optional override (default: claude-haiku-4.5)
 *
 * Each company takes ~15–30 s (PDF extraction + LLM call).
 * All 46 companies: ~15–25 min sequential (rate-limit-safe).
 *
 * The script skips companies that already have a pending candidate created
 * in the last 90 days, unless --force is passed.
 */

import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { existsSync } from "node:fs";

import { proposeFields } from "@/lib/extract/propose-fields";
import { writeCandidate, readPendingCandidates } from "@/lib/profiles/store";
import type { ManifestEntry } from "./upload-pdfs-to-blob";

// ── Config ────────────────────────────────────────────────────────────────────

const MANIFEST_PATH = resolve(join(process.cwd(), "data/pdf-manifest.json"));
const FORCE         = process.argv.includes("--force");
const DRY_RUN       = process.argv.includes("--dry-run");

// --slug lvmh  or  --slug lvmh,kering
const slugArg = process.argv.find((a) => a.startsWith("--slug="))?.slice(7)
  ?? process.argv[process.argv.indexOf("--slug") + 1];
const ONLY_SLUGS = slugArg
  ? slugArg.split(",").map((s) => s.trim()).filter(Boolean)
  : null;

// How recently a pending candidate was created before we skip re-extraction.
const SKIP_IF_CREATED_WITHIN_DAYS = 90;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Company display name from slug (best-effort for logging). */
function displayName(slug: string, entries: ManifestEntry[]): string {
  return entries[0]?.filename.split("_")[0] ?? slug;
}

/** Group manifest entries by slug. */
function groupBySlug(
  entries: ManifestEntry[],
): Map<string, ManifestEntry[]> {
  const map = new Map<string, ManifestEntry[]>();
  for (const e of entries) {
    const list = map.get(e.slug) ?? [];
    list.push(e);
    map.set(e.slug, list);
  }
  return map;
}

/** Check if a company already has a recent pending candidate. */
async function hasRecentCandidate(slug: string): Promise<boolean> {
  if (FORCE) return false;
  const pending = await readPendingCandidates();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - SKIP_IF_CREATED_WITHIN_DAYS);
  return pending.some(
    (c) => c.slug === slug && new Date(c.ts) > cutoff,
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate environment.
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set. Add it to .env.local.");
    process.exit(1);
  }

  if (!existsSync(MANIFEST_PATH)) {
    console.error(
      `Manifest not found: ${MANIFEST_PATH}\nRun scripts/upload-pdfs-to-blob.ts first.`,
    );
    process.exit(1);
  }

  const manifest = JSON.parse(
    await readFile(MANIFEST_PATH, "utf-8"),
  ) as { files: ManifestEntry[] };

  const bySlug = groupBySlug(manifest.files);
  console.log(
    `\n📋  Manifest: ${manifest.files.length} PDFs across ${bySlug.size} companies`,
  );

  // Apply --slug filter.
  const slugs = ONLY_SLUGS
    ? [...bySlug.keys()].filter((s) => ONLY_SLUGS.includes(s))
    : [...bySlug.keys()].sort();

  if (ONLY_SLUGS && slugs.length === 0) {
    console.error(`No manifest entries found for slug(s): ${ONLY_SLUGS.join(", ")}`);
    process.exit(1);
  }

  console.log(`\nProcessing ${slugs.length} company/companies…`);
  if (DRY_RUN) console.log("⚠️  DRY RUN — candidates will NOT be written to Redis\n");
  if (FORCE)   console.log("⚠️  FORCE — skipping recent-candidate check\n");

  const results = { ok: 0, skipped: 0, failed: 0 };

  for (const slug of slugs) {
    const entries = bySlug.get(slug)!;
    const name = displayName(slug, entries);

    console.log(`\n── ${slug} (${name}) — ${entries.length} PDF(s) ──`);

    // Skip if already has a recent pending candidate.
    if (await hasRecentCandidate(slug)) {
      console.log(`  ↷ skipped — pending candidate created within ${SKIP_IF_CREATED_WITHIN_DAYS} days (use --force to override)`);
      results.skipped++;
      continue;
    }

    // Use blobUrl if available (production), fall back to localPath (local dev).
    const sources = entries.map((e) =>
      e.blobUrl && e.blobUrl.startsWith("http") ? e.blobUrl : e.localPath,
    );

    try {
      const candidate = await proposeFields({
        slug,
        companyName: name,
        pdfSources: sources,
      });

      if (DRY_RUN) {
        console.log(
          `  [dry-run] candidate ready — ${Object.keys(candidate.proposedFields).length} fields, earningsDate=${candidate.earningsDate}`,
        );
      } else {
        await writeCandidate(candidate);
        console.log(
          `  ✓ written to Redis — ${Object.keys(candidate.proposedFields).length} fields, earningsDate=${candidate.earningsDate}`,
        );
      }

      results.ok++;
    } catch (err) {
      console.error(`  ✗ ${slug}: ${(err as Error).message}`);
      results.failed++;
    }
  }

  console.log(
    `\n✅  Done. ok=${results.ok}  skipped=${results.skipped}  failed=${results.failed}`,
  );
  if (results.ok > 0 && !DRY_RUN) {
    console.log(
      "\nReview candidates at: https://your-domain.example/app/admin/candidates",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
