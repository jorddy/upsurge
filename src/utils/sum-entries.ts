import { EntryType } from "@/hooks/queries/validators";

export const sumEntries = (entries: EntryType[]) => {
  let sum = 0;

  entries.forEach(entry => {
    entry.sets.forEach(set => {
      if (set.weight) sum += set.weight;
      else if (set.distance) sum += set.distance;
    });
  });

  return sum;
};
