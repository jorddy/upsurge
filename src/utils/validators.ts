import { z } from "zod";

export const entryValidator = z.object({
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

export type EntryValidator = z.infer<typeof entryValidator>;

export const exerciseValidator = z.object({
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

export type ExerciseValidator = z.infer<typeof exerciseValidator>;

export const workoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  createdAt: z
    .string()
    .transform(data => new Date(data))
    .or(z.date())
    .optional(),
  entries: entryValidator
    .extend({
      name: z.string(),
      type: z.enum(["weight", "cardio"])
    })
    .array()
});

export type WorkoutValidator = z.infer<typeof workoutValidator>;

export const profileValidator = z.object({
  name: z
    .string()
    .optional()
    .transform(data => {
      if (data?.length === 0) {
        return undefined;
      }
      return data;
    }),
  email: z
    .string()
    .optional()
    .transform(data => {
      if (data?.length === 0) {
        return undefined;
      }
      return data;
    }),
  image: z
    .string()
    .optional()
    .transform(data => {
      if (data?.length === 0) {
        return undefined;
      }
      return data;
    })
});

export type ProfileValidator = z.infer<typeof profileValidator>;
