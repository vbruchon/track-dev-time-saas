"use client";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Props = {
  data: { technology: string; count: number }[];
};

export const TechnologyCountChart = ({ data }: Props) => {
  const hasData = data.length > 0;
  const fallbackData = [{ technology: "N/A", count: 0 }];

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={hasData ? data : fallbackData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <XAxis type="number" allowDecimals={false} />
          <YAxis
            dataKey="technology"
            type="category"
            interval={0}
            width={150}
            tick={{ fontSize: 14 }}
          />
          <Tooltip
            content={
              <CustomTooltip
                nameMap={{ count: "Project" }}
                valueFormatter={(value) => `${value}`}
                labelClassName="text-primary font-semibold"
              />
            }
            cursor={{ fill: "var(--chart-1)", opacity: 0.2 }}
          />
          <Bar dataKey="count" fill="#8884d8" barSize={20}>
            {(hasData ? data : fallbackData).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          No technologie to display
        </div>
      )}
    </div>
  );
};
