import { z } from "zod";

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
