"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TimeRange = "day" | "week" | "month";

type TimeRangeTabsProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  labels: Record<TimeRange, string>;
};

export const TimeRangeTabs = ({
  value,
  onChange,
  labels,
}: TimeRangeTabsProps) => {
  return (
    <Tabs value={value} onValueChange={(val) => onChange(val as TimeRange)}>
      <TabsList>
        <TabsTrigger value="day">{labels.day}</TabsTrigger>
        <TabsTrigger value="week">{labels.week}</TabsTrigger>
        <TabsTrigger value="month">{labels.month}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
