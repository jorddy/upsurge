import { z } from "zod";

export const exerciseValidator = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  description: z.string(),
  currentWeight: z.number(),
  targetWeight: z.number(),
  userId: z.string(),
  workoutId: z.string().nullable()
});

export type ExerciseType = z.infer<typeof exerciseValidator>;
