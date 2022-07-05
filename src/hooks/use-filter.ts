import { useEffect, useState } from "react";
import { ExerciseType, WorkoutType } from "./queries/validators";

export const useFilter = (
  filter: string,
  data: WorkoutType[] | ExerciseType[] | undefined
) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data?.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  return filteredData;
};
