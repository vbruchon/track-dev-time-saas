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

  const result = await resend.emails.send({
    from: "Track Dev Time <noreply@track-dev-time.dev>",
    to: process.env.FEEDBACK_EMAIL!,
    replyTo: userEmail,
    subject: "New feedback from Track Dev Time",
    text: `You've received a new feedback:\n\n"${feedback}"\n\nFrom: ${userEmail}`,
  });

  if (result.error) {
    console.error("Resend error:", result.error);
    throw new Error(result.error.message);
  }
  return result;
};
