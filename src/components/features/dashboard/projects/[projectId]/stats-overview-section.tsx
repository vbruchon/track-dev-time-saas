"use client";
import { getStatsData } from "@/utils/[projectId]/stats-data";
import { formatDuration } from "../project-card";
import { StatCard } from "./stat-card";
import { ProjectStats } from "@/utils/[projectId]/get-project-stats";
import { SectionWrapper } from "./section-wrapper";
import { Activity } from "lucide-react";

type StatsOverviewProps = {
  stats: ProjectStats;
};

export const StatsOverviewSection = ({ stats }: StatsOverviewProps) => {
  const statsData = getStatsData(stats);

  return (
    <SectionWrapper title="General Stats" icon={<Activity size={24} />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statsData.map(({ label, value, icon: Icon, className, format }) => (
          <StatCard
            key={label}
            label={label}
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
        ))}
      </div>
    </SectionWrapper>
  );
};
