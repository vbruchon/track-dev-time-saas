"use client";
import { getStatsData } from "@/utils/[projectId]/stats-data";
import { formatDuration } from "../project-card";
import { StatCard } from "../../stat-card";
import { ProjectStats } from "@/utils/[projectId]/get-project-stats";
import { SectionWrapper } from "./section-wrapper";
import { Activity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type StatsOverviewProps = {
  stats: ProjectStats;
};

export const StatsOverviewSection = ({ stats }: StatsOverviewProps) => {
  const statsData = getStatsData(stats);

  return (
    <SectionWrapper title="General Stats" icon={<Activity size={24} />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {statsData.map(({ label, value, icon: Icon, className, format }) => (
          <StatCard
            key={label}
            title={label}
            value={
              format === "duration"
                ? formatDuration(value as number)
                : format === "percent"
                  ? `${((value as number) * 100).toFixed(1)}%`
                  : value
            }
            icon={<Icon size={18} />}
            className={className}
          />
        ))} */}
        {statsData.map(({ label, value, icon: Icon, className, format }) => {
          const formattedValue =
            format === "duration"
              ? formatDuration(value as number)
              : format === "percent"
                ? `${((value as number) * 100).toFixed(1)}%`
                : value;

          const statCard = (
            <StatCard
              key={label}
              title={label}
              value={formattedValue}
              icon={<Icon size={18} />}
              className={className}
            />
          );

          if (label === "Productivity ratio") {
            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <span className="inline-block">{statCard}</span>
                </TooltipTrigger>
                <TooltipContent>
                  Productivity ratio represents your effective coding time
                  compared to total tracked time.
                </TooltipContent>
              </Tooltip>
            );
          }

          return statCard;
        })}
      </div>
    </SectionWrapper>
  );
};
