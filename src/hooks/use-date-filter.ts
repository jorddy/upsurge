import { useEffect, useState } from "react";
import { WorkoutById } from "@/pages/api/workout/get-workout-by-id";
import { Exercises } from "@/pages/api/exercise/get-exercises";

export const useDateFilter = (
  date: string | undefined,
  data: WorkoutById | Exercises[0] | undefined
) => {
  const [filteredData, setFilteredData] = useState(data?.entries);

  useEffect(() => {
    if (date) {
      setFilteredData(
        data?.entries.filter(entry => entry.createdAt.toString().includes(date))
      );
    }
  }, [data, date]);

  return filteredData;
};
