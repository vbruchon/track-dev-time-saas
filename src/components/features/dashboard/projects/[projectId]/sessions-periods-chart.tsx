"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  countTimePerPeriod,
  PartialSession,
} from "@/utils/[projectId]/chart/session-analytics";
import { renderCustomizedLabel } from "@/utils/[projectId]/chart/render-customized-label";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Props = {
  devSessions: PartialSession[];
};

export const SessionStartPeriodChart = ({ devSessions }: Props) => {
  const data = countTimePerPeriod(devSessions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Period when you code</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
