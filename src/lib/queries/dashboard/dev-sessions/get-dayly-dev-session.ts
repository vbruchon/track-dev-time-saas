import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDaylyDevSession = async (userId: string) => {
  return await prisma.devSession.findMany({
    where: {
      startedAt: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      },
      project: {
        userId,
      },
    },
    select: {
      duration: true,
    },
  });
};
