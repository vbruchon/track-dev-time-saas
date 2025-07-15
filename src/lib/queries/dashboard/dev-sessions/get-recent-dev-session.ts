import { prisma } from "@/lib/prisma";

export const getRecentDevSession = async (userId: string) => {
  return await prisma.devSession.findMany({
    where: {
      project: {
        userId,
      },
    },
    orderBy: {
      startedAt: "desc",
    },
    take: 10,
    select: {
      id: true,
      startedAt: true,
      endedAt: true,
      duration: true,
      pauses: true,
      project: {
        select: {
          name: true,
        },
      },
    },
  });
};
