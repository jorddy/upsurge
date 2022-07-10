import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const deleteWorkout = (input: IdInput) =>
  prisma.workout.delete({
    where: { id: input.id }
  });

export type DeleteWorkout = Prisma.PromiseReturnType<typeof deleteWorkout>;
