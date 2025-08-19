"use client";

import { Pause } from "@/generated";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDuration } from "../projects/project-card";
import { PausesModal } from "../projects/[projectId]/pauses-modal";
import { SessionsOverviewDict } from "./sessions-overview";

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

export const getRecentSessionsColumns = ({
  dict,
  dictPause,
}: {
  dict: SessionsOverviewDict["recentSessions"]["table"];
  dictPause: SessionsOverviewDict["pauses"];
}): ColumnDef<RecentSessionWithProject>[] => {
  return [
    {
      accessorKey: "startedAt",
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 hover:cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {dict.date}
          <ArrowUpDown size={18} />
        </button>
      ),
      cell: ({ getValue }) => getDate(getValue),
    },
    {
      accessorKey: "startedAt",
      header: dict.startedAt,
      cell: ({ getValue }) => {
        const time = getTime(getValue);
        return <div className="flex items-center">{time}</div>;
      },
    },
    {
      accessorKey: "endedAt",
      header: dict.endedAt,
      cell: ({ getValue }) => {
        const time = getTime(getValue);
        return <div className="flex items-center">{time}</div>;
      },
    },
    {
      accessorKey: "duration",
      header: dict.duration,
      cell: ({ getValue }) => {
        const duration = (getValue() as number) || 0;
        return formatDuration(duration);
      },
    },
    {
      accessorKey: "project.name",
      header: dict.project,
    },
    {
      accessorKey: "pauses",
      header: dictPause.label,
      cell: ({ getValue }) => {
        const breaks = getValue() as Pause[] | undefined;
        return <PausesModal pauses={breaks} dict={dictPause} />;
      },
    },
  ];
};

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
