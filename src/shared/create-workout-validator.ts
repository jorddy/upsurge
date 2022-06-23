import { z } from "zod";

export const createWorkoutValidator = z.object({
  name: z.string().min(1, "You must provide a name")
});

export type CreateWorkoutType = z.infer<typeof createWorkoutValidator>;
export type CreateWorkoutErrors = z.inferFlattenedErrors<
  typeof createWorkoutValidator
>;
