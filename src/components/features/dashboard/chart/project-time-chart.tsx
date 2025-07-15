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

import { useMemo } from "react";

import { DevSession } from "@/generated";
import { groupSessions } from "@/utils/[projectId]/chart/group-sessions";

export type PartialSession = Omit<DevSession, "userId"> & {
  startedAt: Date;
  endedAt: Date | null;
};

type Props = {
  devSessions: PartialSession[];
  tab: TimeRange;
};

type TimeRange = "day" | "week" | "month";

export function ProjectTimeChart({ devSessions, tab }: Props) {
  const datasets = useMemo(() => groupSessions(devSessions), [devSessions]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={datasets[tab]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="oklch(0.8452 0 0)" />
        <YAxis
          label={{
            value: "Hours",
            angle: -90,
            position: "insideLeft",
          }}
          stroke="oklch(0.8452 0 0)"
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="duration"
          stroke={"var(--chart-1)"}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
