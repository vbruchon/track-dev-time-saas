import { prisma } from "@/lib/prisma";

export const getUserSubscription = async (userId: string) => {
  return await prisma.subscription.findFirst({
    where: {
      referenceId: userId,
      status: "active",
    },
  });
};
