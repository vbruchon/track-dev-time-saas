import { z } from "zod";

export const apiKeyFormSchema = z.object({
  apiKey: z.string().min(30),
});

export type ApiKeyFormSchemaType = z.infer<typeof apiKeyFormSchema>;
