import { SectionWrapper } from "../projects/[projectId]/section-wrapper";
import { FolderCode } from "lucide-react";
import { HighlightsDict, ProjectHighlights } from "./project-highlights";
import { ProjectTable } from "./project-table";
import {
  ChartDataPoint,
  ProjectActivityTimeline,
} from "../chart/project-activity-timeline";
import { getActivityByCategory } from "@/lib/queries/dashboard/dev-sessions/get-activity-by-category";
import { getUserId } from "@/lib/auth-session";
import { TechnologyCountChart } from "../chart/technology-count-chart";
import { getProjectsCountByTechnology } from "@/lib/queries/dashboard/projects/get-count-projects-by-technology";
import { ChartCard } from "../chart/chart-card";
import { Suspense } from "react";

function transformForChart(
  groupedData: Record<string, Record<string, number>>,
  categories: string[]
) {
  const days = Object.keys(groupedData).sort();

  return days.map((date) => {
    const dayData = groupedData[date];
    const entry: ChartDataPoint = { date };

    for (const cat of categories) {
      entry[cat] = dayData?.[cat] ?? 0;
    }

    return entry;
  });
}

function transformCountsToChartData(counts: Record<string, number>) {
  return Object.entries(counts).map(([tech, count]) => ({
    technology: tech,
    count,
  }));
}

export type ChartsDict = {
  timeByCategoryWeekly: string;
  timeByCategoryMonthly: string;
  timeByCategoryGlobal: string;
  countProjectsByTechnology: string;
};
export type ProjectTableDict = {
  title: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sessions: string;
  avgDuration: string;
  totalTime: string;
  actions: string;
  topProjectBadge: string;
  next: string;
  previous: string;
};

export const ProjectOverview = async ({
  dict,
}: {
  dict: {
    title: string;
    highlights: HighlightsDict;
    charts: ChartsDict;
    projectTable: ProjectTableDict;
  };
}) => {
  const userId = await getUserId();
  const groupedData = await getActivityByCategory(userId);
  const countProjectByTechnology = await getProjectsCountByTechnology(userId);

  const categories = Array.from(
    new Set(
      Object.values(groupedData.data ?? {}).flatMap((day) => Object.keys(day))
    )
  );

  const activityTimelineData = transformForChart(groupedData.data, categories);
  const technologyCountChartData = transformCountsToChartData(
    countProjectByTechnology
  );

  const chartTitleKey =
    groupedData.period === "weekly"
      ? dict.charts.timeByCategoryWeekly
      : groupedData.period === "monthly"
        ? dict.charts.timeByCategoryMonthly
        : dict.charts.timeByCategoryGlobal;

  return (
    <SectionWrapper title={dict.title} icon={<FolderCode />}>
      <div className="space-y-4">
        <ProjectHighlights dict={dict.highlights} />
        <ChartCard title={chartTitleKey} className="mt-6">
          <ProjectActivityTimeline
            data={activityTimelineData}
            categories={categories}
          />
        </ChartCard>

        <ChartCard
          title={dict.charts.countProjectsByTechnology}
          className="mt-6"
        >
          <TechnologyCountChart data={technologyCountChartData} />
        </ChartCard>
        <div className="mt-6">
          <Suspense>
            <ProjectTable dict={dict.projectTable} />
          </Suspense>
        </div>
      </div>
    </SectionWrapper>
  );
};
