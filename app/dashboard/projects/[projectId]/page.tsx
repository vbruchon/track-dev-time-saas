import { getRequiredUser } from "@/lib/auth-session";
import {
  getProjectStats,
  ProjectWithSessions,
} from "@/utils/[projectId]/get-project-stats";
import { prisma } from "@/lib/prisma";
import { ProjectHeader } from "@/components/features/dashboard/projects/[projectId]/project-header";
import { StatsOverviewSection } from "@/components/features/dashboard/projects/[projectId]/stats-overview-section";

export default async function ProjectIdPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const user = await getRequiredUser();

  const project: ProjectWithSessions = await prisma.project.findUniqueOrThrow({
    where: { id: projectId, userId: user.id },
    include: {
      devSessions: {
        include: { pauses: true },
        orderBy: {
          startedAt: "desc",
        },
      },
    },
  });

  const lastDevSession = await prisma.devSession.findFirst({
    where: { projectId: project.id },
    orderBy: { startedAt: "desc" },
  });

  const projectStats = getProjectStats(project);

  return (
    <>
      <ProjectHeader
        projectId={projectId}
        projectName={project.name}
        createdAt={project.createdAt}
        lastSession={lastDevSession}
      />
      <StatsOverviewSection stats={projectStats} />
    </>
  );
}
