/**
 * /api/ask — Rachel's grounded RAG endpoint.
 *
 * Calls Anthropic directly via @ai-sdk/anthropic (no Vercel AI Gateway, so no
 * gateway billing dependency). Per-user metering and cap enforcement live in
 * lib/telemetry/per-user.ts; global per-workflow accounting lives in
 * lib/telemetry/tokens.ts. Both run on every call.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import { convertToModelMessages, stepCountIs } from "ai";
import { routeModel } from "@/lib/agents/model-router";
import { RACHEL_SYSTEM_PROMPT, rachelTools } from "@/lib/agents/rachel";
import { streamTextTracked } from "@/lib/telemetry/tokens";
import {
  checkUserCap,
  recordUserQuestion,
} from "@/lib/telemetry/per-user";
import { estimateCostUsd } from "@/lib/telemetry/tokens";

export const maxDuration = 60;

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  // ── Identify user (Clerk) ────────────────────────────────────────────────
  const { userId } = await auth();
  // Anonymous users (e.g. unauthenticated landing-page visitors) are bucketed
  // by IP-derived hash so one cap still applies. In production we want auth.
  const effectiveUserId =
    userId ??
    `anon:${(req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim()}`;

  // ── Cap check BEFORE the model call ──────────────────────────────────────
  const capCheck = await checkUserCap(effectiveUserId);
  if (capCheck.blocked) {
    console.log(
      JSON.stringify({
        level: "warn",
        msg: "ask_cap_blocked",
        requestId,
        userId: effectiveUserId,
        reason: capCheck.reason,
      }),
    );
    return Response.json(
      {
        error: "usage_cap_reached",
        message: capCheck.reason,
        cap: capCheck.cap,
        spentUsd: capCheck.spentUsd,
        questionsThisMonth: capCheck.questionsThisMonth,
      },
      { status: 429 },
    );
  }

  console.log(
    JSON.stringify({
      level: "info",
      msg: "ask_start",
      route: "/api/ask",
      requestId,
      userId: effectiveUserId,
    }),
  );

  const body = await req.json().catch(() => ({}));
  const { messages, sessionStart } = body as {
    messages?: unknown[];
    sessionStart?: boolean;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages array is required" }, { status: 400 });
  }

  const modelMessages = await convertToModelMessages(
    messages as Parameters<typeof convertToModelMessages>[0],
  );

  // ── Model routing — Haiku for lookups, Sonnet for reasoning ─────────────
  const lastUserMessage = [...modelMessages]
    .reverse()
    .find((m) => m.role === "user");
  const lastUserText = (() => {
    if (!lastUserMessage) return "";
    const c = lastUserMessage.content;
    if (typeof c === "string") return c;
    if (Array.isArray(c)) {
      return c
        .map((part) =>
          typeof part === "object" && part && "text" in part
            ? String((part as { text: unknown }).text ?? "")
            : "",
        )
        .join(" ");
    }
    return "";
  })();
  const routed = routeModel(lastUserText);

  console.log(
    JSON.stringify({
      level: "info",
      msg: "ask_model_routed",
      requestId,
      tier: routed.tier,
      modelId: routed.modelId,
      reason: routed.reason,
    }),
  );

  const t0 = Date.now();

  // Prompt caching: RACHEL_SYSTEM_PROMPT is identical for every call. Inject
  // it as the first message with an ephemeral cache breakpoint instead of
  // passing as `system:` string. Within the 1h TTL, calls 2..N read the
  // system prompt at 0.1× input cost. Cache write costs 1.25× normal —
  // break-even at 2 calls, then pure saving. With 80+ /api/ask calls/month
  // sharing the same system prompt, this typically cuts ~50-70% of input
  // tokens on Sonnet calls and a smaller share on Haiku (Haiku per-call cost
  // is already low).
  const result = streamTextTracked({
    workflow: "ask_rachel",
    model: anthropic(routed.modelId),
    messages: [
      {
        role: "system" as const,
        content: RACHEL_SYSTEM_PROMPT,
        providerOptions: {
          anthropic: { cacheControl: { type: "ephemeral" as const, ttl: "1h" as const } },
        },
      },
      ...modelMessages,
    ],
    tools: rachelTools,
    stopWhen: stepCountIs(8),
    onFinish: async (event) => {
      const inputTokens = event.totalUsage?.inputTokens ?? 0;
      const outputTokens = event.totalUsage?.outputTokens ?? 0;
      const costUsd = estimateCostUsd(routed.priceKey, { inputTokens, outputTokens });

      await recordUserQuestion({
        userId: effectiveUserId,
        inputTokens,
        outputTokens,
        costUsd,
        isNewEngagement: Boolean(sessionStart),
      });

      console.log(
        JSON.stringify({
          level: "info",
          msg: "ask_done",
          route: "/api/ask",
          requestId,
          userId: effectiveUserId,
          ms: Date.now() - t0,
          inputTokens,
          outputTokens,
          costUsd: Number(costUsd.toFixed(6)),
          steps: event.steps?.length,
        }),
      );
    },
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "x-rachel-model-tier": routed.tier,
      "x-rachel-model-id": routed.modelId,
      "x-rachel-model-reason": routed.reason.slice(0, 200),
    },
  });
}
