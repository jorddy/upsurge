import { useEffect, useState } from "react";
import { Workouts } from "@/pages/api/workout/get-workouts";
import { Exercises } from "@/pages/api/exercise/get-exercises";

export const useSearch = (
  query: string,
  data: Workouts | Exercises | undefined
) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (data) {
      setFilteredData(
        [...(data as any)].filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [data, query]);

  return filteredData;
};
