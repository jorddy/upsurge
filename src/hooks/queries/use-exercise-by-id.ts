import { useQuery } from "react-query";
import { exerciseValidator } from "./validators";

export const useExerciseById = (id: string) =>
  useQuery(
    ["exercise-by-id", id],
    async () => {
      const res = await (
        await fetch(`/api/data/get-exercise-by-id?id=${id}`)
      ).json();

      return exerciseValidator.parse(res);
    },
    {
      enabled: !!id
    }
  );
