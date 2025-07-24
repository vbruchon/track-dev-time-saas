"use server";

import { getUserId } from "../auth-session";
import { prisma } from "../prisma";
import {
  apiKeyFormSchema,
  ApiKeyFormSchemaType,
} from "../schema/api-key-form-schema";

export const updateUserApiKey = async (data: ApiKeyFormSchemaType) => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const parsed = apiKeyFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form input");
  }

  const { apiKey } = parsed.data;

  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { apiKey },
    });
  } catch {
    throw new Error("Failed to update API key");
  }
};
