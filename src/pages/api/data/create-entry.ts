import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/utils/authorize";
import { createEntryValidator } from "@/hooks/mutations/validators";
import { prisma } from "@/utils/db";
import { zodError } from "@/utils/zod-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const input = createEntryValidator.parse(req.body);

    const entry = await prisma.entry.create({
      data: {
        notes: input.notes,
        exercise: { connect: { id: input.exerciseId } },
        sets: {
          createMany: { data: input.sets }
        }
      }
    });

    res.status(200).json(entry);
  } catch (error) {
    zodError(error, res);
  }
}
