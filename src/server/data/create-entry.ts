import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { CreateEntryInput } from "@/shared/create-entry-validator";

export const createEntry = (input: CreateEntryInput) =>
  prisma.entry.create({
    data: {
      notes: input.notes,
      exercise: { connect: { id: input.exerciseId } },
      sets: {
        createMany: { data: input.sets }
      }
    }
  });

export type CreateEntry = Prisma.PromiseReturnType<typeof createEntry>;
