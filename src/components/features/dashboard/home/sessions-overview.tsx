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

export type SessionsOverviewDict = {
  title: string;
  stats: {
    averageSession: string;
    longestSession: string;
    breaksThisWeek: string;
    averageBreak: string;
  };
  charts: {
    sessionsPerDay: string;
    codingPeriod: string;
    dayLabels: string[];
    periodLabels: {
      morning: string;
      afternoon: string;
      evening: string;
      night: string;
    };
  };
  recentSessions: {
    title: string;
    table: {
      date: string;
      startedAt: string;
      endedAt: string;
      project: string;
      duration: string;
      actions: string;
    };
  };
  pauses: {
    label: string;
    title: string;
    noFound: string;
    date: string;
    startedAt: string;
    endedAt: string;
    duration: string;
    next: string;
    previous: string;
  };
};

export const SessionsOverview = async ({
  dict,
}: {
  dict: SessionsOverviewDict;
}) => {
  const userId = await getUserId();
  const chartData = await getWeeklySessionChartData(
    userId,
    dict.charts.dayLabels
  );
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

  const averageBreakTime = totalBreaks > 0 ? totalBreakTime / totalBreaks : 0;

  const statsData = [
    {
      title: dict.stats.averageSession,
      value: formatDuration(averageSessionTime),
    },
    {
      title: dict.stats.longestSession,
      value: formatDuration(longestSession),
    },
    {
      title: dict.stats.breaksThisWeek,
      value: `${totalBreaks} break${totalBreaks !== 1 ? "s" : ""}`,
    },
    {
      title: dict.stats.averageBreak,
      value: formatDuration(averageBreakTime),
    },
  ];

  return (
    <SectionWrapper title={dict.title} icon={<Flame />}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((data) => (
          <StatCard key={data.title} title={data.title} value={data.value} />
        ))}
      </div>
      <div className="flex flex-col xl:flex-row gap-2">
        <ChartCard title={dict.charts.sessionsPerDay} className="mt-6 xl:w-1/2">
          <WeeklySessionsChart data={chartData} />
        </ChartCard>

        <ChartCard title={dict.charts.codingPeriod} className="mt-6 xl:w-1/2">
          <SessionPeriodChart
            devSessions={weeklyDevSession}
            dict={{ labels: dict.charts.periodLabels }}
          />
        </ChartCard>
      </div>
      <div className="mt-6">
        <RecentSession
          userId={userId}
          dict={dict.recentSessions}
          dictPause={dict.pauses}
        />
      </div>
    </SectionWrapper>
  );
};
