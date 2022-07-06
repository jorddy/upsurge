import { useEffect, useState } from "react";
import { WorkoutByIdType } from "./queries/validators";

export const useDateFilter = (
  selectedDate: string,
  data: WorkoutByIdType | undefined
) => {
  const [filteredData, setFilteredData] = useState(data?.entries);

  // useEffect(() => {
  //   setFilteredData(
  //     data?.entries.filter(entry => entry.createdAt === new Date(selectedDate))
  //   );
  // }, [data, selectedDate]);

  return filteredData;
};
