import { createProtectedRouter } from "../context";
import { z } from "zod";
import { exerciseValidator } from "@/server/shared/exercise";
import { updateExerciseValidator } from "@/server/shared/update-exercise";

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
            include: { exercise: true, sets: true }
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
  })
  .mutation("update", {
    input: updateExerciseValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.exercise.update({
        where: { id: input.exerciseId },
        data: {
          name: input.name,
          currentWeight: input.currentWeight,
          targetWeight: input.targetWeight,
          currentDistance: input.currentDistance,
          targetDistance: input.targetDistance
        }
      })
  });
