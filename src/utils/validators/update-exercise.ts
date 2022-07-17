import { z } from "zod";

export const updateExerciseValidator = z.object({
  exerciseId: z.string(),
  name: z
    .string()
    .transform(data => {
      if (data?.length === 0) {
        return undefined;
      }
      return data;
    })
    .optional(),
  currentWeight: z
    .string()
    .transform(data => {
      if (data?.length === 0) {
        return Number(data);
      }
      return Number(data);
    })
    .or(z.number())
    .optional(),
  targetWeight: z
    .string()
    .transform(data => {
      if (data?.length === 0) {
        return Number(data);
      }
      return Number(data);
    })
    .or(z.number())
    .optional(),
  currentDistance: z
    .string()
    .transform(data => {
      if (data?.length === 0) {
        return Number(data);
      }
      return Number(data);
    })
    .or(z.number())
    .optional(),
  targetDistance: z
    .string()
    .transform(data => {
      if (data?.length === 0) {
        return Number(data);
      }
      return Number(data);
    })
    .or(z.number())
    .optional()
});

export type UpdateExerciseValidator = z.infer<typeof updateExerciseValidator>;
