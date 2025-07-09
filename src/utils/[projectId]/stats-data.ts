import { Code2, Clock, PauseCircle, Clock10, Activity } from "lucide-react";
import { ProjectStats } from "./get-project-stats";

type StatItem = {
  label: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
  format?: string;
};

export function getStatsData(stats: ProjectStats): StatItem[] {
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
    {
      label: "Total sessions",
      value: totalSessionsCount,
      icon: Code2,
    },
    {
      label: "Total session time",
      value: totalSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: "Average session time",
      value: averageSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: "Longest session time",
      value: longestSessionDuration,
      icon: Clock,
      format: "duration",
    },
    {
      label: "Average pauses per session",
      value: averagePausesPerSession,
      icon: PauseCircle,
    },
    {
      label: "Total pause time",
      value: totalPauseDuration,
      icon: Clock10,
      format: "duration",
    },
    {
      label: "Average pause time",
      value: averagePausesDuration,
      icon: PauseCircle,
      format: "duration",
    },
    {
      label: "Productivity ratio",
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
