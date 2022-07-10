import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export const getLatestWorkouts = (userId: string) =>
  prisma.workout.findMany({
    take: 2,
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

export type LatestWorkouts = Prisma.PromiseReturnType<typeof getLatestWorkouts>;
