"use client";
import { DataTable } from "../data-table";
import { getProjectsColumns } from "./projects-columns";
import { ProjectTableDict } from "./project-overview";
import { ProjectWithSessions } from "./project-table";

export const ProjectTableCsr = ({
  projects,
  dict,
}: {
  projects: ProjectWithSessions[];
  dict: ProjectTableDict;
}) => (
  <DataTable
    data={projects}
    columns={getProjectsColumns(dict)}
    element="project"
    nextText={dict.next}
    previousText={dict.previous}
  />
);
