import { z } from "zod";

export const updateWorkoutValidator = z.object({
  workoutId: z.string(),
  name: z
    .string()
    .transform(data => {
      if (data.length === 0) {
        return undefined;
      }
      return data;
    })
    .optional(),
  createdAt: z
    .string()
    .transform(data => {
      if (data.length === 0) {
        return undefined;
      }
      return new Date(data);
    })
    .or(z.date())
    .optional()
});

export type UpdateWorkoutValidator = z.infer<typeof updateWorkoutValidator>;
