import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { format, subDays } from "date-fns";

type HighlightStats = {
  totalUsers: number;
  trialUsers: {
    name: string | null;
    id: string;
    email: string;
    image: string | null;
    apiKey: string | null;
    weeklyGoalSeconds: number | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    banExpires: Date | null;
  }[];
  subscribedUsers: number;
  nonSubscribedUsers: number;
  chartData: { date: string; count: number }[];
};

export const getHighlightsStats = async (): Promise<HighlightStats> => {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  const today = new Date();
  const trialDaysTotal = 7;

  const totalUsers = await prisma.user.count();

  const trialUsers = await prisma.user.findMany({
    where: {
      AND: [
        { createdAt: { gte: subDays(today, trialDaysTotal) } },
        { subscriptions: { none: {} } },
      ],
    },
  });

  const subscribedUsers = await prisma.subscription.count({
    where: { status: "active" },
  });

  const nonSubscribedUsers = totalUsers - subscribedUsers - trialUsers.length;

  // Chart data (registration last 30 days)
  const days = 30;
  const startDate = subDays(today, days);
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: startDate } },
    select: { createdAt: true },
  });

  const countsByDay: Record<string, number> = {};
  for (let i = 0; i <= days; i++) {
    countsByDay[format(subDays(today, i), "yyyy-MM-dd")] = 0;
  }

  users.forEach((u) => {
    const date = format(u.createdAt, "yyyy-MM-dd");
    countsByDay[date] = (countsByDay[date] || 0) + 1;
  });

  const chartData = Object.entries(countsByDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalUsers,
    trialUsers,
    subscribedUsers,
    nonSubscribedUsers,
    chartData,
  };
};
