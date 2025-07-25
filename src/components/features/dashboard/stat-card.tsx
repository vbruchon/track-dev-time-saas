import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export const StatCard = ({ title, value, icon, className }: StatCardProps) => {
  return (
    <Card className={cn(" shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
};
