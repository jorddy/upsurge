import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { IdInput } from "@/shared/id-validator";

export const deleteEntry = (input: IdInput) =>
  prisma.entry.delete({
    where: { id: input.id }
  });

export type DeleteEntry = Prisma.PromiseReturnType<typeof deleteEntry>;
