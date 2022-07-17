import { createProtectedRouter } from "../context";
import { z } from "zod";
import { exerciseValidator } from "@/utils/validators/exercise";

export const exerciseRouter = createProtectedRouter()
  .query("get-all", {
    resolve: ({ ctx }) =>
      ctx.prisma.exercise.findMany({
        where: { userId: ctx.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          entries: {
            include: { sets: true }
          }
        }
      })
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.exercise.findUnique({
        where: { id: input.id },
        include: {
          entries: {
            include: { sets: true }
          }
        }
      })
  })
  .mutation("create", {
    input: exerciseValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.exercise.create({
        data: {
          ...input,
          user: { connect: { id: ctx.user.id } }
        }
      })
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.exercise.delete({
        where: { id: input.id }
      })
  });
