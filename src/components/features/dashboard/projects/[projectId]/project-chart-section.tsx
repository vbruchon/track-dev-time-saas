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

type ProjectChartsDict = {
  title: string;
  projectTimeSpent: {
    title: string;
    timeRangeTabs: Record<"day" | "week" | "month" | "year", string>;
    hoursLabel: string;
    tooltipLabel: string;
  };
  sessionsPerWeekday: {
    title: string;
    labels: Record<
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
      string
    >;
  };
  sessionsPeriod: {
    title: string;
    labels: Record<"morning" | "afternoon" | "evening" | "night", string>;
  };
};

export function ProjectChartsSection({
  devSessions,
  dict,
}: {
  devSessions: PartialSession[];
  dict: ProjectChartsDict;
}) {
  const serializedSessions = serializeDates(devSessions);
  const [tab, setTab] = useState<TimeRange>("day");

  return (
    <SectionWrapper title={dict.title} icon={<ChartSpline size={24} />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard
          title={dict.projectTimeSpent.title}
          headerContent={
            <TimeRangeTabs
              value={tab}
              onChange={setTab}
              labels={dict.projectTimeSpent.timeRangeTabs}
            />
          }
          className="md:col-span-3"
        >
          <ProjectTimeChart
            devSessions={serializedSessions}
            tab={tab}
            dict={dict.projectTimeSpent}
          />
        </ChartCard>
        <ChartCard
          title={dict.sessionsPerWeekday.title}
          className="md:col-span-2"
        >
          <SessionsPerWeekdayChart
            devSessions={serializedSessions}
            dict={{
              labels: dict.sessionsPerWeekday.labels,
            }}
          />
        </ChartCard>
        <ChartCard title={dict.sessionsPeriod.title}>
          <SessionPeriodChart
            devSessions={devSessions}
            dict={dict.sessionsPeriod}
          />
        </ChartCard>
      </div>
    </SectionWrapper>
  );
}
