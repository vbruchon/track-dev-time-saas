import z from "zod";

export const pauseSchema = z
  .object({
    id: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    duration: z.number().optional(),
  })
  .refine((data) => data.end > data.start, {
    message: "End date must be after start date",
    path: ["end"],
  });

export const sessionSchema = z
  .object({
    projectName: z.string(),
    id: z.string().optional(),
    start: z.coerce.date(),
    pauses: z.array(pauseSchema),
    end: z.coerce.date(),
    duration: z.number().int(),
  })
  .refine((data) => data.end > data.start, {
    message: "End date must be after start date",
    path: ["end"],
  });

export type PauseSchemaType = z.infer<typeof pauseSchema>;
export type SessionSchemaType = z.infer<typeof sessionSchema>;
