import { auth } from "@clerk/nextjs/server";
import { getUserUsageSummary } from "@/lib/telemetry/per-user";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { userId } = await auth();
  const effectiveUserId =
    userId ??
    `anon:${(req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim()}`;

  const summary = await getUserUsageSummary(effectiveUserId);

  return Response.json({
    userId: effectiveUserId,
    authenticated: Boolean(userId),
    cap: summary.cap,
    questionsThisMonth: summary.thisMonth.questions,
    questionsToday: summary.today.questions,
    monthlyQuestionsRemaining: summary.capStatus.monthlyQuestionsRemaining,
    monthlyUsdRemaining: summary.capStatus.monthlyUsdRemaining,
    blocked: summary.capStatus.blocked,
    estCostPerQuestionEur: 0.02,
  });
}
