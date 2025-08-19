import { getUserId } from "@/lib/auth-session";
import { Award, BadgePlus, Clock, Code2 } from "lucide-react";
import { getTopProject } from "@/lib/queries/dashboard/projects/get-weekly-top-project";
import { getLastProjectCreated } from "@/lib/queries/dashboard/projects/get-last-project-created";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "../projects/project-card";
import { ProjectHighlightCard } from "./project-highlight-card";

export type HighlightsDict = {
  topProject: string;
  lastProjectCreated: string;
  period: {
    weekly: string;
    monthly: string;
    global: string;
  };
  totalTime: string;
  sessions: string;
  lastSession: string;
  createdAt: string;
  noProjectData: string;
  noProjectCreated: string;
};

export const ProjectHighlights = async ({ dict }: { dict: HighlightsDict }) => {
  const userId = await getUserId();
  const topProject = await getTopProject(userId);
  const lastProjectCreated = await getLastProjectCreated(userId);

  const periodLabel = topProject?.period
    ? topProject.period === "weekly"
      ? dict.period.weekly
      : topProject.period === "monthly"
        ? dict.period.monthly
        : dict.period.global
    : dict.period.global;

  const totalDuration =
    lastProjectCreated?.devSessions.reduce(
      (acc, session) => acc + (session.duration ?? 0),
      0
    ) ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProjectHighlightCard
        title={`${dict.topProject} (${periodLabel})`}
        badge={<Award className="text-yellow-500" />}
        projectId={topProject?.id}
      >
        {topProject ? (
          <>
            <p className="font-semibold">{topProject.name}</p>
            <div className="space-y-2 mt-2">
              <p className="text-sm">
                {dict.totalTime}: {topProject.totalTime}
              </p>
              <p className="text-sm">
                {dict.sessions}: {topProject.sessions}
              </p>
              <p className="text-sm">
                {dict.lastSession}: {topProject.lastSession}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm">{dict.noProjectData}</p>
        )}
      </ProjectHighlightCard>

      <ProjectHighlightCard
        title={dict.lastProjectCreated}
        badge={<BadgePlus className="text-green-600" />}
        projectId={lastProjectCreated?.id}
      >
        {lastProjectCreated ? (
          <>
            <p className="font-semibold">{lastProjectCreated.name}</p>
            <div className="flex gap-2 flex-wrap mt-1">
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2 py-1 text-sm"
              >
                <Code2 className="w-4 h-4" />
                {lastProjectCreated.devSessions.length}{" "}
                {dict.sessions.toLowerCase()}
                {lastProjectCreated.devSessions.length !== 1 ? "s" : ""}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-2 py-1 text-sm"
              >
                <Clock className="w-4 h-4" />
                {formatDuration(totalDuration)}
              </Badge>
            </div>
            <p className="text-xs mt-2">
              {dict.createdAt}:{" "}
              {lastProjectCreated.createdAt.toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-sm">{dict.noProjectCreated}</p>
        )}
      </ProjectHighlightCard>
    </div>
  );
};
