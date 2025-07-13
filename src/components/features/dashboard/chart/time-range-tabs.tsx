"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TimeRange = "day" | "week" | "month";

type TimeRangeTabsProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

export const TimeRangeTabs = ({ value, onChange }: TimeRangeTabsProps) => {
  return (
    <Tabs value={value} onValueChange={(val) => onChange(val as TimeRange)}>
      <TabsList>
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
