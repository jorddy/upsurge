import { z } from "zod";

export const createWorkoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  createdAt: z
    .string()
    .optional()
    .transform(data => {
      if (data) return new Date(data);
    }),
  entries: z
    .object({
      exerciseId: z.string().min(1, "You must provide an exercise"),
      sets: z
        .object({
          reps: z.number().optional(),
          weight: z.number().optional(),
          distance: z.number().optional(),
          elevation: z.number().optional()
        })
        .array()
    })
    .array()
});

export type CreateWorkoutType = z.infer<typeof createWorkoutValidator>;
export type CreateWorkoutErrors = z.inferFlattenedErrors<
  typeof createWorkoutValidator
>;
