import { useEffect, useState } from "react";
import { Entry, Set } from "@prisma/client";

export const useTotalSets = (entries: (Entry & { sets: Set[] })[]) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    entries.forEach(entry => setTotal(total => (total += entry.sets.length)));
  }, [entries]);

  return total;
};
