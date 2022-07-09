import Link from "next/link";
import { Workouts } from "@/pages/api/workout/get-workouts";
import { useSumWorkout } from "@/hooks/queries/use-sum-workout";
import { useTotalSets } from "@/hooks/use-total-sets";

export default function WorkoutCard({ workout }: { workout: Workouts[0] }) {
  const { data, isLoading } = useSumWorkout(workout.id);
  const totalSets = useTotalSets(workout);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-zinc-900 rounded-md'
    >
      <h2 className='text-lg font-bold'>{workout.name}</h2>

      <div>
        <p>
          <strong className='font-medium'>Sets:</strong> {totalSets}
        </p>

        <div>
          {isLoading && <p>Summing totals...</p>}

          {data?._sum?.weight && (
            <p>
              <strong className='font-medium'>Total Weight Lifted:</strong>{" "}
              {data?._sum.weight}kg
            </p>
          )}

          {data?._sum?.distance && (
            <p>
              <strong className='font-medium'>Total Distance Travelled:</strong>{" "}
              {data?._sum.distance}kg
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
