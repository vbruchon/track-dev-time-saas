import { Flame } from "lucide-react";
import { SectionWrapper } from "../projects/[projectId]/section-wrapper";
import { RecentSession } from "./recent-session";
import { getUserId } from "@/lib/auth-session";
import { WeeklySessionsChart } from "../chart/weekly-sessions-chart";
import { getWeeklySessionChartData } from "@/utils/[projectId]/chart/get-weekly-sessions-data";
import { SessionPeriodChart } from "../chart/sessions-periods-chart";
import { StatCard } from "../stat-card";
import { ChartCard } from "../chart/chart-card";
import { getWeeklyDevSession } from "@/lib/queries/dashboard/dev-sessions/get-weekly-dev-session";
import { formatDuration } from "../projects/project-card";

export const SessionsOverview = async () => {
  const userId = await getUserId();
  const chartData = await getWeeklySessionChartData(userId);
  const weeklyDevSession = await getWeeklyDevSession(userId);

  const sessionDurations = weeklyDevSession.map((s) => s.duration ?? 0);

  const averageSessionTime =
    sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
      : 0;
  const longestSession = Math.max(...sessionDurations);
  const totalBreaks = weeklyDevSession.reduce(
    (count, session) => count + (session.pauses.length ?? 0),
    0
  );

  const totalBreakTime = weeklyDevSession.reduce((sum, session) => {
    const pauseDurations = session.pauses.map((p) => p.duration ?? 0);
    const totalSessionPause = pauseDurations.reduce((a, b) => a + b, 0);
    return sum + totalSessionPause;
  }, 0);

  // Durée moyenne d'une pause
  const averageBreakTime = totalBreaks > 0 ? totalBreakTime / totalBreaks : 0;

  const statsData = [
    {
      title: "Average Session Time",
      value: formatDuration(averageSessionTime),
    },
    {
      title: "Longest Session",
      value: formatDuration(longestSession),
    },
    {
      title: "Breaks This Week",
      value: `${totalBreaks} break${totalBreaks !== 1 ? "s" : ""}`,
    },
    {
      title: "Average Break Duration",
      value: formatDuration(averageBreakTime),
    },
  ];
  return (
    <SectionWrapper title="Sessions Overview" icon={<Flame />}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((data) => (
          <StatCard key={data.title} title={data.title} value={data.value} />
        ))}
      </div>
      <div className="flex flex-col xl:flex-row gap-2">
        <ChartCard
          title="Sessions per Day (This Week)"
          className="mt-6 xl:w-1/2"
        >
          <WeeklySessionsChart data={chartData} />
        </ChartCard>

        <ChartCard
          title="Period when you code (This Week)"
          className="mt-6 xl:w-1/2"
        >
          <SessionPeriodChart devSessions={weeklyDevSession} />
        </ChartCard>
      </div>
      <div className="mt-6">
        <RecentSession userId={userId} />
      </div>
    </SectionWrapper>
  );
};
