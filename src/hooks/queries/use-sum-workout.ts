import { useQuery } from "react-query";
import { z } from "zod";
import { SumEntryError, SumEntryTypeEnum } from "./validators";

export const useSumWorkout = (type: SumEntryTypeEnum, workoutId: string) =>
  useQuery<number, SumEntryError>(
    ["sum-workout", workoutId],
    async () => {
      const res = await fetch(
        `/api/workout/sum-workout?type=${type}&workoutId=${workoutId}`
      );

      if (!res.ok) throw await res.json();

      return z.number().parse(await res.json());
    },
    {
      enabled: !!workoutId
    }
  );
