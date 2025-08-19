import { Code2, Clock, PauseCircle, Clock10, Activity } from "lucide-react";
import { ProjectStats } from "./get-project-stats";

type StatItem = {
  label: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
  format?: string;
};

export type ProjectStatsDict = {
  title: string;
  productivityRatioTooltip: string;
  totalSessions: string;
  totalSessionTime: string;
  averageSessionTime: string;
  longestSessionTime: string;
  averagePausesPerSession: string;
  totalPauseTime: string;
  averagePauseTime: string;
  productivityRatio: string;
};

export function getStatsData(
  stats: ProjectStats,
  dict: ProjectStatsDict
): StatItem[] {
  const {
    totalSessionsCount,
    totalSessionDuration,
    averageSessionDuration,
    longestSessionDuration,
    averagePausesPerSession,
    totalPauseDuration,
    averagePausesDuration,
    productivityRatio,
  } = stats;

  return [
    { label: dict.totalSessions, value: totalSessionsCount, icon: Code2 },
    {
      label: dict.totalSessionTime,
      value: totalSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: dict.averageSessionTime,
      value: averageSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: dict.longestSessionTime,
      value: longestSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: dict.averagePausesPerSession,
      value: averagePausesPerSession,
      icon: PauseCircle,
    },
    {
      label: dict.totalPauseTime,
      value: totalPauseDuration,
      icon: Clock10,
      format: "duration",
    },
    {
      label: dict.averagePauseTime,
      value: averagePausesDuration,
      icon: PauseCircle,
      format: "duration",
    },
    {
      label: dict.productivityRatio,
      value: productivityRatio,
      icon: Activity,
      format: "percent",
      className:
        productivityRatio < 0.5
          ? "text-destructive"
          : productivityRatio < 0.8
            ? "text-warning"
            : "text-primary",
    },
  ];
}
