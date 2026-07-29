/**
 * Lexical rescoring over the vector-recall candidate window.
 *
 * True corpus-wide BM25 requires a sparse index (Upstash Vector hybrid mode,
 * separate infra). As a pragmatic v2 step, we over-fetch from the dense
 * index and rescore the candidate window with a tf-idf-lite keyword score.
 * Combined with the vector score (0.7 vec + 0.3 lex) before the reranker,
 * this catches typos, synonyms, and rare-proper-noun queries that pure
 * embedding similarity often demotes.
 *
 * Upgrade path: when the Upstash index is rebuilt with sparse vectors
 * enabled, replace this module with a direct hybrid query.
 */

import type { KbSearchResult } from "./types";

const STOP = new Set([
  "the", "a", "an", "of", "and", "or", "to", "in", "on", "for", "with",
  "is", "are", "was", "were", "be", "been", "being", "by", "at", "as",
  "that", "this", "these", "those", "from", "it", "its", "their", "they",
  "what", "which", "who", "whom", "when", "where", "why", "how",
  "do", "does", "did", "has", "have", "had",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/**
 * Score each candidate by how many query terms appear in its chunk text,
 * weighted inverse-document-frequency style across the candidate window.
 * Returns scores normalised to [0, 1].
 */
function keywordScores(query: string, results: KbSearchResult[]): number[] {
  const qTerms = Array.from(new Set(tokenize(query)));
  if (qTerms.length === 0 || results.length === 0) {
    return results.map(() => 0);
  }

  // Document frequency of each query term across the candidate window.
  const df = new Map<string, number>();
  const docTokens = results.map((r) => new Set(tokenize(r.chunk.text)));
  for (const term of qTerms) {
    let count = 0;
    for (const doc of docTokens) if (doc.has(term)) count += 1;
    df.set(term, count || 1);
  }

  const N = results.length;
  const raw = docTokens.map((doc) => {
    let s = 0;
    for (const term of qTerms) {
      if (!doc.has(term)) continue;
      const idf = Math.log(1 + N / (df.get(term) ?? 1));
      s += idf;
    }
    return s;
  });

  const max = Math.max(...raw, 1);
  return raw.map((r) => r / max);
}

/** Blend dense (vector) and lexical scores. Returns a sorted copy. */
export function lexicalRescore(
  query: string,
  results: KbSearchResult[],
  lexicalWeight = 0.3,
): KbSearchResult[] {
  if (results.length === 0) return results;
  const lex = keywordScores(query, results);
  const blended = results.map((r, i) => ({
    ...r,
    score: (1 - lexicalWeight) * r.score + lexicalWeight * lex[i],
  }));
  blended.sort((a, b) => b.score - a.score);
  return blended;
}
