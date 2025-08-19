import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek, getDay } from "date-fns";

export const getWeeklySessionChartData = async (
  userId: string,
  dayLabels: string[]
) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  const sessions = await prisma.devSession.findMany({
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
      startedAt: true,
    },
  });

  const countsByDay = new Array(7).fill(0);

  sessions.forEach((session) => {
    const jsDay = getDay(session.startedAt); // 0 (Sunday) - 6 (Saturday)
    const isoDay = jsDay === 0 ? 6 : jsDay - 1; // 0 (Mon) - 6 (Sun)
    countsByDay[isoDay]++;
  });

  return dayLabels.map((day, i) => ({
    day,
    count: countsByDay[i],
  }));
};
