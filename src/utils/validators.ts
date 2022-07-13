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
