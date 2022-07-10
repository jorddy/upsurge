import { z } from "zod";

export const createEntryValidator = z.object({
  exerciseId: z.string().min(1, "You must provide an exercise"),
  notes: z.string().optional(),
  sets: z
    .object({
      reps: z
        .string()
        .transform(data => Number(data))
        .or(z.number())
        .optional(),
      weight: z
        .string()
        .transform(data => Number(data))
        .or(z.number())
        .optional(),
      distance: z
        .string()
        .transform(data => Number(data))
        .or(z.number())
        .optional(),
      elevation: z
        .string()
        .transform(data => Number(data))
        .or(z.number())
        .optional()
    })
    .array()
    .min(1)
});

export type CreateEntryInput = z.infer<typeof createEntryValidator>;
export type CreateEntryErrors = z.inferFlattenedErrors<
  typeof createEntryValidator
>;
