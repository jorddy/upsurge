import { useEffect, useState } from "react";
import { EntryType } from "./queries/validators";

export const useTotalSets = (entries: EntryType[]) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    entries.forEach(entry => setTotal(total => (total += entry.sets.length)));
  }, [entries]);

  return total;
};
