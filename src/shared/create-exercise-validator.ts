import { z } from "zod";

export const createExerciseValidator = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  currentWeight: z.string().transform(data => parseInt(data)),
  targetWeight: z.string().transform(data => parseInt(data))
});

export type CreateExerciseType = z.infer<typeof createExerciseValidator>;
export type CreateExerciseErrors = z.inferFlattenedErrors<
  typeof createExerciseValidator
>;
