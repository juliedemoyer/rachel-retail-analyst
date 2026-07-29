/**
 * scripts/upload-pdfs-to-blob.ts
 *
 * One-shot (but idempotent) script that uploads the local IR-filing PDFs to
 * Vercel Blob and writes a manifest so the extraction pipeline can find them.
 *
 * Usage:
 *   npx tsx scripts/upload-pdfs-to-blob.ts
 *
 * Environment required:
 *   BLOB_READ_WRITE_TOKEN   — from `vercel env pull .env.local`
 *
 * Blob path convention:
 *   rachel-ir-filings/{slug}/{period}/{filename}.pdf
 *
 * Manifest written to:
 *   data/pdf-manifest.json
 *
 * Idempotency: files already present in the manifest (by local path) are
 * skipped unless --force is passed. Safe to re-run after adding new PDFs.
 *
 * New earnings cycle: drop the new PDFs into the local folder and re-run.
 * Only the new files are uploaded; the manifest is updated in place.
 */

import { put } from "@vercel/blob";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { existsSync } from "node:fs";

import { slugFromFilename, getPdfPrefix } from "@/lib/extract/slug-map";
import { inferDocType, inferPeriod } from "@/lib/extract/pdf-reader";

// ── Config ────────────────────────────────────────────────────────────────────

const PDF_DIR = resolve(
  process.env.PDF_DIR ??
    join(
      process.cwd(),
      "../../1. Knowledge/Investor Relations Earnings - Watchlist",
    ),
);

const MANIFEST_PATH = resolve(join(process.cwd(), "data/pdf-manifest.json"));

const FORCE = process.argv.includes("--force");
const DRY_RUN = process.argv.includes("--dry-run");

// ── Manifest types ────────────────────────────────────────────────────────────

export interface ManifestEntry {
  slug: string;
  filename: string;
  localPath: string;
  blobUrl: string;
  docType: string;
  period: string;
  uploadedAt: string;
}

export interface Manifest {
  updatedAt: string;
  files: ManifestEntry[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function loadManifest(): Promise<Manifest> {
  if (existsSync(MANIFEST_PATH)) {
    const raw = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(raw) as Manifest;
  }
  return { updatedAt: new Date().toISOString(), files: [] };
}

async function saveManifest(manifest: Manifest): Promise<void> {
  manifest.updatedAt = new Date().toISOString();
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

function blobPath(slug: string, period: string, filename: string): string {
  return `rachel-ir-filings/${slug}/${period}/${filename}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📂  PDF source: ${PDF_DIR}`);
  console.log(`📋  Manifest:   ${MANIFEST_PATH}`);
  if (DRY_RUN) console.log("⚠️   DRY RUN — no files will be uploaded\n");
  if (FORCE)   console.log("⚠️   FORCE — re-uploading even existing entries\n");

  // List all PDF files in the source directory.
  const allFiles = (await readdir(PDF_DIR)).filter((f) =>
    f.toLowerCase().endsWith(".pdf"),
  );
  console.log(`Found ${allFiles.length} PDF files\n`);

  const manifest = await loadManifest();
  const existingPaths = new Set(manifest.files.map((e) => e.localPath));

  let uploaded = 0;
  let skipped = 0;
  let unknown = 0;

  for (const filename of allFiles.sort()) {
    const slug = slugFromFilename(filename);

    if (!slug) {
      const prefix = getPdfPrefix(filename);
      console.warn(`  ⚠  Unknown prefix "${prefix}" — add to slug-map.ts: ${filename}`);
      unknown++;
      continue;
    }

    const localPath = join(PDF_DIR, filename);
    const docType = inferDocType(filename);
    const period = inferPeriod(filename);

    // Skip if already in manifest (unless --force).
    if (!FORCE && existingPaths.has(localPath)) {
      skipped++;
      continue;
    }

    const blobKey = blobPath(slug, period, filename);

    if (DRY_RUN) {
      console.log(`  [dry-run] ${slug}/${period}/${filename}`);
      uploaded++;
      continue;
    }

    try {
      const bytes = await readFile(localPath);
      const blob = await put(blobKey, bytes, {
        access: "private",
        contentType: "application/pdf",
        addRandomSuffix: false,
      });

      const entry: ManifestEntry = {
        slug,
        filename,
        localPath,
        blobUrl: blob.url,
        docType,
        period,
        uploadedAt: new Date().toISOString(),
      };

      // Replace existing entry for this localPath or append.
      const idx = manifest.files.findIndex((e) => e.localPath === localPath);
      if (idx >= 0) {
        manifest.files[idx] = entry;
      } else {
        manifest.files.push(entry);
      }

      console.log(`  ✓  ${slug}/${period}/${filename}`);
      uploaded++;
    } catch (err) {
      console.error(`  ✗  ${filename}: ${(err as Error).message}`);
    }
  }

  if (!DRY_RUN) {
    await saveManifest(manifest);
    console.log(`\n✅  Manifest saved → ${MANIFEST_PATH}`);
  }

  console.log(
    `\nDone. Uploaded: ${uploaded}  Skipped: ${skipped}  Unknown prefix: ${unknown}`,
  );

  if (unknown > 0) {
    console.log(
      "\nAdd unknown prefixes to lib/extract/slug-map.ts, then re-run.",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
