/**
 * One-way sync: Obsidian vault → repo.
 *
 * Vault path (set via RACHEL_VAULT_ROOT env var):
 *   {RACHEL_VAULT_ROOT}/{Company}/{slug}_profile.md
 *   {RACHEL_VAULT_ROOT}/{Company}/{slug}_intel.md
 *
 * Repo:
 *   data/companies/{slug}.md         ← from {slug}_profile.md
 *   data/companies/{slug}.notes.md   ← from {slug}_intel.md  (Ask Rachel system-prompt prefix)
 *
 * Usage:
 *   tsx scripts/sync-from-obsidian.ts                       # sync all
 *   tsx scripts/sync-from-obsidian.ts --slug lvmh           # one company
 *   tsx scripts/sync-from-obsidian.ts --scaffold lvmh       # write empty stubs into vault if missing
 */

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const VAULT_ROOT = process.env.RACHEL_VAULT_ROOT ?? "";

const REPO_ROOT = resolve(__dirname, "..");
const REPO_COMPANIES = join(REPO_ROOT, "data", "companies");

interface Args {
  slug?: string;
  scaffold?: string;
}

function parseArgs(): Args {
  const out: Args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--slug") out.slug = argv[++i];
    else if (argv[i] === "--scaffold") out.scaffold = argv[++i];
  }
  return out;
}

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function syncOne(companyFolderName: string): Promise<{ slug: string | null; copied: string[] }> {
  const companyDir = join(VAULT_ROOT, companyFolderName);
  const files = await readdir(companyDir);
  const profileFile = files.find((f) => /_profile\.md$/i.test(f));
  if (!profileFile) return { slug: null, copied: [] };

  const slug = profileFile.replace(/_profile\.md$/i, "").toLowerCase();
  const intelFile = files.find((f) => f.toLowerCase() === `${slug}_intel.md`);

  const copied: string[] = [];

  // Profile
  const profileSrc = join(companyDir, profileFile);
  const profileDst = join(REPO_COMPANIES, `${slug}.md`);
  await writeFile(profileDst, await readFile(profileSrc, "utf8"));
  copied.push(profileDst);

  // Intel notes
  if (intelFile) {
    const intelSrc = join(companyDir, intelFile);
    const intelDst = join(REPO_COMPANIES, `${slug}.notes.md`);
    await writeFile(intelDst, await readFile(intelSrc, "utf8"));
    copied.push(intelDst);
  }

  return { slug, copied };
}

async function scaffoldVaultStub(slug: string): Promise<void> {
  const companyDir = join(VAULT_ROOT, slug.toUpperCase());
  await mkdir(companyDir, { recursive: true });
  const profilePath = join(companyDir, `${slug}_profile.md`);
  if (await exists(profilePath)) {
    console.log(`Stub already exists: ${profilePath}`);
    return;
  }
  const stub = `---
slug: ${slug}
meta:
  company: ${slug.toUpperCase()}
  ticker: ""
  hq: { city: "", country: "FR", aiActApplies: true }
  sector: "Luxury & Beauty"
  isGroup: false
  isAINative: false

investorSnapshot:
  revenue: { absolute: 0, currency: "€B", evidenceTier: estimated }
  operatingProfit: { absolute: 0, currency: "€B", evidenceTier: estimated }
  netCash: { absolute: 0, currency: "€B", evidenceTier: estimated }
  employees: { headcount: 0, evidenceTier: estimated }
  retailStores: { evidenceTier: estimated }
  countries: {}
  hq: { city: "", country: "FR", aiActApplies: true }
  reporting: { latestReportDate: "2026-01-01" }

aiPerception:
  score: { rhetoric: 1, production: 0, quadrant: not_visible }
  aiFraming: { value: not_mentioned, evidenceTier: estimated }
  quantifiedROI: { stated: false }
  consumerFacingAIProduct: { exists: false, evidenceTier: estimated }
  cSuiteAIPresenter: { exists: false, evidenceTier: estimated }
  genAIMentioned: { value: false, evidenceTier: estimated }
  dedicatedAISection: { value: false, evidenceTier: estimated }
---

## Rachel's notes

(Free-form. Mutable. Never snapshotted.)
`;
  await writeFile(profilePath, stub);
  console.log(`✓ Wrote stub ${profilePath}`);
}

async function main() {
  const args = parseArgs();

  if (args.scaffold) {
    await scaffoldVaultStub(args.scaffold);
    return;
  }

  await mkdir(REPO_COMPANIES, { recursive: true });

  if (!(await exists(VAULT_ROOT))) {
    console.error(`Vault root not found: ${VAULT_ROOT}`);
    console.error(`Set RACHEL_VAULT_ROOT to override.`);
    process.exit(1);
  }

  let companyFolders: string[];
  if (args.slug) {
    // Find folder matching slug case-insensitively
    const folders = await readdir(VAULT_ROOT);
    const match = folders.find((f) => f.toLowerCase() === args.slug!.toLowerCase());
    if (!match) {
      console.error(`No vault folder found for slug ${args.slug}`);
      process.exit(1);
    }
    companyFolders = [match];
  } else {
    const all = await readdir(VAULT_ROOT);
    companyFolders = [];
    for (const f of all) {
      const s = await stat(join(VAULT_ROOT, f));
      if (s.isDirectory()) companyFolders.push(f);
    }
  }

  let synced = 0;
  let skipped = 0;
  for (const folder of companyFolders) {
    const { slug, copied } = await syncOne(folder).catch((e) => {
      console.error(`✗ ${folder}: ${(e as Error).message}`);
      return { slug: null as string | null, copied: [] as string[] };
    });
    if (!slug) {
      skipped++;
      continue;
    }
    synced++;
    console.log(`✓ ${slug}  (${copied.length} files)`);
  }
  console.log(`\nDone. ${synced} synced, ${skipped} skipped (no _profile.md).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
