import { getRequiredUser } from "@/lib/auth-session";
import {
  getProjectStats,
  ProjectWithSessions,
} from "@/utils/[projectId]/get-project-stats";
import { ProjectHeader } from "@/components/features/dashboard/projects/[projectId]/project-header";
import { StatsOverviewSection } from "@/components/features/dashboard/projects/[projectId]/stats-overview-section";
import { ProjectChartsSection } from "@/components/features/dashboard/projects/[projectId]/project-chart-section";
import { ProjectSessionsSection } from "@/components/features/dashboard/projects/[projectId]/project-sessions-section";
import { getProjectWithSessions } from "@/lib/queries/dashboard/projects/get-project-with-sessions";
import { getLastDevSessionByProject } from "@/lib/queries/dashboard/dev-sessions/get-last-dev-session-by-project";

export default async function ProjectIdPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const user = await getRequiredUser();
  const project: ProjectWithSessions = await getProjectWithSessions(
    projectId,
    user.id
  );

  const lastDevSession = await getLastDevSessionByProject(projectId);
  const projectStats = getProjectStats(project);

  return (
    <>
      <ProjectHeader
        projectId={projectId}
        projectName={project.name}
        createdAt={project.createdAt}
        lastSession={lastDevSession}
        technologies={project.technologies}
        categories={project.categories}
      />
      <StatsOverviewSection stats={projectStats} />
      <ProjectChartsSection devSessions={project.devSessions} />
      <ProjectSessionsSection devSessions={project.devSessions} />
    </>
  );
}
