"use client";

import { Pause } from "@/generated";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { getDate, getTime } from "./sessions-column";
import { formatDuration } from "../project-card";

export const pausesColumns: ColumnDef<Pause>[] = [
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
];
