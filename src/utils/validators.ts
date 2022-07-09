import { z } from "zod";

export const idValidator = z.object({
  id: z.string()
});

export type IdErrors = z.inferFlattenedErrors<typeof idValidator>;

export const createExerciseValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  currentWeight: z
    .string()
    .transform(data => Number(data))
    .or(z.number())
    .optional(),
  targetWeight: z
    .string()
    .transform(data => Number(data))
    .or(z.number())
    .optional(),
  currentDistance: z
    .string()
    .transform(data => Number(data))
    .or(z.number())
    .optional(),
  targetDistance: z
    .string()
    .transform(data => Number(data))
    .or(z.number())
    .optional()
});

export type CreateExerciseInput = z.infer<typeof createExerciseValidator>;

export type CreateExerciseErrors = z.inferFlattenedErrors<
  typeof createExerciseValidator
>;

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

export const createWorkoutValidator = z.object({});

export type CreateWorkoutInput = z.infer<typeof createWorkoutValidator>;
export type CreateWorkoutErrors = z.inferFlattenedErrors<
  typeof createWorkoutValidator
>;
