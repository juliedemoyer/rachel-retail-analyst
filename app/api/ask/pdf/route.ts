/**
 * POST /api/ask/pdf
 *
 * Investor-document fallback for Ask Rachel.
 * User-triggered only — never called automatically.
 *
 * Flow:
 *   1. Vector-search Upstash for ir_filing chunks scoped to accountId.
 *   2. Serialise citation metadata → X-Rachel-PDF-Citations header (set
 *      before streaming so the client can read it immediately).
 *   3. Inject chunks into a PDF-focused system prompt.
 *   4. Stream the LLM answer as plain text.
 *
 * Kept separate from /api/ask so the two paths are independently
 * debuggable and the UI can distinguish structured vs. document answers.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import { searchKnowledgeBase } from "@/lib/kb/search";
import { streamTextTracked } from "@/lib/telemetry/tokens";

export const maxDuration = 60;

const Body = z.object({
  question: z.string().min(1).max(1000),
  accountId: z.string().min(1).max(100),
});

const PDF_SYSTEM_PROMPT = `You are Rachel, an EMEA retail & consumer intelligence analyst. \
The user has asked you to search raw investor-relations documents (earnings transcripts, \
annual reports, investor decks) for a specific company. You have been provided with the \
most relevant passages from those documents.

RULES for this PDF-document mode:
1. Only use information present in the provided passages. Do not supplement with training data.
2. Quote directly where possible — use the passage text verbatim for key claims.
3. If the passages do not contain a clear answer, say so directly. \
   Do not infer or extrapolate beyond what is written.
4. Cite which passage number supports each claim: (passage 1), (passage 2), etc.
5. Be concise. Executive-level language. No filler.
6. End every answer with "So what:" — one sentence on what the finding means for the reader.`;

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const t0 = Date.now();

  // Require authenticated session — PDF search is a product feature
  let userId: string | null = null;
  try {
    const session = await auth();
    userId = session.userId;
    if (!userId) {
      console.log(JSON.stringify({ level: "warn", msg: "pdf_ask_unauthorized", route: "/api/ask/pdf", requestId }));
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "pdf_ask_auth_failed", route: "/api/ask/pdf", requestId, error: err instanceof Error ? err.message : String(err) }));
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { question, accountId } = parsed.data;

  console.log(JSON.stringify({ level: "info", msg: "pdf_ask_start", route: "/api/ask/pdf", requestId, accountId, questionLen: question.length }));

  // ── 1. Vector search (synchronous, before streaming starts) ────────────────
  const results = await searchKnowledgeBase({
    query: question,
    accountId,
    source: "ir_filing",
    topK: 6,
    minScore: 0.2,
  });

  console.log(JSON.stringify({ level: "info", msg: "pdf_ask_search_done", route: "/api/ask/pdf", requestId, accountId, hits: results.length, msSearch: Date.now() - t0 }));

  // ── 2. Build citations array for the response header ───────────────────────
  type PdfCitation = {
    title: string;
    excerpt: string;
    url?: string;
    blobKey?: string;
    publishedAt?: string;
    passageIndex: number;
  };

  const citations: PdfCitation[] = results.map((r, i) => ({
    title: r.doc.title,
    excerpt: r.chunk.text.slice(0, 300).trim(),
    url: r.doc.url,
    blobKey: r.doc.blobKey,
    publishedAt: r.doc.publishedAt,
    passageIndex: i + 1,
  }));

  // ── 3. Build context string injected into the system prompt ────────────────
  let contextBlock: string;
  if (results.length === 0) {
    contextBlock =
      "NO INVESTOR-DOCUMENT PASSAGES FOUND for this company and question. " +
      "Tell the user clearly that no relevant IR filings are indexed for this company yet.";
  } else {
    const passages = results
      .map(
        (r, i) =>
          `[Passage ${i + 1}] — "${r.doc.title}"${r.doc.publishedAt ? ` (${r.doc.publishedAt.slice(0, 10)})` : ""}:\n${r.chunk.text.trim()}`,
      )
      .join("\n\n---\n\n");
    contextBlock = `INVESTOR-DOCUMENT PASSAGES (${results.length} found):\n\n${passages}`;
  }

  const systemWithContext = `${PDF_SYSTEM_PROMPT}\n\n${contextBlock}`;

  // ── 4. Stream plain text with citations header ──────────────────────────────
  const result = streamTextTracked({
    // Was previously lumped with chat — separate so PDF spend is visible.
    workflow: "ask_rachel_pdf",
    model: anthropic("claude-sonnet-4-6"),
    system: systemWithContext,
    messages: [{ role: "user", content: question }],
    onFinish: async (event) => {
      console.log(JSON.stringify({
        level: "info",
        msg: "pdf_ask_done",
        route: "/api/ask/pdf",
        requestId,
        accountId,
        msTotal: Date.now() - t0,
        inputTokens: event.usage?.inputTokens,
        outputTokens: event.usage?.outputTokens,
        passagesUsed: results.length,
      }));
    },
  });

  // Convert the AI SDK async-iterable text stream to a ReadableStream<Uint8Array>
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        console.error(JSON.stringify({ level: "error", msg: "pdf_ask_stream_error", route: "/api/ask/pdf", requestId, error: err instanceof Error ? err.message : String(err) }));
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store",
      // Citations are JSON-encoded and set here — readable by the client
      // as soon as the response headers arrive, before the body completes.
      "X-Rachel-PDF-Citations": JSON.stringify(citations),
      // Expose the custom header to browser CORS
      "Access-Control-Expose-Headers": "X-Rachel-PDF-Citations",
    },
  });
}
