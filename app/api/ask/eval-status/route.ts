import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = Redis.fromEnv();

interface WeeklyEvalReport {
  week: string;
  ranAt: string;
  totalQuestions: number;
  groundedAndCited: number;
  correct: number;
  passRate: number;
  byCategory?: Record<string, { total: number; pass: number }>;
}

export async function GET() {
  const latest = await redis.get<WeeklyEvalReport>("rachel:eval:latest");
  if (!latest) {
    return Response.json({
      available: false,
      passRate: null,
      week: null,
    });
  }
  return Response.json({
    available: true,
    week: latest.week,
    ranAt: latest.ranAt,
    passRate: latest.passRate,
    totalQuestions: latest.totalQuestions,
    groundedAndCited: latest.groundedAndCited,
    correct: latest.correct,
    byCategory: latest.byCategory,
  });
}
