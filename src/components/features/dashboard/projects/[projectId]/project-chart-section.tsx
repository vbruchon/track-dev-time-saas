"use client";
import { ChartSpline } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import {
  PartialSession,
  ProjectTimeChart,
} from "../../chart/project-time-chart";
import { SessionsPerWeekdayChart } from "../../chart/sessions-per-day-week";
import { serializeDates } from "@/utils/serializeDates";
import { ChartCard } from "../../chart/chart-card";
import { SessionPeriodChart } from "../../chart/sessions-periods-chart";
import { useState } from "react";
import { TimeRange, TimeRangeTabs } from "../../chart/time-range-tabs";

export function ProjectChartsSection({
  devSessions,
}: {
  devSessions: PartialSession[];
}) {
  const serializedSessions = serializeDates(devSessions);
  const [tab, setTab] = useState<TimeRange>("day");

  return (
    <SectionWrapper
      title="Time Spent Visualization"
      icon={<ChartSpline size={24} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard
          title="Project Time Spent"
          headerContent={<TimeRangeTabs value={tab} onChange={setTab} />}
          className="md:col-span-3"
        >
          <ProjectTimeChart devSessions={serializedSessions} tab={tab} />
        </ChartCard>
        <ChartCard
          title="Day when you code (This Week)"
          className="md:col-span-2"
        >
          <SessionsPerWeekdayChart devSessions={serializedSessions} />
        </ChartCard>
        <ChartCard title="Period when you code (This Week)">
          <SessionPeriodChart devSessions={devSessions} />
        </ChartCard>
      </div>
    </SectionWrapper>
  );
}
