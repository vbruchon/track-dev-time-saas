"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDuration } from "../projects/project-card";

type ProjectStatsTableRow = {
  projectId: string;
  projectName: string;
  durationTotal: number;
  sessionCount: number;
};

export const projectColumns: ColumnDef<ProjectStatsTableRow>[] = [
  {
    accessorKey: "projectName",
    header: "Name",
  },
  {
    accessorKey: "sessionCount",
    header: "Total Session",
  },
  {
    accessorKey: "durationTotal",
    header: "Total time",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {formatDuration(row.getValue("durationTotal"))}
        </div>
      );
    },
  },
];
