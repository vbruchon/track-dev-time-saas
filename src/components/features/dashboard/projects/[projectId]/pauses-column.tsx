"use client";

import { Pause } from "@/generated";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { getDate, getTime } from "./sessions-column";
import { formatDuration } from "../project-card";
import { PausesModalProps } from "./pauses-modal";

export const getPausesColumns = (
  dict: PausesModalProps["dict"]
): ColumnDef<Pause>[] => [
  {
    accessorKey: "startedAt",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {dict.date}
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
      const duration = getValue() as number | 0;
      return formatDuration(duration);
    },
  },
];
