import { z } from "zod";

export const feedbackFormSchema = z.object({
  feedback: z
    .string()
    .min(10, { message: "Your feedback must be at least 10 characters long." })
    .max(1000, {
      message: "Your feedback must be at most 1000 characters long.",
    })
    .trim(),
});

export type FeedbackFormSchemaType = z.infer<typeof feedbackFormSchema>;
