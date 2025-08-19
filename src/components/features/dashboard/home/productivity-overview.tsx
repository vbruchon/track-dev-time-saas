import { Timer } from "lucide-react";
import { SectionWrapper } from "../projects/[projectId]/section-wrapper";
import { formatDuration } from "../projects/project-card";
import { getUserId } from "@/lib/auth-session";
import { getProductivityOverview } from "@/lib/queries/dashboard/dev-sessions/get-productivity-overview";
import { StatCard } from "../stat-card";

type ProductivityDict = {
  title: string;
  stats: {
    timeToday: string;
    timeThisWeek: string;
    changeVsLastWeek: string;
    sessionsThisWeek: string;
    lastProjectActive: string;
  };
};

type ProductivityOverviewProps = {
  dict: ProductivityDict;
};

export const ProductivityOverview = async ({
  dict,
}: ProductivityOverviewProps) => {
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
      title: dict.stats.timeToday,
      value: formatDuration(daylyTotal),
    },
    {
      title: dict.stats.timeThisWeek,
      value: formatDuration(weeklyTotal),
    },
    {
      title: dict.stats.changeVsLastWeek,
      value: label,
    },
    {
      title: dict.stats.sessionsThisWeek,
      value: countWeeklySessions,
    },
    {
      title: dict.stats.lastProjectActive,
      value: lastProject ?? "—",
    },
  ];

  return (
    <SectionWrapper title={dict.title} icon={<Timer />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </SectionWrapper>
  );
};
