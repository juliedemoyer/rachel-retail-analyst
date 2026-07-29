/**
 * scripts/ingest-news-to-profiles.ts
 *
 * Reads recent pulse items from Redis that have a company_slug and appends
 * them as dated notes under "## Rachel's notes" in the relevant MD file.
 * Then re-seeds each modified company to Redis via seed-profiles.ts.
 *
 * Deduplication: a pulse item is skipped if its URL already appears anywhere
 * in the MD file, so running this script twice is safe.
 *
 * Usage:
 *   npx tsx scripts/ingest-news-to-profiles.ts             # last 24h
 *   npx tsx scripts/ingest-news-to-profiles.ts --since 2026-05-18
 *   npx tsx scripts/ingest-news-to-profiles.ts --dry-run   # print changes, no writes
 *   npx tsx scripts/ingest-news-to-profiles.ts --slug lvmh # one company only
 *
 * Environment required:
 *   UPSTASH_URL + UPSTASH_TOKEN (Redis)
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";
import { redis } from "@/lib/redis";

const REPO_ROOT = resolve(__dirname, "..");
const COMPANIES_DIR = join(REPO_ROOT, "data", "companies");
const NOTES_HEADING = "## Rachel's notes";

interface PulseItem {
  id?: string;
  headline: string;
  summary?: string;
  url?: string;
  company_slug?: string;
  ts?: string;
  date?: string;
  source?: string;
  drop_in_meeting?: string;
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");
  const slugIdx = argv.indexOf("--slug");
  const slug = slugIdx >= 0 ? argv[slugIdx + 1] : undefined;
  const sinceIdx = argv.indexOf("--since");
  const sinceArg = sinceIdx >= 0 ? argv[sinceIdx + 1] : undefined;
  const since = sinceArg
    ? new Date(sinceArg)
    : new Date(Date.now() - 24 * 60 * 60 * 1000); // default: last 24h
  return { dryRun, slug, since };
}

async function loadPulseItems(): Promise<PulseItem[]> {
  const raw = await redis.get<string | PulseItem[]>("rachel:pulse");
  if (!raw) return [];
  return typeof raw === "string" ? (JSON.parse(raw) as PulseItem[]) : raw;
}

function itemDate(item: PulseItem): Date {
  return new Date(item.ts ?? item.date ?? 0);
}

function formatItemAsNote(item: PulseItem, dateStr: string): string {
  const lines: string[] = [];
  const title = item.url
    ? `[${item.headline}](${item.url})`
    : item.headline;
  lines.push(`### News — ${dateStr}`);
  lines.push("");
  lines.push(`- ${title}`);
  if (item.summary) lines.push(`  ${item.summary}`);
  if (item.drop_in_meeting) lines.push(`  *Drop-in: ${item.drop_in_meeting}*`);
  if (item.source) lines.push(`  Source: ${item.source}`);
  return lines.join("\n");
}

async function patchMdFile(
  slug: string,
  items: PulseItem[],
  dryRun: boolean,
): Promise<{ slug: string; added: number; skipped: number }> {
  const mdPath = join(COMPANIES_DIR, `${slug}.md`);
  let content: string;
  try {
    content = await readFile(mdPath, "utf8");
  } catch {
    console.warn(`  [skip] ${slug}: MD file not found at ${mdPath}`);
    return { slug, added: 0, skipped: items.length };
  }

  let added = 0;
  let skipped = 0;
  const patches: string[] = [];

  for (const item of items) {
    // Dedup by URL presence in the file
    if (item.url && content.includes(item.url)) {
      skipped++;
      continue;
    }
    // Dedup by headline snippet (first 60 chars)
    const headlineSnip = item.headline.slice(0, 60).toLowerCase();
    if (content.toLowerCase().includes(headlineSnip)) {
      skipped++;
      continue;
    }

    const d = itemDate(item);
    const dateStr = Number.isFinite(d.getTime()) && d.getTime() > 0
      ? d.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    patches.push(formatItemAsNote(item, dateStr));
    added++;
  }

  if (patches.length === 0) return { slug, added: 0, skipped };

  // Insert patches after "## Rachel's notes" heading.
  const notesIdx = content.indexOf(NOTES_HEADING);
  if (notesIdx === -1) {
    // No notes section — append one at the end.
    const newContent = `${content.trimEnd()}\n\n${NOTES_HEADING}\n\n${patches.join("\n\n")}\n`;
    if (!dryRun) await writeFile(mdPath, newContent, "utf8");
    else console.log(`  [dry-run] would create notes section in ${slug}.md`);
  } else {
    // Insert after the heading line (and any immediately following blank line).
    const afterHeading = notesIdx + NOTES_HEADING.length;
    const newContent =
      content.slice(0, afterHeading) +
      "\n\n" +
      patches.join("\n\n") +
      "\n\n" +
      content.slice(afterHeading).replace(/^\n+/, "");
    if (!dryRun) await writeFile(mdPath, newContent, "utf8");
    else console.log(`  [dry-run] would prepend ${patches.length} item(s) to notes in ${slug}.md`);
  }

  return { slug, added, skipped };
}

async function reseedSlug(slug: string, dryRun: boolean) {
  if (dryRun) {
    console.log(`  [dry-run] would run: npx tsx scripts/seed-profiles.ts --slug ${slug}`);
    return;
  }
  try {
    execSync(`npx tsx scripts/seed-profiles.ts --slug ${slug}`, {
      cwd: REPO_ROOT,
      stdio: "pipe",
    });
    console.log(`  reseeded ${slug} → Redis`);
  } catch (err) {
    console.error(`  [warn] reseed failed for ${slug}:`, (err as Error).message.slice(0, 120));
  }
}

async function main() {
  const { dryRun, slug: onlySlug, since } = parseArgs();

  console.log(JSON.stringify({
    msg: "ingest-news:start",
    since: since.toISOString(),
    onlySlug: onlySlug ?? "all",
    dryRun,
  }));

  const allItems = await loadPulseItems();

  // Filter: must have company_slug, must be within the time window
  const relevant = allItems.filter((item) => {
    if (!item.company_slug) return false;
    if (onlySlug && item.company_slug !== onlySlug) return false;
    const d = itemDate(item);
    return Number.isFinite(d.getTime()) && d >= since;
  });

  if (relevant.length === 0) {
    console.log("No pulse items with company_slug found in the time window. Done.");
    return;
  }

  // Group by slug
  const bySlug = new Map<string, PulseItem[]>();
  for (const item of relevant) {
    const s = item.company_slug!;
    const list = bySlug.get(s) ?? [];
    list.push(item);
    bySlug.set(s, list);
  }

  // Sort each group newest-first so prepended notes read chronologically
  for (const [, items] of bySlug) {
    items.sort((a, b) => itemDate(b).getTime() - itemDate(a).getTime());
  }

  let totalAdded = 0;
  let totalSkipped = 0;
  const reseeded: string[] = [];

  for (const [slug, items] of bySlug) {
    console.log(`\n${slug} (${items.length} candidate items)`);
    const result = await patchMdFile(slug, items, dryRun);
    totalAdded += result.added;
    totalSkipped += result.skipped;

    if (result.added > 0) {
      await reseedSlug(slug, dryRun);
      reseeded.push(slug);
    }
  }

  console.log(JSON.stringify({
    msg: "ingest-news:done",
    totalAdded,
    totalSkipped,
    reseeded: reseeded.length,
    dryRun,
  }));
}

main().catch((err) => {
  console.error("ingest-news fatal:", err);
  process.exit(1);
});
