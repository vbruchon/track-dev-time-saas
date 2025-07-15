import { prisma } from "@/lib/prisma";

export const getProjectByID = async (projectId: string) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
};

export const getProjectNameByID = async (projectId: string) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    select: {
      name: true,
    },
  });
};
