"use server";

import { getUser } from "../auth-session";
import {
  supportFormSchema,
  SupportFormSchemaType,
} from "../schema/support-form-schema";
import { resend } from "../resend";

export const sendSupportMessage = async (data: SupportFormSchemaType) => {
  const user = await getUser();

  const parsed = supportFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form input");
  }

  const { supportMessage } = parsed.data;
  const userEmail = user?.email ?? "contact@vivianb.fr";

  return await resend.emails.send({
    from: userEmail,
    to: process.env.SUPPORT_EMAIL!,
    subject: "New support message from Track Dev Time",
    text: `You've received a new support request:\n\n"${supportMessage}"\n\nFrom: ${userEmail}`,
  });
};
