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
import { formatDuration } from "../projects/project-card";
import { CustomTooltip } from "./custom-tooltip";

export type PartialSession = Omit<DevSession, "userId"> & {
  startedAt: Date;
  endedAt: Date | null;
};

type Props = {
  devSessions: PartialSession[];
  tab: TimeRange;
  dict: {
    hoursLabel: string;
    tooltipLabel: string;
  };
};

type TimeRange = "day" | "week" | "month";

export function ProjectTimeChart({ devSessions, tab, dict }: Props) {
  const datasets = useMemo(() => groupSessions(devSessions), [devSessions]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={datasets[tab]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: dict.hoursLabel,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          content={
            <CustomTooltip
              valueFormatter={(value) => formatDuration(value * 3600)}
              nameMap={{ duration: dict.tooltipLabel }}
            />
          }
        />

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
