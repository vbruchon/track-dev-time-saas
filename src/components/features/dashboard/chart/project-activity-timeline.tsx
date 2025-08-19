"use client";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { formatDuration } from "../projects/project-card";
import { CustomTooltip } from "./custom-tooltip";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-5)",
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-4)",
];

export type ChartDataPoint = {
  date: string;
  [category: string]: number | string;
};

type Props = {
  data: ChartDataPoint[];
  categories: string[];
};

export const ProjectActivityTimeline = ({ data, categories }: Props) => {
  const hasData = data.length > 0;
  console.log({ data });

  // fallback data pour que Recharts n'explose pas
  const fallbackData = [{ date: "N/A" }];

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={hasData ? data : fallbackData}
          stackOffset="expand"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
          <Tooltip
            content={
              <CustomTooltip
                valueFormatter={(value) => formatDuration(value)}
              />
            }
            cursor={{ fill: "var(--chart-1)", opacity: 0.2 }}
          />

          <Legend />
          {categories.map((cat, i) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="a"
              fill={COLORS[i % COLORS.length]}
              name={cat}
              isAnimationActive={hasData}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          No data at the moment
        </div>
      )}
    </div>
  );
};
