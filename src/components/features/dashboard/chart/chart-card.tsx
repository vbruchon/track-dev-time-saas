import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartCardProps = {
  title: string;
  headerContent?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const ChartCard = ({
  title,
  headerContent,
  children,
  className,
}: ChartCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground">
          {title}
        </CardTitle>
        <div className="mt-4">{headerContent}</div>
      </CardHeader>
      <CardContent className="h-[300px]">{children}</CardContent>
    </Card>
  );
};
