import { prisma } from "@/lib/prisma";

export const getAllProjects = async (userId: string) => {
  return await prisma.project.findMany({
    where: { userId },
    include: { devSessions: true },
  });
};
