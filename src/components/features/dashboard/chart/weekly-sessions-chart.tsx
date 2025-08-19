"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type WeeklySessionsChartProps = {
  data: { day: string; count: number }[];
};

export const WeeklySessionsChart = ({ data }: WeeklySessionsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={(value) => `${value}`}
              nameMap={{ count: "Sessions" }}
              showLabel={false}
            />
          }
        />
        <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
