"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "../../chart/custom-tooltip";
import { format, parseISO } from "date-fns";

type Props = {
  data: { date: string; count: number }[];
};

export function UsersRegistrationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          dy={10}
          tickFormatter={(dateStr) => format(parseISO(dateStr), "MM/dd")}
        />
        <YAxis
          label={{
            value: "Users",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          content={<CustomTooltip nameMap={{ count: "Users Registered" }} />}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke={"var(--chart-1)"}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
