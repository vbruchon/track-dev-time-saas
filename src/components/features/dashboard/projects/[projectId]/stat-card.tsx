import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export const StatCard = ({ label, value, icon, className }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="text-center">
        <p className={cn("text-xl font-bold", className)}>{value}</p>
        <p className="mt-2.5 flex items-center justify-center gap-1 text-xs md:text-sm text-muted-foreground">
          {icon && <span>{icon}</span>}
          {label}
        </p>
      </CardContent>
    </Card>
  );
};
