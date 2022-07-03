import { FC } from "react";
import Link from "next/link";
import { WorkoutType } from "@/hooks/queries/validators";

const WorkoutCard: FC<{ workout: WorkoutType }> = ({ workout }) => {
  const totalWeight = workout.exercise.reduce(
    (prev, curr) => curr.currentWeight + prev,
    0
  );

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-slate-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{workout.name}</h2>

      <div>
        <p>
          <strong>Exercises:</strong> {workout.exercise.length}
        </p>
        <p>
          <strong>Total Weight Lifted:</strong> {totalWeight}kg
        </p>
      </div>
    </Link>
  );
};

export default WorkoutCard;
