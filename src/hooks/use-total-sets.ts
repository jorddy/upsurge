import { useEffect, useState } from "react";
import { Workouts } from "@/server/data/get-workouts";

export const useTotalSets = (workout: Workouts[0]) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(workout.entries.reduce((a, entry) => entry._count.sets + a, 0));
  }, [workout]);

  return total;
};
