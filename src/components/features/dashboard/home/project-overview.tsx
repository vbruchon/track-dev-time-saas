import { SectionWrapper } from "../projects/[projectId]/section-wrapper";
import { FolderCode } from "lucide-react";
import { ProjectHighlights } from "./project-highlights";
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

export const ProjectOverview = async () => {
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
  const periodLabel = groupedData.period
    ? groupedData.period?.charAt(0).toUpperCase() +
      groupedData.period?.slice(1).toLowerCase()
    : "";
  return (
    <SectionWrapper title="Project Overview" icon={<FolderCode />}>
      <div className="space-y-4">
        <ProjectHighlights />
        <ChartCard
          title={`${periodLabel} Time Spent by Project Category`}
          className="mt-6"
        >
          <ProjectActivityTimeline
            data={activityTimelineData}
            categories={categories}
          />
        </ChartCard>

        <ChartCard title="Count Projects per Technology" className="mt-6">
          <TechnologyCountChart data={technologyCountChartData} />
        </ChartCard>
        <div className="mt-6">
          <ProjectTable />
        </div>
      </div>
    </SectionWrapper>
  );
};
