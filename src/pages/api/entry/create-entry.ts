import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import {
  CreateEntryInput,
  createEntryValidator
} from "@/hooks/mutations/validators";

const createEntry = (input: CreateEntryInput) =>
  prisma.entry.create({
    data: {
      exercise: { connect: { id: input.exerciseId } },
      sets: {
        createMany: { data: input.sets }
      }
    }
  });

export type CreateEntry = Prisma.PromiseReturnType<typeof createEntry>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const input = createEntryValidator.parse(req.body);
    const entry = await createEntry(input);

    res.status(200).json(entry);
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error.flatten());
  }
}
