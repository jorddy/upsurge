import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const getExerciseById = (input: IdInput) =>
  prisma.exercise.findUnique({
    where: { id: input.id },
    include: {
      entries: {
        include: { sets: true }
      }
    }
  });

export type ExerciseById = Prisma.PromiseReturnType<typeof getExerciseById>;
