import Link from "next/link";
import { InferQueryOutput } from "@/utils/trpc";
import { useProfileStore } from "@/utils/stores";
import { convertKgToLbs } from "@/utils/kg-to-lbs";

interface Props {
  exercise: InferQueryOutput<"exercise.get-all">[0];
  linkOff?: boolean;
}

export default function ExerciseCard({ exercise, linkOff }: Props) {
  const { weightUnit } = useProfileStore();

  return (
    <Link
      href={linkOff ? "" : `exercise/${exercise.id}`}
      className={`block p-4 space-y-2 bg-zinc-900 rounded-md border border-zinc-500`}
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
                `${convertKgToLbs(exercise.currentWeight)} lbs`}
            </p>
            <p>
              <strong className='font-medium'>Target Weight:</strong>{" "}
              {weightUnit === "kg" && `${exercise.targetWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKgToLbs(exercise.targetWeight)} lbs`}
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
