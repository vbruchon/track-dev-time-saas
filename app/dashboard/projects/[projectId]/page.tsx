import { getRequiredUser } from "@/lib/auth-session";
import { ProjectWithSessions } from "@/utils/[projectId]/get-project-stats";
import { prisma } from "@/lib/prisma";
import { ProjectHeader } from "@/components/features/dashboard/projects/[projectId]/project-header";

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

  return (
    <>
      <ProjectHeader
        projectId={projectId}
        projectName={project.name}
        createdAt={project.createdAt}
        lastSession={lastDevSession}
      />
    </>
  );
}
