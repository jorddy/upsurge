import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/server/authorize";
import { getLatestWorkouts } from "@/server/data/get-latest-workouts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const workouts = await getLatestWorkouts(session.user.id);
      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
