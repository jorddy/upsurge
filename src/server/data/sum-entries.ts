import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const sumEntries = (input: IdInput) =>
  prisma.set.aggregate({
    _sum: { weight: true, distance: true },
    where: { entry: { workoutId: input.id } }
  });

export type SumEntries = Prisma.PromiseReturnType<typeof sumEntries>;
