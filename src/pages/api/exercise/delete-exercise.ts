import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import { idValidator } from "@/utils/validators";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const input = await idValidator.parse(req.body);
    await prisma.exercise.delete({
      where: { id: input.id }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      throw error;
    }
  }
}
