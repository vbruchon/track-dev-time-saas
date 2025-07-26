import { z } from "zod";

export const supportFormSchema = z.object({
  supportMessage: z
    .string()
    .min(10, {
      message: "Please provide more details (at least 10 characters).",
    })
    .max(1000, {
      message:
        "Your message is too long. Please keep it under 1000 characters.",
    })
    .trim(),
});

export type SupportFormSchemaType = z.infer<typeof supportFormSchema>;
