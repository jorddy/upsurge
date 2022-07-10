import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { CreateExerciseInput } from "@/shared/create-exercise-validator";

export const createExercise = (input: CreateExerciseInput, id: string) =>
  prisma.exercise.create({
    data: {
      ...input,
      user: { connect: { id } }
    }
  });

export type CreateExercise = Prisma.PromiseReturnType<typeof createExercise>;
