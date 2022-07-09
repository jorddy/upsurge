import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { ZodError } from "zod";
import { byIdValidator } from "@/utils/validators";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";

const sumEntries = (workoutId: string) =>
  prisma.set.aggregate({
    _sum: { weight: true, distance: true },
    where: { entry: { workoutId } }
  });

export type SumEntries = Prisma.PromiseReturnType<typeof sumEntries>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);
  try {
    const { id } = byIdValidator.parse(req.query);
    res.status(200).json(await sumEntries(id));
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error.flatten());
  }
}
