import { useEffect, useState } from "react";
import { ExerciseType, WorkoutType } from "./queries/validators";

export const useDateFilter = (
  date: Date,
  data: WorkoutType | ExerciseType | undefined
) => {
  const [filteredData, setFilteredData] = useState(data?.entries);

  useEffect(() => {
    setFilteredData(
      data?.entries?.filter(
        entry =>
          entry.createdAt.toLocaleDateString() === date.toLocaleDateString()
      )
    );
  }, [data, date]);

  return filteredData;
};
