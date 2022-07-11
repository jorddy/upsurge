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
    const { id } = idValidator.parse(req.body);

    const workout = await prisma.workout.delete({
      where: { id }
    });

    res.status(200).json(workout);
  } catch (error) {
    zodError(error, res);
  }
}
