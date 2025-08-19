"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../chart/chart-card";
import { CustomTooltip } from "../chart/custom-tooltip";

type SubscriptionData = {
  period: string;
  monthly: number;
  yearly: number;
  total: number;
};

export function SubscriptionsChart({ data }: { data: SubscriptionData[] }) {
  return (
    <ChartCard title="Subscription last 3 months " className="mt-8 flex-1">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="monthly"
            stroke="var(--chart-1)"
            strokeWidth={2}
            name="Mensuel"
          />
          <Line
            type="monotone"
            dataKey="yearly"
            stroke="var(--chart-3)"
            strokeWidth={2}
            name="Annuel"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--chart-5)"
            strokeWidth={2}
            name="Total"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
