import { z } from "zod";

export const accountFormSchema = z.object({
  name: z.string().min(3),
  //.optional(),
  email: z.string().email("Invalid email").optional(),
  imageUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  weeklyGoal: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0)
    .max(168),
  apiKey: z.string().min(10),
});

export type AccountFormSchemaType = z.infer<typeof accountFormSchema>;
