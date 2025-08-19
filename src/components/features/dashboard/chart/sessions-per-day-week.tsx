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
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  devSessions: PartialSession[];
  dict: {
    labels: Record<
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday",
      string
    >;
  };
};

export const SessionsPerWeekdayChart = ({ devSessions, dict }: Props) => {
  const counts = countSessionsPerWeekday(devSessions);

  const allDaysKeys: (keyof typeof counts)[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = allDaysKeys.map((day) => ({
    day,
    count: counts[day] ?? 0,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            tickFormatter={(key) =>
              dict.labels[
                (key as string).toLowerCase() as keyof typeof dict.labels
              ]
            }
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={
              <CustomTooltip
                valueFormatter={(value) => `${value}`}
                nameMap={{ count: "Sessions" }}
                showLabel={false}
              />
            }
            cursor={{ fill: "var(--chart-1)", opacity: 0.2 }}
          />
          <Bar dataKey="count" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
