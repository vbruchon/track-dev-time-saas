"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../../chart/chart-card";

type SubscriptionData = {
  name: string;
  value: number;
  isEmpty?: boolean;
};

const COLORS = ["var(--chart-1)", "var(--chart-4)"];

export function SubscriptionsDistributionChart({
  data,
}: {
  data: SubscriptionData[];
}) {
  const hasData = data.some((d) => !d.isEmpty);

  return (
    <ChartCard title="Subscriptions Distribution" className="w-[500px] mt-8">
      {!hasData ? (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          No subscription data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isEmpty
                      ? "var(--muted)"
                      : COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
