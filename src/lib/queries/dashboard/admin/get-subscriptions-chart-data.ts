import { SubscriptionPlan } from "@/generated";
import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { startOfMonth, subMonths } from "date-fns";

export async function getSubscriptionsChartData(months = 6) {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  const now = new Date();
  const data: {
    period: string;
    monthly: number;
    yearly: number;
    total: number;
  }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const start = startOfMonth(subMonths(now, i));
    const end = startOfMonth(subMonths(now, i - 1));

    const monthly = await prisma.subscription.count({
      where: {
        plan: SubscriptionPlan.pro_monthly,
        status: "active",
        periodStart: { gte: start, lt: end },
      },
    });

    const yearly = await prisma.subscription.count({
      where: {
        plan: SubscriptionPlan.pro_yearly,
        status: "active",
        periodStart: { gte: start, lt: end },
      },
    });

    data.push({
      period: start.toLocaleString("default", { month: "short" }),
      monthly,
      yearly,
      total: monthly + yearly,
    });
  }

  return data;
}
