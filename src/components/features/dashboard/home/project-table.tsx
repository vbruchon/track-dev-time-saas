import { getAllProjectsWithSessions } from "@/lib/queries/dashboard/projects/get-project-with-sessions";
import { getUserId } from "@/lib/auth-session";
import { ProjectTableDict } from "./project-overview";
import { ProjectTableCsr } from "./project-table-csr";
import { DevSession, Project } from "@/generated";

export type ProjectWithSessions = Project & {
  devSessions: DevSession[];
  totalDuration: number;
  averageSessionDuration: number;
  isTopProject: boolean;
};

export const ProjectTable = async ({ dict }: { dict: ProjectTableDict }) => {
  const userId = await getUserId();
  const projects: ProjectWithSessions[] =
    await getAllProjectsWithSessions(userId);

  return (
    <div className="px-4">
      <h3 className="text-lg my-4">{dict.title}</h3>
      <ProjectTableCsr projects={projects} dict={dict} />
    </div>
  );
};
