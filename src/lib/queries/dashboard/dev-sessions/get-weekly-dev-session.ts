import { prisma } from "@/lib/prisma";
import { endOfWeek, startOfWeek } from "date-fns";

export const getWeeklyDevSession = async (userId: string) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  return await prisma.devSession.findMany({
    where: {
      startedAt: {
        gte: weekStart,
        lte: weekEnd,
      },
      project: {
        userId,
      },
      endedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      startedAt: true,
      endedAt: true,
      duration: true,
      pauses: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
