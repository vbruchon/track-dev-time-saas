import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { startOfMonth, startOfYear } from "date-fns";

export const getSubscriptionsStats = async () => {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  const today = new Date();

  const monthlySubscriptions = await prisma.subscription.count({
    where: { status: "active", plan: "pro_monthly" },
  });

  const yearlySubscriptions = await prisma.subscription.count({
    where: { status: "active", plan: "pro_yearly" },
  });

  const totalRevenue = monthlySubscriptions * 7 + yearlySubscriptions * 70;

  const monthStart = startOfMonth(today);
  const monthRevenueSubs = await prisma.subscription.findMany({
    where: { status: "active", periodStart: { gte: monthStart } },
  });

  const monthRevenue = monthRevenueSubs.reduce(
    (acc, s) => acc + (s.plan === "pro_monthly" ? 7 : 70),
    0
  );

  const yearStart = startOfYear(today);
  const yearRevenueSubs = await prisma.subscription.findMany({
    where: { status: "active", periodStart: { gte: yearStart } },
  });

  const yearRevenue = yearRevenueSubs.reduce(
    (acc, s) => acc + (s.plan === "pro_monthly" ? 7 : 70),
    0
  );
  return {
    monthlySubscriptions,
    yearlySubscriptions,
    totalRevenue,
    monthRevenue,
    yearRevenue,
  };
};
