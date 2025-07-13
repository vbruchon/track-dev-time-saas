import { Category, DevSession, Pause, Project, Technology } from "@/generated";

export type DevSessionWithPauses = DevSession & {
  pauses: Pause[];
};

export type ProjectWithSessions = Project & {
  devSessions: DevSessionWithPauses[];
  technologies: Technology[];
  categories: Category[];
};

export type ProjectStats = {
  totalSessionsCount: number;
  totalSessionDuration: number;
  averageSessionDuration: number;
  longestSessionDuration: number;
  averagePausesPerSession: number;
  totalPauseDuration: number;
  averagePausesDuration: number;
  productivityRatio: number;
};

export function getProjectStats(project: ProjectWithSessions): ProjectStats {
  const sessions = project.devSessions;

  const totalSessionsCount: number = sessions.length;

  const totalSessionDuration: number = sessions.reduce(
    (total: number, session: DevSessionWithPauses) =>
      total + (session.duration ?? 0),
    0
  );

  const averageSessionDuration: number = totalSessionsCount
    ? totalSessionDuration / totalSessionsCount
    : 0;

  const longestSessionDuration: number = sessions.reduce(
    (max: number, session: DevSessionWithPauses) =>
      Math.max(max, session.duration ?? 0),
    0
  );

  const totalPausesCount: number = sessions.reduce(
    (total: number, session: DevSessionWithPauses) =>
      total + session.pauses.length,
    0
  );

  const averagePausesPerSession: number = totalSessionsCount
    ? Number((totalPausesCount / totalSessionsCount).toFixed(1))
    : 0;

  const totalPauseDuration: number = sessions.reduce(
    (total: number, session: DevSessionWithPauses) =>
      total +
      session.pauses.reduce(
        (sum: number, pause: Pause) => sum + (pause.duration ?? 0),
        0
      ),
    0
  );

  const averagePausesDuration: number = totalPausesCount
    ? totalPauseDuration / totalPausesCount
    : 0;

  const productivityRatio: number = totalSessionDuration
    ? (totalSessionDuration - totalPauseDuration) / totalSessionDuration
    : 0;

  return {
    totalSessionsCount,
    totalSessionDuration,
    averageSessionDuration,
    longestSessionDuration,
    averagePausesPerSession,
    totalPauseDuration,
    averagePausesDuration,
    productivityRatio,
  };
}
