import { FC } from "react";
import Link from "next/link";
import { ExerciseType } from "@/shared/exercise-validator";

const ExerciseCard: FC<{ exercise: ExerciseType }> = ({ exercise }) => {
  return (
    <Link
      href={`exercise/${exercise.id}`}
      className='block p-4 space-y-2 bg-slate-900 rounded-md'
    >
      <h2 className='text-xl font-semibold'>{exercise.name}</h2>

      <div>
        <p>
          <strong>Sets:</strong> 0
        </p>
        <p>
          <strong>Current Weight:</strong> {exercise.currentWeight}kg
        </p>
        <p>
          <strong>Target Weight:</strong> {exercise.targetWeight}kg
        </p>
      </div>
    </Link>
  );
};

export default ExerciseCard;
