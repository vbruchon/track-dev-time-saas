import { Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import Link from "next/link";

type HighlightCardProps = {
  title: string;
  badge: React.ReactNode;
  children: React.ReactNode;
  projectId?: string;
};

export const ProjectHighlightCard = ({
  title,
  badge,
  children,
  projectId,
}: HighlightCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <Card className="relative flex flex-col justify-between h-full">
        <div className="absolute top-5 right-2 size-7">{badge}</div>
        <CardHeader>
          <CardTitle className="text-base">{children}</CardTitle>
        </CardHeader>
        {projectId && (
          <CardAction className="mx-auto mt-auto mb-2">
            <Link
              href={`/dashboard/projects/${projectId}`}
              className="flex items-center gap-2 text-blue-500"
            >
              <Eye className="w-4 h-4" />
              Go to project
            </Link>
          </CardAction>
        )}
      </Card>
    </div>
  );
};
