import { z } from "zod";

export const updateEntryValidator = z.object({
  entryId: z.string(),
  createdAt: z
    .string()
    .transform(data => {
      if (data.length) {
        return undefined;
      }
      return new Date(data);
    })
    .or(z.date())
    .optional(),
  notes: z.string().optional(),
  sets: z
    .object({
      where: z.object({ id: z.string() }),
      data: z.object({
        reps: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .optional(),
        weight: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .optional(),
        distance: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .optional(),
        elevation: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .optional()
      })
    })
    .array()
});

export type UpdateEntryValidator = z.infer<typeof updateEntryValidator>;
