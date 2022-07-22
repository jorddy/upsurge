import { useEffect, useState } from "react";
import { InferQueryOutput } from "@/utils/trpc";

export const useDateFilter = (
  date: Date,
  data:
    | InferQueryOutput<"workout.get-by-id">
    | InferQueryOutput<"exercise.get-by-id">
    | undefined
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
