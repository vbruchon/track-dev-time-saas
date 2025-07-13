"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  countSessionsPerWeekday,
  PartialSession,
} from "@/utils/[projectId]/chart/session-analytics";

type Props = {
  devSessions: PartialSession[];
};
export const SessionsPerWeekdayChart = ({ devSessions }: Props) => {
  const counts = countSessionsPerWeekday(devSessions);

  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = allDays.map((day) => ({
    day,
    count: counts[day] ?? 0,
  }));

  return (
    <div className="h-[300x]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" ticks={allDays} />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Bar dataKey="count" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
