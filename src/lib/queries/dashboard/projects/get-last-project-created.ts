import { prisma } from "@/lib/prisma";

export const getLastProjectCreated = async (userId: string) => {
  return await prisma.project.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      devSessions: true,
    },
  });
};
