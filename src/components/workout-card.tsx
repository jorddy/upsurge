import Link from "next/link";
import { FC, useState } from "react";
import { WorkoutType } from "@/hooks/queries/validators";
import { useSumWorkout } from "@/hooks/queries/use-sum-workout";
import { useTotalSets } from "@/hooks/use-total-sets";

const WorkoutCard: FC<{ workout: WorkoutType }> = ({ workout }) => {
  const { data, isLoading } = useSumWorkout(workout.id);
  const totalSets = useTotalSets(workout.entries);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-zinc-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{workout.name}</h2>

      <div>
        <p>
          <strong>Sets:</strong> {totalSets}
        </p>

        <div className='flex flex-wrap gap-2'>
          {isLoading && <p>Summing totals...</p>}
          {data?.weight && (
            <p>
              <strong>Total Weight Lifted:</strong> {data?.weight}kg
            </p>
          )}
          {data?.distance && (
            <p>
              <strong>Total Distance Travelled:</strong> {data?.distance}kg
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
