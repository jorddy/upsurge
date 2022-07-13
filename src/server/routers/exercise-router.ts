import { createProtectedRouter } from "../context";
import { z } from "zod";
import { exerciseValidator } from "@/utils/validators";

export const exerciseRouter = createProtectedRouter()
  .query("get-all", {
    async resolve({ ctx }) {
      return await ctx.prisma.exercise.findMany({
        where: { userId: ctx.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          entries: {
            include: { sets: true }
          }
        }
      });
    }
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.findUnique({
        where: { id: input.id },
        include: {
          entries: {
            include: { sets: true }
          }
        }
      });
    }
  })
  .mutation("create", {
    input: exerciseValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.create({
        data: {
          ...input,
          user: { connect: { id: ctx.user.id } }
        }
      });
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.delete({
        where: { id: input.id }
      });
    }
  });
