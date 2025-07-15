import { Timer } from "lucide-react";
import { SectionWrapper } from "../projects/[projectId]/section-wrapper";
import { formatDuration } from "../projects/project-card";
import { getUserId } from "@/lib/auth-session";
import { getProductivityOverview } from "@/lib/queries/dashboard/dev-sessions/get-productivity-overview";
import { StatCard } from "../stat-card";

export const ProductivityOverview = async () => {
  const userId = await getUserId();
  const {
    daylyTotal,
    weeklyTotal,
    percentageChange,
    changeDirection,
    countWeeklySessions,
    lastProject,
  } = await getProductivityOverview(userId);

  const label = changeDirection
    ? `${changeDirection} ${Math.abs(percentageChange)}%`
    : `${Math.abs(percentageChange)}%`;

  const stats = [
    {
      title: "Time Today",
      value: formatDuration(daylyTotal),
    },
    {
      title: "Time This Week",
      value: formatDuration(weeklyTotal),
    },
    {
      title: "Change vs. Last Week",
      value: label,
    },
    {
      title: "Sessions This Week",
      value: countWeeklySessions,
    },
    {
      title: "Last Project Active",
      value: lastProject ?? "—",
    },
  ];
  return (
    <SectionWrapper title="Productivity Overview" icon={<Timer />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </SectionWrapper>
  );
};
