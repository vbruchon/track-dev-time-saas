import { getAllProjectsWithSessions } from "@/lib/queries/dashboard/projects/get-project-with-sessions";
import { DataTable } from "../data-table";
import { projectsColumns } from "./projects-columns";
import { getUserId } from "@/lib/auth-session";

export const ProjectTable = async () => {
  const userId = await getUserId();
  const projects = await getAllProjectsWithSessions(userId);
  return (
    <div className="px-4">
      <h3 className="text-lg my-4">Your Projects</h3>
      <DataTable data={projects} columns={projectsColumns} element="project" />
    </div>
  );
};
