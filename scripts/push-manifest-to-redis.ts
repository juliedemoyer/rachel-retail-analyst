/**
 * scripts/push-manifest-to-redis.ts
 *
 * Reads data/pdf-manifest.json (written by upload-pdfs-to-blob.ts) and
 * pushes it to Redis under the key "rachel:pdf-manifest".
 *
 * This makes the manifest available to the Vercel cron job
 * (/api/cron?job=ir-extract) which cannot read the local filesystem.
 *
 * Run this after every upload-pdfs-to-blob.ts run:
 *
 *   npx tsx scripts/push-manifest-to-redis.ts
 *
 * Environment required:
 *   UPSTASH_URL + UPSTASH_TOKEN  (from vercel env pull .env.local)
 */

import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { existsSync } from "node:fs";
import { redis } from "@/lib/redis";

const MANIFEST_PATH = resolve(join(process.cwd(), "data/pdf-manifest.json"));
const MANIFEST_KEY  = "rachel:pdf-manifest";

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`Manifest not found: ${MANIFEST_PATH}`);
    console.error("Run scripts/upload-pdfs-to-blob.ts first.");
    process.exit(1);
  }

  const raw  = await readFile(MANIFEST_PATH, "utf-8");
  const data = JSON.parse(raw) as { files: unknown[]; updatedAt: string };

  await redis.set(MANIFEST_KEY, data);

  console.log(
    `✅  Pushed manifest to Redis → ${MANIFEST_KEY}`,
  );
  console.log(`    ${data.files.length} files, updatedAt: ${data.updatedAt}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
