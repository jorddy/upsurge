import { createProtectedRouter } from "../context";
import { z } from "zod";
import { workoutValidator } from "@/utils/validators";

export const workoutRouter = createProtectedRouter()
  .query("get-all", {
    resolve: ({ ctx }) =>
      ctx.prisma.workout.findMany({
        where: { userId: ctx.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          entries: {
            include: {
              _count: { select: { sets: true } },
              sets: true
            }
          }
        }
      })
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.workout.findUnique({
        where: { id: input.id },
        include: {
          entries: {
            include: { exercise: true, sets: true }
          }
        }
      })
  })
  .query("get-latest", {
    resolve: ({ ctx }) =>
      ctx.prisma.workout.findMany({
        take: 2,
        where: { userId: ctx.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          entries: {
            include: {
              _count: { select: { sets: true } },
              sets: true
            }
          }
        }
      })
  })
  .mutation("create", {
    input: workoutValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.workout.create({
        data: {
          name: input.name,
          createdAt: input.createdAt,
          user: { connect: { id: ctx.user.id } },
          entries: {
            create: input.entries.map(entry => ({
              createdAt: input.createdAt,
              sets: {
                createMany: {
                  data: entry.sets.map(set => ({
                    ...set,
                    createdAt: input.createdAt
                  }))
                }
              },
              notes: entry.notes,
              exercise: { connect: { id: entry.exerciseId } }
            }))
          }
        }
      })
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.workout.delete({
        where: { id: input.id }
      })
  })
  .mutation("sum", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.set.aggregate({
        _sum: { weight: true, distance: true },
        where: { entry: { workoutId: input.id } }
      })
  });
