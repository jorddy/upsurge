import { z } from "zod";

export const createExerciseValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  description: z.string().optional(),
  currentWeight: z
    .string()
    .transform(data => parseInt(data))
    .or(z.number()),
  targetWeight: z
    .string()
    .transform(data => parseInt(data))
    .or(z.number())
});

export type CreateExerciseType = z.infer<typeof createExerciseValidator>;
export type CreateExerciseErrors = z.inferFlattenedErrors<
  typeof createExerciseValidator
>;
