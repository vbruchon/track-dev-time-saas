import { ChartSpline } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { PartialSession, ProjectTimeChart } from "./project-time-chart";
import { SessionsPerWeekdayChart } from "./sessions-per-day-week";
import { SessionStartPeriodChart } from "./sessions-periods-chart";
import { serializeDates } from "@/utils/serializeDates";

export function ProjectChartsSection({
  devSessions,
}: {
  devSessions: PartialSession[];
}) {
  const serializedSessions = serializeDates(devSessions);

  return (
    <SectionWrapper
      title="Time Spent Visualization"
      icon={<ChartSpline size={24} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <ProjectTimeChart devSessions={serializedSessions} />
        </div>
        <div className="md:col-span-2 h-full">
          <SessionsPerWeekdayChart devSessions={serializedSessions} />
        </div>
        <SessionStartPeriodChart devSessions={serializedSessions} />
      </div>
    </SectionWrapper>
  );
}
