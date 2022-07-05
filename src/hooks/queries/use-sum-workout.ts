import { useQuery } from "react-query";
import { z } from "zod";
import { SumEntryTypeEnum } from "./validators";

export const useSumWorkout = (type: SumEntryTypeEnum, workoutId: string) =>
  useQuery(
    ["sum-workout", workoutId],
    async () => {
      const res = await (
        await fetch(
          `/api/workout/sum-workout?type=${type}&workoutId=${workoutId}`
        )
      ).json();

      return z.number().parse(res);
    },
    {
      enabled: !!workoutId
    }
  );
