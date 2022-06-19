import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { workoutValidator, WorkoutValidator } from "@/shared/workout-validator";
import { getSession } from "next-auth/react";

const updateWorkout = (input: WorkoutValidator) =>
  prisma.workout.update({
    // TODO
  });

export type UpdateWorkout = Awaited<ReturnType<typeof updateWorkout>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const input = workoutValidator.parse(JSON.parse(req.body));
      const data = updateWorkout(input);

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
};

export default handler;
