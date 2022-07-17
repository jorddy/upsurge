import { useEffect, useState } from "react";
import { InferQueryOutput } from "@/utils/trpc";

export const useTotalSets = (
  workout: InferQueryOutput<"workout.get-all">[0]
) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (workout?.entries) {
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
