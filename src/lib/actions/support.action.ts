"use server";

import { getUser } from "../auth-session";
import {
  supportFormSchema,
  SupportFormSchemaType,
} from "../schema/support-form-schema";
import { resend } from "../resend";
import SupportNotification from "../../../emails/support-notification";

export const sendSupportMessage = async (data: SupportFormSchemaType) => {
  const user = await getUser();

  const parsed = supportFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form input");
  }

  const { supportMessage } = parsed.data;
  const userEmail = user?.email ?? "contact@vivianb.fr";

  const result = await resend.emails.send({
    from: "Track Dev Time <noreply@track-dev-time.dev>",
    to: process.env.SUPPORT_EMAIL!,
    replyTo: userEmail,
    subject: "New support message from Track Dev Time",
    react: SupportNotification({
      message: supportMessage,
      userEmail: userEmail,
    }),
  });

  if (result.error) {
    console.error("Resend error:", result.error);
    throw new Error(result.error.message);
  }
};
