import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const deleteExercise = (input: IdInput) =>
  prisma.exercise.delete({
    where: { id: input.id }
  });

export type DeleteExercise = Prisma.PromiseReturnType<typeof deleteExercise>;
