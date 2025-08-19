"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  countTimePerPeriod,
  PartialSession,
  PeriodKey,
} from "@/utils/[projectId]/chart/session-analytics";
import { renderCustomizedLabel } from "@/utils/[projectId]/chart/render-customized-label";
import { CustomTooltip } from "./custom-tooltip";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

type Props = {
  devSessions: PartialSession[];
  dict: {
    labels: Record<PeriodKey, string>;
  };
};

export const SessionPeriodChart = ({ devSessions, dict }: Props) => {
  const rawData = countTimePerPeriod(devSessions);

  const data = rawData.map((d) => ({
    ...d,
    name: dict.labels[d.name.toLowerCase() as PeriodKey],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={(value) => `${value} session(s)`}
              nameMap={{ count: "Sessions" }}
            />
          }
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};
