import { prisma } from "@/lib/prisma";
import { endOfWeek, startOfWeek } from "date-fns";

export async function getWeeklyProgress(userId: string, date = new Date()) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { weeklyGoalSeconds: true },
  });

  const weeklyGoalSeconds = user?.weeklyGoalSeconds ?? 10 * 3600;

  const weeklySessions = await prisma.devSession.findMany({
    where: {
      startedAt: {
        gte: weekStart,
        lte: weekEnd,
      },
      project: {
        userId,
      },
    },
    select: {
      duration: true,
    },
  });

  const weeklyTotal = weeklySessions.reduce(
    (acc, s) => acc + (s.duration ?? 0),
    0
  );

  const weeklyProgress = Math.min(
    Math.round((weeklyTotal / weeklyGoalSeconds) * 100),
    100
  );

  return { weeklyTotal, weeklyGoalSeconds, weeklyProgress };
}
