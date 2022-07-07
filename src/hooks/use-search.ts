import { useEffect, useState } from "react";
import { ExerciseType, WorkoutType } from "./queries/validators";

export const useSearch = (
  query: string,
  data: WorkoutType[] | ExerciseType[] | undefined
) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data?.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [data, query]);

  return filteredData;
};
