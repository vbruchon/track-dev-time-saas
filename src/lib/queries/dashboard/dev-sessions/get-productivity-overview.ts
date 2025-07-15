import { prisma } from "@/lib/prisma";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  subWeeks,
} from "date-fns";

type Session = {
  duration: number | null;
};

function getTotalDuration(sessions: Session[]): number {
  return sessions.reduce((acc, session) => acc + (session.duration ?? 0), 0);
}

export async function getProductivityOverview(
  userId: string,
  date = new Date()
) {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const lastWeekStart = subWeeks(weekStart, 1);
  const lastWeekEnd = subWeeks(weekEnd, 1);

  const [
    todaySessions,
    thisWeekSessions,
    lastWeekSessions,
    thisWeekSessionCount,
    lastSession,
  ] = await Promise.all([
    prisma.devSession.findMany({
      where: {
        startedAt: { gte: dayStart, lte: dayEnd },
        project: { userId },
      },
      select: { duration: true },
    }),
    prisma.devSession.findMany({
      where: {
        startedAt: { gte: weekStart, lte: weekEnd },
        project: { userId },
      },
      select: { duration: true },
    }),
    prisma.devSession.findMany({
      where: {
        startedAt: { gte: lastWeekStart, lte: lastWeekEnd },
        project: { userId },
      },
      select: { duration: true },
    }),
    prisma.devSession.count({
      where: {
        startedAt: { gte: weekStart, lte: weekEnd },
        project: { userId },
      },
    }),
    prisma.devSession.findFirst({
      where: {
        project: { userId },
      },
      orderBy: { startedAt: "desc" },
      select: {
        project: {
          select: { name: true },
        },
      },
    }),
  ]);

  const daylyTotal = getTotalDuration(todaySessions);
  const weeklyTotal = getTotalDuration(thisWeekSessions);
  const lastWeekTotal = getTotalDuration(lastWeekSessions);

  const percentageChange =
    lastWeekTotal === 0
      ? weeklyTotal > 0
        ? 100
        : 0
      : Math.round(((weeklyTotal - lastWeekTotal) / lastWeekTotal) * 100);

  const changeDirection =
    percentageChange > 0 ? "↑" : percentageChange < 0 ? "↓" : null;

  return {
    daylyTotal,
    weeklyTotal,
    lastWeekTotal,
    percentageChange,
    changeDirection,
    countWeeklySessions: thisWeekSessionCount,
    lastProject: lastSession?.project?.name ?? null,
  };
}
