import { useEffect, useState } from "react";
import { Workouts } from "@/server/data/get-workouts";
import { Exercises } from "@/server/data/get-exercises";

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
