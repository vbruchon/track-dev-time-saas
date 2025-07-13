import { prisma } from "@/lib/prisma";

export const getProjectWithSessions = async (
  projectId: string,
  userId: string
) => {
  return prisma.project.findUniqueOrThrow({
    where: { id: projectId, userId },
    include: {
      devSessions: {
        include: { pauses: true },
        orderBy: { startedAt: "desc" },
      },
      technologies: true,
      categories: true,
    },
  });
};

export const getAllProjectsWithSessions = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      devSessions: {
        orderBy: { startedAt: "desc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Calculate totalDuration and averageDuration for each project
  const projectsWithDurations = projects.map((project) => {
    const sessions = project.devSessions;
    const totalDuration = sessions.reduce(
      (sum, s) => sum + (s.duration ?? 0),
      0
    );
    const averageDuration =
      sessions.length > 0 ? totalDuration / sessions.length : 0;

    return {
      ...project,
      totalDuration,
      averageSessionDuration: averageDuration,
    };
  });

  const maxTotalDuration = Math.max(
    ...projectsWithDurations.map((p) => p.totalDuration)
  );

  const projectsFinal = projectsWithDurations.map((p) => ({
    ...p,
    isTopProject: p.totalDuration === maxTotalDuration,
  }));

  return projectsFinal;
};
