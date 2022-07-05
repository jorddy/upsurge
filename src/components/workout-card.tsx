import Link from "next/link";
import { FC } from "react";
import { WorkoutType } from "@/hooks/queries/validators";
import { useSumWorkout } from "@/hooks/queries/use-sum-workout";

const WorkoutCard: FC<{ workout: WorkoutType }> = ({ workout }) => {
  const type = workout.entries[0].sets[0].weight ? "weight" : "distance";
  const { data, isLoading } = useSumWorkout(type, workout.id);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-zinc-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{workout.name}</h2>

      <div>
        <p>
          <strong>Sets:</strong> {workout.entries[0].sets.length}
        </p>

        {isLoading && type === "weight" && <p>Summing weights...</p>}
        {isLoading && type === "distance" && <p>Summing distance...</p>}

        {data && type === "weight" && (
          <p>
            <strong>Total Weight Lifted:</strong> {data}kg
          </p>
        )}

        {data && type === "distance" && (
          <p>
            <strong>Total Distance Travelled:</strong> {data}m
          </p>
        )}
      </div>
    </Link>
  );
};

export default WorkoutCard;
