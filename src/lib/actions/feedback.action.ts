"use server";

import { getUser } from "../auth-session";
import {} from "../schema/account-form-schema";
import {
  feedbackFormSchema,
  FeedbackFormSchemaType,
} from "../schema/feedback-form-schema";
import { resend } from "../resend";

export const sendFeedBack = async (data: FeedbackFormSchemaType) => {
  const user = await getUser();

  const parsed = feedbackFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form input");
  }

  const { feedback } = parsed.data;
  const userEmail = user?.email ?? "contact@vivianb.fr";

  return await resend.emails.send({
    from: userEmail,
    to: process.env.FEEDBACK_EMAIL!,
    subject: "New feedback from Track Dev Time",
    text: `You've received a new feedback:\n\n"${feedback}"\n\nFrom: ${userEmail}`,
  });
};
