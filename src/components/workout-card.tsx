import Link from "next/link";
import { FC } from "react";
import { WorkoutType } from "@/hooks/queries/validators";

const WorkoutCard: FC<{ workout: WorkoutType }> = ({ workout }) => {
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

        {/* TODO: Clean up & figure our how to sum up the totals */}
        {workout.entries[0].sets[0].reps ||
          (workout.entries[0].sets[0].weight && (
            <p>{/* <strong>Total Weight Lifted:</strong> {totalWeight}kg */}</p>
          ))}

        {workout.entries[0].sets[0].distance ||
          (workout.entries[0].sets[0].elevation && (
            <p>
              {/* <strong>Total Distance Travelled:</strong> {totalDistance}m */}
            </p>
          ))}
      </div>
    </Link>
  );
};

export default WorkoutCard;
