import Link from "next/link";
import { FC } from "react";
import { ExerciseType } from "@/hooks/queries/validators";

const ExerciseCard: FC<{ exercise: ExerciseType }> = ({ exercise }) => {
  return (
    <Link
      href={`exercise/${exercise.id}`}
      className='block p-4 space-y-2 bg-zinc-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{exercise.name}</h2>

      <div>
        <p>
          <strong>Sets:</strong> 0
        </p>

        {exercise.currentWeight && exercise.targetWeight && (
          <>
            <p>
              <strong>Current Weight:</strong> {exercise.currentWeight}kg
            </p>
            <p>
              <strong>Target Weight:</strong> {exercise.targetWeight}kg
            </p>
          </>
        )}

        {exercise.currentDistance && exercise.targetDistance && (
          <>
            <p>
              <strong>Current Distance:</strong> {exercise.currentDistance}m
            </p>
            <p>
              <strong>Target Distance:</strong> {exercise.targetDistance}kg
            </p>
          </>
        )}
      </div>
    </Link>
  );
};

export default ExerciseCard;
