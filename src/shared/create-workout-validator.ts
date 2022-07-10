import { z } from "zod";
import { createEntryValidator } from "./create-entry-validator";

export const createWorkoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  createdAt: z
    .string()
    .transform(data => new Date(data))
    .or(z.date())
    .optional(),
  entries: createEntryValidator
    .extend({
      name: z.string(),
      type: z.enum(["weight", "cardio"])
    })
    .array()
});

export type CreateWorkoutInput = z.infer<typeof createWorkoutValidator>;
export type CreateWorkoutErrors = z.inferFlattenedErrors<
  typeof createWorkoutValidator
>;
