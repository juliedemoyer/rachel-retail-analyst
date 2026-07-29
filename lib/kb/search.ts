/**
 * KB retrieval — the read path. This is the ONE function every agent
 * tool must call before making a claim. Phase 1 wires it into the
 * `searchKnowledgeBase` tool on the Rachel agent.
 *
 * Phase 0 is pure vector retrieval via Upstash's server-side embedding.
 * Phase 2 adds BM25 over an Upstash Vector sparse index for true hybrid
 * retrieval — the interface here is stable so nothing above has to
 * change.
 */

import { getDoc } from "./embed";
import { lexicalRescore } from "./lexical";
import { rerank } from "./rerank";
import type { DocMetadata, KbSearchQuery, KbSearchResult } from "./types";
import { vectorIndex } from "./vector";

export async function searchKnowledgeBase(query: KbSearchQuery): Promise<KbSearchResult[]> {
  const trimmed = query.query.trim();
  if (!trimmed) return [];

  const finalTopK = query.topK ?? 6;
  // Over-fetch from vector to give the reranker a real candidate set.
  const recallK = Math.max(finalTopK * 4, 20);
  const minScore = query.minScore ?? 0.25;

  // Build a metadata filter string if any scoping is requested.
  const filterParts: string[] = [];
  if (query.tier !== undefined) filterParts.push(`tier = ${query.tier}`);
  if (query.source) filterParts.push(`source = '${query.source}'`);
  if (query.accountId) filterParts.push(`accountIds CONTAINS '${query.accountId}'`);
  const filter = filterParts.length > 0 ? filterParts.join(" AND ") : undefined;

  const index = vectorIndex();
  const matches = await index.query({
    data: trimmed,
    topK: recallK,
    includeMetadata: true,
    includeData: true,
    ...(filter ? { filter } : {}),
  });

  const results: KbSearchResult[] = [];
  for (const match of matches) {
    if (match.score < minScore) continue;
    const metadata = match.metadata;
    if (!metadata) continue;

    // Re-hydrate the full doc record so callers get the canonical
    // citation info (ingestedAt, blobKey, contentHash, etc.).
    const doc = (await getDoc(metadata.docId)) ?? fallbackDocFromMetadata(metadata);

    results.push({
      chunk: {
        id: String(match.id),
        docId: metadata.docId,
        index: metadata.chunkIndex,
        text: (match.data as string | undefined) ?? metadata.text,
        startOffset: 0,
        endOffset: 0,
      },
      doc,
      score: match.score,
    });
  }

  // Stage 2: lexical rescore over the recall window (catches rare proper
  // nouns, vendor names, ticker-like terms that pure cosine can miss).
  const hybrid = lexicalRescore(trimmed, results, 0.3);

  // Stage 3: cross-encoder rerank (Cohere/Voyage if key set) + tier &
  // recency boosts. Falls through to hybrid scores when no provider.
  if (hybrid.length <= finalTopK) return hybrid;
  return rerank(trimmed, hybrid, finalTopK);
}

/**
 * If metadata was persisted but the Redis doc record was evicted, build
 * a minimal doc object from the payload so callers still get a citation.
 */
function fallbackDocFromMetadata(metadata: {
  docId: string;
  title: string;
  source: DocMetadata["source"];
  tier: DocMetadata["tier"];
  url?: string;
  publishedAt?: string;
  accountIds?: string[];
  tags?: string[];
}): DocMetadata {
  return {
    id: metadata.docId,
    title: metadata.title,
    source: metadata.source,
    tier: metadata.tier,
    url: metadata.url,
    publishedAt: metadata.publishedAt,
    accountIds: metadata.accountIds,
    tags: metadata.tags,
    ingestedAt: "unknown",
    chunkCount: 0,
    contentHash: "",
  };
}
