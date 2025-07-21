"use server";

import { getUserId } from "../auth-session";
import { prisma } from "../prisma";
import {
  accountFormSchema,
  AccountFormSchemaType,
} from "../schema/account-form-schema";

export const updateUserAccount = async (data: AccountFormSchemaType) => {
  const userId = await getUserId();

  const parsed = accountFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form input");
  }

  const { name, imageUrl, weeklyGoal, apiKey } = parsed.data;
  const imageUrlClean = imageUrl === "" ? null : imageUrl;
  const weeklyGoalSeconds =
    weeklyGoal !== undefined ? Math.floor(weeklyGoal * 3600) : null;

  return await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      image: imageUrlClean,
      ...(weeklyGoalSeconds !== null ? { weeklyGoalSeconds } : {}),
      apiKey,
    },
  });
};
