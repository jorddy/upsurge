import { useEffect, useState } from "react";
import { ExerciseType, WorkoutByIdType } from "./queries/validators";

export const useDateFilter = (
  date: string | undefined,
  data: WorkoutByIdType | ExerciseType | undefined
) => {
  const [filteredData, setFilteredData] = useState(data?.entries);

  useEffect(() => {
    if (date) {
      setFilteredData(
        data?.entries.filter(entry => entry.createdAt >= new Date(date))
      );
    }
  }, [data, date]);

  return filteredData;
};
