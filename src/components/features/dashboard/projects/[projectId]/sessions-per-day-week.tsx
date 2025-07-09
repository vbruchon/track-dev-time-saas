"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Day when you code</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" ticks={allDays} />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar dataKey="count" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
