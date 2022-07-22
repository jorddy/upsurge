import Link from "next/link";
import { InferQueryOutput } from "@/utils/trpc";
import { useProfileStore } from "@/utils/profile";

type Props = {
  exercise: InferQueryOutput<"exercise.get-by-id">;
  linkOff?: boolean;
};

export default function ExerciseCard({ exercise, linkOff }: Props) {
  const { weightUnit, convertKilosToPounds } = useProfileStore();

  if (!exercise) {
    return null;
  }

  return (
    <Link
      href={linkOff ? "" : `exercise/${exercise.id}`}
      className={`block px-5 py-4 space-y-2 bg-zinc-900 rounded-md border border-zinc-500`}
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
              {weightUnit === "kg" && `${exercise.currentWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.currentWeight)} lbs`}
            </p>
            <p>
              <strong className='font-medium'>Target Weight:</strong>{" "}
              {weightUnit === "kg" && `${exercise.targetWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.targetWeight)} lbs`}
            </p>
          </div>
        )}

        {exercise.currentDistance && exercise.targetDistance && (
          <div>
            <p>
              <strong className='font-medium'>Current Distance:</strong>{" "}
              {exercise.currentDistance} miles
            </p>
            <p>
              <strong className='font-medium'>Target Distance:</strong>{" "}
              {exercise.targetDistance} miles
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
