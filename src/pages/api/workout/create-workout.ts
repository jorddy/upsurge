import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import { CreateWorkoutInput, createWorkoutValidator } from "@/utils/validators";

const createWorkout = async (input: CreateWorkoutInput, userId: string) =>
  prisma.workout.create({
    data: {
      name: input.name,
      createdAt: input.createdAt,
      user: { connect: { id: userId } },
      entries: {
        create: input.entries.map(entry => ({
          sets: {
            createMany: { data: entry.sets }
          },
          notes: entry.notes,
          exercise: { connect: { id: entry.exerciseId } }
        }))
      }
    }
  });

export type CreateWorkout = Prisma.PromiseReturnType<typeof createWorkout>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const input = createWorkoutValidator.parse(req.body);
    const entry = await createWorkout(input, session.user.id);

    res.status(200).json(entry);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      throw error;
    }
  }
}
