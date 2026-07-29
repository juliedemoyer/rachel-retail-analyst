import { Index } from "@upstash/vector";

/**
 * Upstash Vector client — the retrieval backbone for Rachel's KB.
 *
 * We index chunks with the doc metadata as payload so search results
 * return both the matched passage and its citation in a single round trip.
 *
 * Env vars (provisioned via `vercel env pull`):
 *   UPSTASH_VECTOR_REST_URL
 *   UPSTASH_VECTOR_REST_TOKEN
 *
 * The index is created in the Upstash console with a built-in embedding
 * model (e.g. `bge-large-en-v1.5`, 1024 dims). Rachel passes raw text via
 * the `data` field — Upstash handles embedding server-side, so Phase 0
 * does not need its own embedding provider.
 */

import type { DocMetadata, KbChunk } from "./types";

export type VectorPayload = {
  docId: string;
  chunkIndex: number;
  text: string;
  title: string;
  source: DocMetadata["source"];
  tier: DocMetadata["tier"];
  url?: string;
  publishedAt?: string;
  accountIds?: string[];
  tags?: string[];
  // Upstash's `Dict` constraint requires an index signature.
  [key: string]: unknown;
};

let _index: Index<VectorPayload> | null = null;

export function vectorIndex(): Index<VectorPayload> {
  if (_index) return _index;
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN must be set. Run `vercel env pull .env.local`.",
    );
  }
  _index = new Index<VectorPayload>({ url, token });
  return _index;
}

/**
 * Build the payload for a chunk. Pure — safe to unit-test.
 */
export function toVectorPayload(chunk: KbChunk, doc: DocMetadata): VectorPayload {
  return {
    docId: chunk.docId,
    chunkIndex: chunk.index,
    text: chunk.text,
    title: doc.title,
    source: doc.source,
    tier: doc.tier,
    url: doc.url,
    publishedAt: doc.publishedAt,
    accountIds: doc.accountIds,
    tags: doc.tags,
  };
}
