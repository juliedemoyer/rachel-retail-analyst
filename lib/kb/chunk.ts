/**
 * Chunking — split a long text doc into ~800-token overlapping chunks
 * suitable for embedding and retrieval.
 *
 * Phase 0 uses a character-based approximation (1 token ≈ 4 chars). This
 * is deliberate: it has zero dependencies, is deterministic, and is good
 * enough for retrieval ranking. Phase 5+ can swap to a proper tokenizer
 * if recall suffers.
 */

import type { KbChunk } from "./types";

const DEFAULT_CHUNK_CHARS = 3200; // ~800 tokens
const DEFAULT_OVERLAP_CHARS = 400; // ~100 tokens — preserves boundary context

export interface ChunkOptions {
  docId: string;
  chunkChars?: number;
  overlapChars?: number;
}

/**
 * Deterministically chunk a doc. Prefers to break on paragraph boundaries
 * (double newline), falling back to sentence boundaries, then hard cuts.
 */
export function chunkDocument(
  text: string,
  { docId, chunkChars = DEFAULT_CHUNK_CHARS, overlapChars = DEFAULT_OVERLAP_CHARS }: ChunkOptions,
): KbChunk[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const chunks: KbChunk[] = [];
  let cursor = 0;
  let index = 0;

  while (cursor < normalized.length) {
    const hardEnd = Math.min(cursor + chunkChars, normalized.length);
    let end = hardEnd;

    if (hardEnd < normalized.length) {
      // Prefer paragraph break within the last 25% of the window.
      const searchStart = cursor + Math.floor(chunkChars * 0.75);
      const paragraphBreak = normalized.lastIndexOf("\n\n", hardEnd);
      if (paragraphBreak > searchStart) {
        end = paragraphBreak;
      } else {
        // Fall back to a sentence terminator.
        const sentenceBreak = Math.max(
          normalized.lastIndexOf(". ", hardEnd),
          normalized.lastIndexOf("? ", hardEnd),
          normalized.lastIndexOf("! ", hardEnd),
        );
        if (sentenceBreak > searchStart) {
          end = sentenceBreak + 1;
        }
      }
    }

    const slice = normalized.slice(cursor, end).trim();
    if (slice.length > 0) {
      chunks.push({
        id: `${docId}::${index}`,
        docId,
        index,
        text: slice,
        startOffset: cursor,
        endOffset: end,
      });
      index += 1;
    }

    if (end >= normalized.length) break;
    cursor = Math.max(end - overlapChars, cursor + 1);
  }

  return chunks;
}
