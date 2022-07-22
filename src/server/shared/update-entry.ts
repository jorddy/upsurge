import { z } from "zod";

export const updateEntryValidator = z.object({
  entryId: z.string(),
  createdAt: z
    .string()
    .transform(data => {
      if (data.length === 0) {
        return undefined;
      }
      return new Date(data);
    })
    .or(z.date())
    .optional(),
  notes: z
    .string()
    .transform(data => {
      if (data.length === 0) {
        return undefined;
      }
      return data;
    })
    .optional(),
  sets: z
    .object({
      where: z.object({ id: z.string() }),
      data: z.object({
        id: z.string(),
        reps: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .nullish(),
        weight: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .nullish(),
        distance: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .nullish(),
        elevation: z
          .string()
          .transform(data => {
            if (data.length === 0) {
              return undefined;
            }
            return Number(data);
          })
          .or(z.number())
          .nullish()
      })
    })
    .array()
});

export type UpdateEntryValidator = z.infer<typeof updateEntryValidator>;
