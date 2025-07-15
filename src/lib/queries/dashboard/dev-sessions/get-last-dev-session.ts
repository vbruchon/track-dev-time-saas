import { prisma } from "@/lib/prisma";

export const getLastDevSession = async (userId: string) => {
  return await prisma.devSession.findFirst({
    where: {
      project: {
        userId,
      },
    },
    orderBy: {
      startedAt: "desc",
    },
    select: {
      project: {
        select: {
          name: true,
        },
      },
    },
  });
};
