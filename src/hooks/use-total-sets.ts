import { useEffect, useState } from "react";
import { WorkoutType } from "./queries/validators";

export const useTotalSets = (workout: WorkoutType) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (workout.entries) {
      setTotal(
        workout.entries.reduce((current, entry) => {
          if (entry._count) {
            return entry._count?.sets + current;
          }

          return current;
        }, 0)
      );
    }
  }, [workout]);

  return total;
};
