"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DevSession, Project } from "@/generated";
import { formatDuration } from "../projects/project-card";
import { Eye } from "lucide-react";
import { getDate } from "../projects/[projectId]/sessions-column";
import { ProjectTableDict } from "./project-overview";

type ProjectTableType = Project & {
  devSessions: DevSession[];
  isTopProject: boolean;
};

export const getProjectsColumns = (
  dict: ProjectTableDict
): ColumnDef<ProjectTableType>[] => [
  {
    accessorKey: "name",
    header: dict.name,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const isTopProject = (row.original as ProjectTableType).isTopProject;
      return (
        <div className="flex items-center gap-2">
          <span>{name}</span>
          {isTopProject && (
            <span className="text-sm mx-auto border border-primary font-semibold bg-muted px-2 py-0.5 rounded">
              {dict.topProjectBadge}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: dict.createdAt,
    cell: ({ getValue }) => {
      const time = getDate(getValue);
      return <div>{time}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: dict.updatedAt,
    cell: ({ getValue }) => {
      const time = getDate(getValue);
      return <div>{time}</div>;
    },
  },
  {
    header: dict.sessions,
    accessorFn: (row) => row.devSessions.length,
    cell: ({ getValue }) => {
      const count = getValue() as number;
      const padded = String(count).padStart(2, "0");
      return <div className="ml-4">{padded}</div>;
    },
  },
  {
    header: dict.avgDuration,
    accessorFn: (row) => {
      const sessions = row.devSessions;
      const total = sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0);
      const average = sessions.length > 0 ? total / sessions.length : 0;
      return average;
    },
    cell: ({ getValue }) => {
      const avgMs = getValue() as number;
      return <div className="ml-4">{formatDuration(avgMs)}</div>;
    },
  },
  {
    header: dict.totalTime,
    accessorFn: (row) =>
      row.devSessions.reduce(
        (acc, session) => acc + (session.duration ?? 0),
        0
      ),
    cell: ({ getValue }) => {
      const totalMs = getValue() as number;
      return <div>{formatDuration(totalMs)}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center w-full">{dict.actions}</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/dashboard/projects/${row.original.id}`}>
          <Eye className="size-4 text-foreground hover:text-primary transition" />
        </Link>
      </div>
    ),
  },
];

// "use client";
// import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { DevSession, Project } from "@/generated";
// import { formatDuration } from "../projects/project-card";
// import { Eye } from "lucide-react";
// import { getDate } from "../projects/[projectId]/sessions-column";

// type ProjectTableType = Project & {
//   devSessions: DevSession[];
//   isTopProject: boolean;
// };

// export const projectsColumns: ColumnDef<ProjectTableType>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       const name = row.getValue("name") as string;
//       const isTopProject = (row.original as ProjectTableType).isTopProject;
//       return (
//         <div className="flex items-center gap-2">
//           <span>{name}</span>
//           {isTopProject && (
//             <span className="text-sm mx-auto border border-primary font-semibold bg-muted px-2 py-0.5 rounded">
//               Top project
//             </span>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created At",
//     cell: ({ getValue }) => {
//       const time = getDate(getValue);
//       return <div>{time}</div>;
//     },
//   },
//   {
//     accessorKey: "updatedAt",
//     header: "Updated At",
//     cell: ({ getValue }) => {
//       const time = getDate(getValue);
//       return <div>{time}</div>;
//     },
//   },
//   {
//     header: "Sessions",
//     accessorFn: (row) => row.devSessions.length,
//     cell: ({ getValue }) => {
//       const count = getValue() as number;
//       const padded = String(count).padStart(2, "0");
//       return <div className="ml-4">{padded}</div>;
//     },
//   },
//   {
//     header: "Avg. Duration",
//     accessorFn: (row) => {
//       const sessions = row.devSessions;
//       const total = sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0);
//       const average = sessions.length > 0 ? total / sessions.length : 0;
//       return average;
//     },
//     cell: ({ getValue }) => {
//       const avgMs = getValue() as number;
//       return <div className="ml-4">{formatDuration(avgMs)}</div>;
//     },
//   },

//   {
//     header: "Total Time",
//     accessorFn: (row) =>
//       row.devSessions.reduce(
//         (acc, session) => acc + (session.duration ?? 0),
//         0
//       ),
//     cell: ({ getValue }) => {
//       const totalMs = getValue() as number;
//       return <div>{formatDuration(totalMs)}</div>;
//     },
//   },
//   {
//     id: "actions",
//     header: () => <div className="text-center w-full">Action</div>,
//     cell: ({ row }) => (
//       <div className="flex justify-center">
//         <Link href={`/dashboard/projects/${row.original.id}`}>
//           <Eye className="size-4 text-foreground hover:text-primary transition" />
//         </Link>
//       </div>
//     ),
//   },
// ];
