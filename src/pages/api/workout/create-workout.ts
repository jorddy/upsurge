import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { workoutValidator, WorkoutValidator } from "@/shared/workout-validator";
import { getSession } from "next-auth/react";

const createWorkout = (input: WorkoutValidator, userId: string) =>
  prisma.workout.create({
    data: {
      ...input,
      user: {
       connect: {id: }
      }
    }
  });

export type CreateWorkout = Awaited<ReturnType<typeof createWorkout>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});

  if (session) {
    try {
      const input = workoutValidator.parse(JSON.parse(req.body));
      const data = createWorkout(input, session.user?.id);
  
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error);
    }
  }
};

export default handler;
