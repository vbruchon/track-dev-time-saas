"use client";

import { DevSession, Pause } from "@/generated";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PausesModal } from "./pauses-modal";
import { formatDuration } from "../project-card";

export const sessionsColumns: ColumnDef<DevSession>[] = [
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
