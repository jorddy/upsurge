import Link from "next/link";
import { FC } from "react";
import { WorkoutType } from "@/hooks/queries/validators";
import { sumEntries } from "@/utils/sum-entries";

const WorkoutCard: FC<{ workout: WorkoutType }> = ({ workout }) => {
  const totalSum = sumEntries(workout.entries);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-slate-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{workout.name}</h2>

      <div>
        <p>
          <strong>Sets:</strong> {workout.entries[0].sets.length}
        </p>

        {workout.entries[0].sets[0].weight && (
          <p>
            <strong>Total Weight Lifted:</strong> {totalSum}kg
          </p>
        )}

        {workout.entries[0].sets[0].distance && (
          <p>
            <strong>Total Distance Travelled:</strong> {totalSum}m
          </p>
        )}
      </div>
    </Link>
  );
};

export default WorkoutCard;
