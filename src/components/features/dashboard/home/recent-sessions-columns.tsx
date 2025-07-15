"use client";

import { Pause } from "@/generated";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDuration } from "../projects/project-card";
import { PausesModal } from "../projects/[projectId]/pauses-modal";

export type RecentSessionWithProject = {
  id: string;
  startedAt: Date;
  endedAt: Date | null;
  duration: number | null;
  pauses: Pause[];
  project: {
    name: string;
  };
};

export const recentSessionsColumns: ColumnDef<RecentSessionWithProject>[] = [
  {
    accessorKey: "startedAt",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown size={18} />
        </button>
      );
    },

    cell: ({ getValue }) => {
      return getDate(getValue);
    },
  },
  {
    accessorKey: "startedAt",
    header: "StartedAt",
    cell: ({ getValue }) => {
      const time = getTime(getValue);
      return <div className="ml-4">{time}</div>;
    },
  },
  {
    accessorKey: "endedAt",
    header: "EndedAt",
    cell: ({ getValue }) => {
      const time = getTime(getValue);
      return <div className="ml-4">{time}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ getValue }) => {
      const duration = getValue() as number | 0;
      return formatDuration(duration);
    },
  },
  {
    accessorKey: "pauses",
    header: "Break",
    cell: ({ getValue }) => {
      const breaks = getValue() as Pause[] | undefined;
      return <PausesModal pauses={breaks} />;
    },
  },
  {
    accessorKey: "project.name",
    header: "Project",
  },
];

export const getDate = (value: () => unknown) => {
  const date = new Date(value() as string);

  const datePart = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return datePart;
};

export const getTime = (value: () => unknown) => {
  const date = new Date(value() as string);

  const timePart = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return timePart;
};
