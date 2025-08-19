import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function getSubscriptionsDistribution() {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  const grouped = await prisma.subscription.groupBy({
    by: ["plan"],
    _count: {
      plan: true,
    },
    where: {
      status: "active",
    },
  });

  return grouped.map((item) => ({
    name: item.plan === "pro_monthly" ? "Mensuel" : "Annuel",
    value: item._count.plan,
  }));
}
