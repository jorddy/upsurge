import { useEffect, useState } from "react";
import { WorkoutById } from "@/server/data/get-workout-by-id";
import { Exercises } from "@/server/data/get-exercises";

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
