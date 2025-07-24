import { getUserId } from "@/lib/auth-session";
import { ApiKeyForm } from "../docs/api-key-form";
import { prisma } from "@/lib/prisma";

export async function ApiKeyFormServer() {
  const userId = await getUserId();
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });

  return <ApiKeyForm user={user} />;
}
