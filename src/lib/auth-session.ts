import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";
import { auth } from "./auth";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";
import { getUserSubscription } from "./queries/dashboard/subscription/get-user-subscription";
import { addDays } from "date-fns";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getUser = async () => {
  const session = await getSession();

  if (!session) return null;

  return session.user;
};

export const getRequiredUser = async ({ redirectToSubscribe = true } = {}) => {
  const userSession = await getUser();

  if (!userSession) unauthorized();

  const user = await prisma.user.findUnique({
    where: { id: userSession.id },
  });

  if (!user) unauthorized();

  const userSubscription = await getUserSubscription(user.id);
  const isPro = userSubscription?.status === "active";
  const isInTrial = addDays(user.createdAt, 7) > new Date();
  console.log({ userSubscription, isPro, isInTrial });

  if (!isPro && !isInTrial && redirectToSubscribe) {
    return redirect("/subscribe");
  }

  return user;
};

export const getUserFromRequest = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) return null;

  const user = await prisma.user.findUnique({
    where: {
      apiKey,
    },
  });

  return user;
};

export const getUserId = async () => {
  const user = await getRequiredUser();

  return user.id;
};
