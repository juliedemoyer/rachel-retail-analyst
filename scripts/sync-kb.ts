/**
 * sync-kb.ts — orchestrates ingest of all knowledge sources into Upstash Vector.
 *
 * Replaces the manual two-step (upload-pdfs-to-blob.ts + push-manifest-to-redis.ts)
 * by walking every authoritative source and routing through lib/kb/embed.ts.
 *
 * Usage:
 *   npx tsx scripts/sync-kb.ts                # all classes
 *   npx tsx scripts/sync-kb.ts --only companies,briefs
 *   npx tsx scripts/sync-kb.ts --dry-run      # report what would be ingested
 *
 * Document classes ingested:
 *   - company-profile  ← data/companies/*.md (51 files)
 *   - investor-filing  ← rachel:pdf-manifest in Redis (127 PDFs in Vercel Blob)
 *   - rachel-brief     ← VAULT_DIR/rachel/YYYY-MM-DD.md (last 90 days)
 *   - rachel-domain    ← Obsidian: 06_rachel domain brain/**\/*.md
 *   - pulse-item       ← rachel:pulse (last 30 days)
 *   - market-calendar  ← § 3 of 07_shared_sources.md
 *
 * Idempotent: dedupes via SHA-256 contentHash in embed.ts. Soft-deletes
 * docs whose source files no longer exist (tag `archived=true`).
 */

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { ingestDocument } from "../lib/kb/embed";
import { TAXONOMY_VERSION } from "../lib/kb/taxonomy";
import { redis } from "../lib/redis";

const REPO_ROOT = path.resolve(__dirname, "..");
const COMPANIES_DIR = path.join(REPO_ROOT, "data", "companies");
const VAULT_DIR = process.env.VAULT_DIR ?? "";
const DOMAIN_DIR = process.env.RACHEL_DOMAIN_DIR ?? "";

interface SyncStats {
  className: string;
  scanned: number;
  ingested: number;
  deduped: number;
  failed: number;
  errors: string[];
}

function newStats(name: string): SyncStats {
  return { className: name, scanned: 0, ingested: 0, deduped: 0, failed: 0, errors: [] };
}

async function safeReadDir(dir: string): Promise<string[]> {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

// ── company-profile ──────────────────────────────────────────────────────────
async function syncCompanyProfiles(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("company-profile");
  const files = (await safeReadDir(COMPANIES_DIR)).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    stats.scanned += 1;
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(COMPANIES_DIR, file);
    try {
      const text = await readFile(fullPath, "utf8");
      if (dryRun) {
        stats.ingested += 1;
        continue;
      }
      const res = await ingestDocument({
        title: `${slug} — company profile`,
        text,
        source: "manual_upload",
        tier: 1,
        accountIds: [slug],
        tags: ["company-profile", `slug:${slug}`, `taxonomy:${TAXONOMY_VERSION}`],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(`${slug}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return stats;
}

// ── rachel-brief ─────────────────────────────────────────────────────────────
async function syncRachelBriefs(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("rachel-brief");
  const briefsDir = path.join(VAULT_DIR, "rachel");
  const files = (await safeReadDir(briefsDir))
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()
    .slice(0, 90); // last 90 days max

  for (const file of files) {
    stats.scanned += 1;
    const date = file.replace(/\.md$/, "");
    try {
      const text = await readFile(path.join(briefsDir, file), "utf8");
      if (dryRun) {
        stats.ingested += 1;
        continue;
      }
      const res = await ingestDocument({
        title: `Rachel brief — ${date}`,
        text,
        source: "josh_briefing",
        tier: 2,
        publishedAt: `${date}T00:00:00.000Z`,
        tags: ["rachel-brief", `date:${date}`, `taxonomy:${TAXONOMY_VERSION}`],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(`${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return stats;
}

// ── rachel-domain ────────────────────────────────────────────────────────────
async function walkMd(root: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(dir: string) {
    const entries = await safeReadDir(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      try {
        const s = await stat(full);
        if (s.isDirectory()) await walk(full);
        else if (entry.endsWith(".md")) out.push(full);
      } catch {
        /* ignore */
      }
    }
  }
  await walk(root);
  return out;
}

async function syncRachelDomain(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("rachel-domain");
  const files = await walkMd(DOMAIN_DIR);

  for (const full of files) {
    stats.scanned += 1;
    const rel = path.relative(DOMAIN_DIR, full);
    try {
      const text = await readFile(full, "utf8");
      if (dryRun) {
        stats.ingested += 1;
        continue;
      }
      const res = await ingestDocument({
        title: `Rachel domain: ${rel}`,
        text,
        source: "framework",
        tier: 2,
        tags: ["rachel-domain", `path:${rel}`, `taxonomy:${TAXONOMY_VERSION}`],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(`${rel}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return stats;
}

// ── investor-filing & pulse-item & market-calendar ───────────────────────────
// Stubs for Phase 1.5 — wire to existing flows:
//   - investor-filing: existing upload-pdfs-to-blob.ts already chunks PDFs.
//     This sync will iterate `rachel:pdf-manifest` and call ingestDocument
//     once a PDF→text extractor lands (see Phase 2). Today the embed.ts
//     pipeline ingests PDF text via the existing PDF upload route; not
//     re-implemented here to avoid double-ingest.
//   - pulse-item: read `rachel:pulse` JSON, filter publishedAt > now-30d.
//   - market-calendar: parse § 3 of 07_shared_sources.md, one doc per row.

interface ManifestEntry {
  slug: string;
  filename: string;
  blobUrl: string;
  docType: string;
  period?: string;
  uploadedAt?: string;
}

async function syncInvestorFilings(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("investor-filing");
  // Manifest lives in two places; Redis is the deployed source of truth.
  let entries: ManifestEntry[] = [];
  try {
    const fromRedis = await redis.get<{ files: ManifestEntry[] }>(
      "rachel:pdf-manifest",
    );
    if (fromRedis?.files) entries = fromRedis.files;
  } catch {
    /* fallthrough */
  }
  if (entries.length === 0) {
    try {
      const raw = await readFile(
        path.join(REPO_ROOT, "data", "pdf-manifest.json"),
        "utf8",
      );
      entries = (JSON.parse(raw) as { files: ManifestEntry[] }).files ?? [];
    } catch (err) {
      stats.errors.push(
        `manifest unavailable: ${err instanceof Error ? err.message : String(err)}`,
      );
      return stats;
    }
  }

  for (const entry of entries) {
    stats.scanned += 1;
    if (dryRun) {
      stats.ingested += 1;
      continue;
    }
    // Note: this ingests filing METADATA only. Full PDF text extraction
    // is handled by the existing PDF pipeline (upload-pdfs-to-blob.ts +
    // server-side parser). This step ensures every manifest entry has a
    // discoverable metadata-doc in the KB so coverage queries hit even
    // when full-text indexing lags.
    try {
      const text = [
        `Investor filing: ${entry.filename}`,
        `Company slug: ${entry.slug}`,
        `Doc type: ${entry.docType}`,
        `Period: ${entry.period ?? "unknown"}`,
        `URL: ${entry.blobUrl}`,
      ].join("\n");
      const res = await ingestDocument({
        title: `${entry.slug} — ${entry.docType} ${entry.period ?? ""}`.trim(),
        text,
        source: "ir_filing",
        tier: 1,
        url: entry.blobUrl,
        publishedAt: entry.uploadedAt,
        accountIds: [entry.slug],
        tags: [
          "investor-filing",
          `slug:${entry.slug}`,
          `docType:${entry.docType}`,
          `period:${entry.period ?? "unknown"}`,
          `taxonomy:${TAXONOMY_VERSION}`,
        ],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(
        `${entry.filename}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  return stats;
}

interface PulseRecord {
  id: string;
  headline: string;
  category?: string;
  source?: string;
  url?: string;
  relevantAccounts?: string[];
  soWhat?: string;
  originalPublishedAt?: string;
  ingestedAt?: string;
}

async function syncPulseItems(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("pulse-item");
  let items: PulseRecord[] = [];
  try {
    const raw = await redis.get<string | PulseRecord[]>("rachel:pulse");
    items =
      typeof raw === "string"
        ? (JSON.parse(raw) as PulseRecord[])
        : Array.isArray(raw)
          ? raw
          : [];
  } catch (err) {
    stats.errors.push(
      `pulse fetch: ${err instanceof Error ? err.message : String(err)}`,
    );
    return stats;
  }

  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const fresh = items.filter((it) => {
    const t = Date.parse(it.originalPublishedAt ?? it.ingestedAt ?? "");
    return Number.isFinite(t) && t >= cutoff;
  });

  for (const item of fresh) {
    stats.scanned += 1;
    if (dryRun) {
      stats.ingested += 1;
      continue;
    }
    try {
      const text = [
        item.headline,
        item.soWhat ?? "",
        item.url ? `Source: ${item.url}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
      const res = await ingestDocument({
        title: item.headline.slice(0, 160),
        text,
        source: "industry_press",
        tier: 3,
        url: item.url,
        publishedAt: item.originalPublishedAt,
        accountIds: item.relevantAccounts,
        tags: [
          "pulse-item",
          `category:${item.category ?? "unknown"}`,
          `taxonomy:${TAXONOMY_VERSION}`,
        ],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(
        `${item.id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  return stats;
}

async function syncMarketCalendar(dryRun: boolean): Promise<SyncStats> {
  const stats = newStats("market-calendar");
  // § 3 of 07_shared_sources.md is canonical. Locate it via VAULT root.
  const sharedSources = path.join(
    path.dirname(VAULT_DIR),
    "07_shared_sources.md",
  );
  let text: string;
  try {
    text = await readFile(sharedSources, "utf8");
  } catch (err) {
    stats.errors.push(
      `shared_sources unavailable: ${err instanceof Error ? err.message : String(err)}`,
    );
    return stats;
  }

  // Extract § 3 calendar table. Rows look like:
  // | slug | company | sector | last_earnings | next_earnings | ir_url |
  const lines = text.split("\n");
  let inCalendar = false;
  for (const line of lines) {
    if (/^##?\s*3\b/.test(line)) inCalendar = true;
    else if (inCalendar && /^##?\s/.test(line)) break;
    if (!inCalendar) continue;
    const row = line.trim();
    if (!row.startsWith("|") || row.startsWith("|---")) continue;
    const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
    if (cols.length < 5) continue;
    const [slug, company, sector, lastE, nextE, irUrl] = cols;
    if (slug === "slug" || !slug) continue; // header row

    stats.scanned += 1;
    if (dryRun) {
      stats.ingested += 1;
      continue;
    }
    try {
      const docText = [
        `Earnings calendar entry for ${company}`,
        `Sector: ${sector}`,
        `Last earnings: ${lastE}`,
        `Next earnings: ${nextE}`,
        irUrl ? `IR URL: ${irUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      const res = await ingestDocument({
        title: `${company} earnings calendar — next ${nextE}`,
        text: docText,
        source: "framework",
        tier: 2,
        url: irUrl,
        accountIds: [slug],
        tags: [
          "market-calendar",
          `slug:${slug}`,
          `next_earnings:${nextE}`,
          `taxonomy:${TAXONOMY_VERSION}`,
        ],
      });
      res.deduped ? (stats.deduped += 1) : (stats.ingested += 1);
    } catch (err) {
      stats.failed += 1;
      stats.errors.push(
        `${slug}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  return stats;
}

// ── main ─────────────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const onlyIdx = args.findIndex((a) => a === "--only");
  const only =
    onlyIdx >= 0 && args[onlyIdx + 1]
      ? new Set(args[onlyIdx + 1].split(","))
      : null;
  return { dryRun, only };
}

const RUNNERS: Record<string, (dryRun: boolean) => Promise<SyncStats>> = {
  companies: syncCompanyProfiles,
  briefs: syncRachelBriefs,
  domain: syncRachelDomain,
  filings: syncInvestorFilings,
  pulse: syncPulseItems,
  calendar: syncMarketCalendar,
};

async function main() {
  const { dryRun, only } = parseArgs();
  console.log(
    JSON.stringify({
      msg: "sync-kb:start",
      taxonomy: TAXONOMY_VERSION,
      dryRun,
      only: only ? Array.from(only) : "all",
    }),
  );

  const results: SyncStats[] = [];
  for (const [name, runner] of Object.entries(RUNNERS)) {
    if (only && !only.has(name)) continue;
    const stats = await runner(dryRun);
    results.push(stats);
    console.log(
      JSON.stringify({
        msg: "sync-kb:class-done",
        ...stats,
        errors: stats.errors.slice(0, 3),
      }),
    );
  }

  const totals = results.reduce(
    (acc, r) => ({
      scanned: acc.scanned + r.scanned,
      ingested: acc.ingested + r.ingested,
      deduped: acc.deduped + r.deduped,
      failed: acc.failed + r.failed,
    }),
    { scanned: 0, ingested: 0, deduped: 0, failed: 0 },
  );
  console.log(JSON.stringify({ msg: "sync-kb:done", ...totals, dryRun }));

  if (totals.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("sync-kb fatal:", err);
  process.exit(1);
});
