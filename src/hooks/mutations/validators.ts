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

export const createWorkoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  exercises: z.string().array()
});

export type CreateWorkoutType = z.infer<typeof createWorkoutValidator>;
export type CreateWorkoutErrors = z.inferFlattenedErrors<
  typeof createWorkoutValidator
>;
