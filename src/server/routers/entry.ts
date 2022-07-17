import { createProtectedRouter } from "../context";
import { z } from "zod";
import { entryValidator } from "@/utils/validators";

export const entryRouter = createProtectedRouter()
  .query("get-by-id", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.findUnique({
        where: { id: input.id },
        include: { exercise: true, sets: true }
      })
  })
  .mutation("create", {
    input: entryValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.create({
        data: {
          notes: input.notes,
          exercise: { connect: { id: input.exerciseId } },
          sets: {
            createMany: { data: input.sets }
          }
        }
      })
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.delete({
        where: { id: input.id }
      })
  });
