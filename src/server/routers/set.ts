import { z } from "zod";
import { createProtectedRouter } from "../context";

export const setRouter = createProtectedRouter().mutation("delete", {
  input: z.object({
    id: z.string()
  }),
  resolve: ({ input, ctx }) =>
    ctx.prisma.set.delete({
      where: { id: input.id }
    })
});
