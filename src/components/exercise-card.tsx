import Link from "next/link";
import { ExerciseType } from "@/hooks/queries/validators";

export default function ExerciseCard({
  exercise,
  linkOff
}: {
  exercise: ExerciseType;
  linkOff?: boolean;
}) {
  return (
    <Link
      href={linkOff ? "" : `exercise/${exercise.id}`}
      className={`block p-4 space-y-2 bg-zinc-900 rounded-md`}
    >
      <h2 className='text-lg font-bold'>{exercise.name}</h2>

      <div>
        <p>
          <strong className='font-medium'>Entries:</strong>{" "}
          {exercise.entries?.length}
        </p>

        {exercise.currentWeight && exercise.targetWeight && (
          <div>
            <p>
              <strong className='font-medium'>Current Weight:</strong>{" "}
              {exercise.currentWeight}kg
            </p>
            <p>
              <strong className='font-medium'>Target Weight:</strong>{" "}
              {exercise.targetWeight}kg
            </p>
          </div>
        )}

        {exercise.currentDistance && exercise.targetDistance && (
          <div>
            <p>
              <strong className='font-medium'>Current Distance:</strong>{" "}
              {exercise.currentDistance}m
            </p>
            <p>
              <strong className='font-medium'>Target Distance:</strong>{" "}
              {exercise.targetDistance}kg
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
