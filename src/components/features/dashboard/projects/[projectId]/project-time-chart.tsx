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

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState, useMemo } from "react";

import { DevSession } from "@/generated";
import { groupSessions } from "@/utils/[projectId]/chart/group-sessions";

export type PartialSession = Omit<DevSession, "userId"> & {
  startedAt: Date;
  endedAt: Date | null;
};

type Props = {
  devSessions: PartialSession[];
};

type TimeRange = "day" | "week" | "month";

export function ProjectTimeChart({ devSessions }: Props) {
  const [tab, setTab] = useState<TimeRange>("day");

  const datasets = useMemo(() => groupSessions(devSessions), [devSessions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project time spent</CardTitle>
        <Tabs
          value={tab}
          onValueChange={(val) => setTab(val as TimeRange)}
          className="mt-4"
        >
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-[300px]">
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
      </CardContent>
    </Card>
  );
}
