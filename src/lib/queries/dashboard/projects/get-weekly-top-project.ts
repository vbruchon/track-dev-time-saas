import { formatDuration } from "@/components/features/dashboard/projects/project-card";
import { prisma } from "@/lib/prisma";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

async function getProjectsWithStats(userId: string, start?: Date, end?: Date) {
  const devSessionFilter =
    start && end ? { startedAt: { gte: start, lte: end } } : undefined;

  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      devSessions: {
        where: devSessionFilter,
        select: {
          duration: true,
          startedAt: true,
        },
      },
    },
  });

  return projects.map((project) => {
    const totalDuration = project.devSessions.reduce(
      (sum, s) => sum + (s.duration ?? 0),
      0
    );

    const sessionsCount = project.devSessions.length;

    const lastSessionDate = project.devSessions.reduce(
      (latest, s) => {
        if (!latest) return s.startedAt;
        return s.startedAt > latest ? s.startedAt : latest;
      },
      null as Date | null
    );

    return {
      id: project.id,
      name: project.name,
      totalDuration,
      totalTime: formatDuration(totalDuration),
      sessions: sessionsCount,
      lastSession: lastSessionDate
        ? format(lastSessionDate, "yyyy-MM-dd")
        : "—",
    };
  });
}

export async function getTopProject(userId: string) {
  const weekStart = startOfWeek(new Date(), {
    weekStartsOn: 0,
  });
  const weekEnd = endOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  let projectsWithStats = await getProjectsWithStats(
    userId,
    weekStart,
    weekEnd
  );
  let topProject = projectsWithStats.reduce(
    (prev, current) =>
      current.totalDuration > prev.totalDuration ? current : prev,
    {
      id: "",
      name: "",
      totalDuration: 0,
      totalTime: "0m",
      sessions: 0,
      lastSession: "—",
    }
  );

  if (topProject.totalDuration > 0) {
    return { ...topProject, period: "weekly" as const };
  }

  projectsWithStats = await getProjectsWithStats(userId, monthStart, monthEnd);
  topProject = projectsWithStats.reduce(
    (prev, current) =>
      current.totalDuration > prev.totalDuration ? current : prev,
    {
      id: "",
      name: "",
      totalDuration: 0,
      totalTime: "0m",
      sessions: 0,
      lastSession: "—",
    }
  );

  if (topProject.totalDuration > 0) {
    return { ...topProject, period: "monthly" as const };
  }

  projectsWithStats = await getProjectsWithStats(userId);
  topProject = projectsWithStats.reduce(
    (prev, current) =>
      current.totalDuration > prev.totalDuration ? current : prev,
    {
      id: "",
      name: "",
      totalDuration: 0,
      totalTime: "0m",
      sessions: 0,
      lastSession: "—",
    }
  );

  if (topProject.totalDuration > 0) {
    return { ...topProject, period: "total" as const };
  }

  return null;
}
