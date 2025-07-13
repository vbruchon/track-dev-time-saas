import { prisma } from "@/lib/prisma";

export const getLastDevSessionByProject = async (projectId: string) => {
  return await prisma.devSession.findFirst({
    where: { projectId },
    orderBy: { startedAt: "desc" },
  });
};
