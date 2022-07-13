import { createProtectedRouter } from "../context";
import { z } from "zod";
import { entryValidator } from "@/utils/validators";

export const entryRouter = createProtectedRouter()
  .mutation("create", {
    input: entryValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.entry.create({
        data: {
          notes: input.notes,
          exercise: { connect: { id: input.exerciseId } },
          sets: {
            createMany: { data: input.sets }
          }
        }
      });
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.entry.delete({
        where: { id: input.id }
      });
    }
  });
