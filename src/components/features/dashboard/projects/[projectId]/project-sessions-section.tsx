"use client";
import { TableOfContents } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { DataTable } from "@/components/features/dashboard/data-table";
import { getSessionsColumns } from "./sessions-column";
import { PartialSession } from "../../chart/project-time-chart";

export type ProjectSessionsDict = {
  title: string;
  date: string;
  startedAt: string;
  endedAt: string;
  duration: string;
  break: {
    label: string;
    title: string;
    noFound: string;
    date: string;
    startedAt: string;
    endedAt: string;
    duration: string;
    next: string;
    previous: string;
  };
  pagination: {
    next: string;
    previous: string;
  };
};

export function ProjectSessionsSection({
  devSessions,
  dict,
}: {
  devSessions: PartialSession[];
  dict: ProjectSessionsDict;
}) {
  return (
    <SectionWrapper title={dict.title} icon={<TableOfContents size={24} />}>
      <DataTable
        columns={getSessionsColumns(dict)}
        data={devSessions}
        nextText={dict.pagination.next}
        previousText={dict.pagination.previous}
      />
    </SectionWrapper>
  );
}
