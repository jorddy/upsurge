import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export const getWorkouts = (userId: string) =>
  prisma.workout.findMany({
    orderBy: { updatedAt: "desc" },
    where: { userId },
    include: {
      entries: {
        include: {
          _count: { select: { sets: true } },
          sets: true
        }
      }
    }
  });

export type Workouts = Prisma.PromiseReturnType<typeof getWorkouts>;
