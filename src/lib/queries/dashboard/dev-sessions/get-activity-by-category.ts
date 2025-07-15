import { prisma } from "@/lib/prisma";
import { startOfDay, subDays, subMonths } from "date-fns";

type WhereClause = {
  project: { userId: string };
  startedAt?: { gte: Date };
};

export async function getActivityByCategory(userId: string) {
  const periods = [
    { label: "weekly", startDate: subDays(new Date(), 6) },
    { label: "monthly", startDate: subMonths(new Date(), 1) },
  ];

  for (const period of periods) {
    const whereClause: WhereClause = { project: { userId } };
    if (period.startDate) {
      whereClause.startedAt = { gte: startOfDay(period.startDate) };
    }

    if (period.startDate) {
      whereClause.startedAt = { gte: startOfDay(period.startDate) };
    }

    const sessions = await prisma.devSession.findMany({
      where: whereClause,
      include: {
        project: {
          include: { categories: true },
        },
      },
    });

    if (sessions.length > 0) {
      const groupedData: Record<string, Record<string, number>> = {};

      for (const session of sessions) {
        const dateKey = session.startedAt.toISOString().slice(0, 10); // YYYY-MM-DD
        const duration = session.duration ?? 0;
        const categories = session.project.categories.map((c) => c.name);

        if (!groupedData[dateKey]) groupedData[dateKey] = {};

        for (const cat of categories) {
          groupedData[dateKey][cat] =
            (groupedData[dateKey][cat] ?? 0) + duration;
        }
      }

      return { period: period.label, data: groupedData };
    }
  }

  return { period: null, data: {} };
}
