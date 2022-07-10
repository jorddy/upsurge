import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const getWorkoutById = (input: IdInput) =>
  prisma.workout.findUnique({
    where: { id: input.id },
    include: {
      entries: {
        include: { exercise: true, sets: true }
      }
    }
  });

export type WorkoutById = Prisma.PromiseReturnType<typeof getWorkoutById>;
