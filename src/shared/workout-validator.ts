import { inferFlattenedErrors, z } from "zod";

export const workoutValidator = z.object({
  name: z.string(),
  exercises: z.object({
    // TODO
  })
});

export type WorkoutValidator = z.infer<typeof workoutValidator>;
export type WorkoutValidatorErrors = inferFlattenedErrors<
  typeof workoutValidator
>;
