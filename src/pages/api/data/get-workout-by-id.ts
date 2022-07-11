import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/utils/authorize";
import { idValidator } from "@/hooks/mutations/validators";
import { prisma } from "@/utils/db";
import { zodError } from "@/utils/zod-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const { id } = idValidator.parse(req.query);

    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        entries: {
          include: { exercise: true, sets: true }
        }
      }
    });

    res.status(200).json(workout);
  } catch (error) {
    zodError(error, res);
  }
}
