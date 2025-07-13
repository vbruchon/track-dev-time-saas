import { TableOfContents } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { DataTable } from "@/components/features/dashboard/data-table";
import { sessionsColumns } from "./sessions-column";
import { PartialSession } from "../../chart/project-time-chart";

export function ProjectSessionsSection({
  devSessions,
}: {
  devSessions: PartialSession[];
}) {
  return (
    <SectionWrapper title="Sessions List" icon={<TableOfContents size={24} />}>
      <DataTable columns={sessionsColumns} data={devSessions} />
    </SectionWrapper>
  );
}
