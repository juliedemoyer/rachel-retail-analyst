/**
 * Ingest pipeline — chunk a doc, upsert chunks into the vector index,
 * and persist doc metadata in Redis.
 *
 * This is the one-and-only write path into the KB. Every ingestion entry
 * point (pdf upload, url fetch, IR scraper, Gmail briefing, RSS poll)
 * funnels through here so we get idempotency and consistent metadata.
 */

import { createHash, randomUUID } from "node:crypto";

import { redis } from "../redis";
import { chunkDocument } from "./chunk";
import type { DocMetadata, KbChunk } from "./types";
import { toVectorPayload, vectorIndex } from "./vector";

export interface IngestInput {
  title: string;
  text: string;
  source: DocMetadata["source"];
  tier: DocMetadata["tier"];
  url?: string;
  blobKey?: string;
  publishedAt?: string;
  accountIds?: string[];
  tags?: string[];
}

export interface IngestResult {
  docId: string;
  chunkCount: number;
  /** True if a doc with the same contentHash already existed. */
  deduped: boolean;
}

/**
 * Ingest a document end-to-end.
 *
 * 1. Hash the text for idempotency.
 * 2. If we've already ingested this hash, return the existing doc id.
 * 3. Chunk the text, upsert into Upstash Vector (server-side embedding).
 * 4. Persist doc metadata in Redis under `rachel:docs:{id}`.
 */
export async function ingestDocument(input: IngestInput): Promise<IngestResult> {
  const text = input.text.trim();
  if (!text) {
    throw new Error("Cannot ingest an empty document");
  }

  const contentHash = createHash("sha256").update(text).digest("hex");
  const existingId = (await redis.get<string>(`rachel:docs:hash:${contentHash}`)) ?? null;
  if (existingId) {
    const existingDoc = await redis.get<DocMetadata>(`rachel:docs:${existingId}`);
    return {
      docId: existingId,
      chunkCount: existingDoc?.chunkCount ?? 0,
      deduped: true,
    };
  }

  const docId = randomUUID();
  const chunks: KbChunk[] = chunkDocument(text, { docId });
  if (chunks.length === 0) {
    throw new Error("Chunker produced zero chunks — doc too short or malformed");
  }

  const doc: DocMetadata = {
    id: docId,
    title: input.title,
    source: input.source,
    tier: input.tier,
    url: input.url,
    blobKey: input.blobKey,
    publishedAt: input.publishedAt,
    accountIds: input.accountIds,
    tags: input.tags,
    ingestedAt: new Date().toISOString(),
    chunkCount: chunks.length,
    contentHash,
  };

  // Upsert chunks into Upstash Vector. The `data` field is embedded
  // server-side using the index's configured model — no local embedding
  // call needed.
  const index = vectorIndex();
  await index.upsert(
    chunks.map((chunk) => ({
      id: chunk.id,
      data: chunk.text,
      metadata: toVectorPayload(chunk, doc),
    })),
  );

  // Persist metadata + hash pointer atomically-ish (Upstash Redis does
  // not give us a real MULTI, but these keys are cheap to re-write on
  // retry).
  const TTL_180D = 180 * 86400;
  await Promise.all([
    redis.set(`rachel:docs:${docId}`, doc, { ex: TTL_180D }),
    redis.set(`rachel:docs:hash:${contentHash}`, docId, { ex: TTL_180D }),
  ]);

  // Sorted set with Unix-ms score so stale entries can be pruned by range.
  // Guard: if the key was previously a regular Set (legacy code path), delete
  // it first — the metadata and vector chunks are preserved, only the listing
  // index is lost and rebuilt incrementally.
  try {
    await redis.zadd("rachel:docs:index", { score: Date.now(), member: docId });
  } catch (e) {
    if (String(e).includes("WRONGTYPE")) {
      await redis.del("rachel:docs:index");
      await redis.zadd("rachel:docs:index", { score: Date.now(), member: docId });
    } else {
      throw e;
    }
  }

  return { docId, chunkCount: chunks.length, deduped: false };
}

export async function getDoc(docId: string): Promise<DocMetadata | null> {
  return (await redis.get<DocMetadata>(`rachel:docs:${docId}`)) ?? null;
}

export async function listDocs(): Promise<DocMetadata[]> {
  // rachel:docs:index is a Sorted Set (zadd). Use zrange to read members.
  const ids = (await redis.zrange("rachel:docs:index", 0, -1)) ?? [];
  if (ids.length === 0) return [];
  const docs = await Promise.all((ids as string[]).map((id) => getDoc(id)));
  return docs.filter((d): d is DocMetadata => d !== null);
}
