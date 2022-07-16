import { useEffect, useState } from "react";
import type { InferQueryOutput } from "@/utils/trpc";

export const useSearch = (
  query: string,
  data:
    | InferQueryOutput<"workout.get-all">
    | InferQueryOutput<"exercise.get-all">
    | undefined
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
