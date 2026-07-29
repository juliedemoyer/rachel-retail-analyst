/**
 * Seed profiles into Upstash from `data/companies/*.md`.
 *
 * Usage:
 *   tsx scripts/seed-profiles.ts                      # upsert all profiles
 *   tsx scripts/seed-profiles.ts --slug lvmh          # only one
 *   tsx scripts/seed-profiles.ts --write-snapshot 2026-01-30   # also snapshot today's profile state under that date
 *   tsx scripts/seed-profiles.ts --rebuild-only       # just rebuild rachel:profiles:all
 *
 * Side effects:
 *   - rachel:profile:{slug}              ← upserted
 *   - rachel:profiles:all                ← rebuilt at end
 *   - rachel:scores:{slug}:{date}        ← if --write-snapshot passed
 *   - rachel:scores:{slug}:trend         ← appended (sorted, deduped)
 *   - rachel:scores:{slug}:latest        ← updated
 *   - data/earnings-calendar.json        ← rewritten (cron compass)
 */

import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseAllProfiles, parseProfileFile, formatIssues } from "../lib/profiles/parse";
import {
  writeProfile,
  writeSnapshot,
  rebuildProfilesAll,
  readProfile,
} from "../lib/profiles/store";
import type { CompanyProfile } from "../lib/profiles/schema";

interface Args {
  slug?: string;
  writeSnapshot?: string;
  rebuildOnly?: boolean;
}

function parseArgs(): Args {
  const out: Args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--slug") out.slug = argv[++i];
    else if (a === "--write-snapshot") out.writeSnapshot = argv[++i];
    else if (a === "--rebuild-only") out.rebuildOnly = true;
  }
  return out;
}

const REPO_ROOT = resolve(__dirname, "..");
const COMPANIES_DIR = join(REPO_ROOT, "data", "companies");
const CALENDAR_PATH = join(REPO_ROOT, "data", "earnings-calendar.json");

async function main() {
  const args = parseArgs();

  if (args.rebuildOnly) {
    const profiles = await rebuildProfilesAll();
    console.log(`✓ Rebuilt rachel:profiles:all (${profiles.length} profiles)`);
    await writeEarningsCalendar(profiles);
    return;
  }

  let results;
  if (args.slug) {
    const file = join(COMPANIES_DIR, `${args.slug}.md`);
    results = [await parseProfileFile(file)];
  } else {
    results = await parseAllProfiles(COMPANIES_DIR);
  }

  let ok = 0;
  let failed = 0;
  const upsertedProfiles: CompanyProfile[] = [];

  for (const r of results) {
    if (!r.ok || !r.profile) {
      failed++;
      console.error(`✗ ${r.filePath}\n${r.error ?? ""}`);
      if (r.issues) console.error(formatIssues(r.issues));
      continue;
    }
    await writeProfile(r.profile);
    upsertedProfiles.push(r.profile);
    ok++;
    console.log(`✓ ${r.profile.slug}  (${r.profile.meta.company})`);
  }

  // Snapshot if requested
  if (args.writeSnapshot && upsertedProfiles.length) {
    console.log(`\n📸 Writing snapshots dated ${args.writeSnapshot}...`);
    for (const p of upsertedProfiles) {
      const snap = await writeSnapshot(p.slug, args.writeSnapshot);
      if (snap) console.log(`  • ${p.slug} snapshot @ ${args.writeSnapshot}`);
    }
  }

  // Rebuild denormalised list (already done in writeProfile, but re-run to be safe after snapshots)
  const all = await rebuildProfilesAll();
  await writeEarningsCalendar(all);

  // Regenerate the Vercel-profile-page template overlay from MD content so
  // recentSources / namedProductionTools / cSuiteAIPresenter additions are
  // mirrored onto /app/companies/<slug> on the next deploy. Runs after every
  // seed so editing the MD is the only step required end-to-end.
  await syncTemplateOverlays();

  console.log(
    `\nDone. ${ok} ok, ${failed} failed. ${all.length} total profiles in rachel:profiles:all.`,
  );
  if (failed > 0) process.exit(1);
}

async function syncTemplateOverlays() {
  // Import + run inline; keeps the script's existing CLI surface tidy.
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync("npx", ["tsx", "scripts/sync-template-overlays.ts"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  if (result.status !== 0) {
    console.error("⚠ Template-overlay sync failed; profile pages may be stale until rerun.");
  }
}

async function writeEarningsCalendar(profiles: CompanyProfile[]) {
  const entries = profiles
    .map((p) => ({
      slug: p.slug,
      company: p.meta.company,
      sector: p.meta.sector,
      nextTradingUpdate: p.investorSnapshot.reporting.nextTradingUpdate ?? null,
      latestReportDate: p.investorSnapshot.reporting.latestReportDate,
    }))
    .filter((e) => e.nextTradingUpdate)
    .sort((a, b) =>
      (a.nextTradingUpdate ?? "").localeCompare(b.nextTradingUpdate ?? ""),
    );
  await writeFile(CALENDAR_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), entries }, null, 2));
  console.log(`✓ Wrote ${CALENDAR_PATH} (${entries.length} entries)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
