import Link from "next/link";
import { useTotalSets } from "@/hooks/use-total-sets";
import { InferQueryOutput, trpc } from "@/utils/trpc";

export default function WorkoutCard({
  workout
}: {
  workout: InferQueryOutput<"workout.get-all">[0];
}) {
  const { data, isLoading } = trpc.useQuery([
    "workout.sum",
    { id: workout.id }
  ]);

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
