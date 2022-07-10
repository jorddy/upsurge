import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export const getExercises = (userId: string) =>
  prisma.exercise.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      entries: {
        include: { sets: true }
      }
    }
  });

export type Exercises = Prisma.PromiseReturnType<typeof getExercises>;
