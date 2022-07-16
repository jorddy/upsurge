import Link from "next/link";
import { useTotalSets } from "@/utils/use-total-sets";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { useProfileStore } from "@/utils/profile-store";
import { convertKgToLbs } from "@/utils/kg-to-lbs";

export default function WorkoutCard({
  workout
}: {
  workout: InferQueryOutput<"workout.get-all">[0];
}) {
  const { weightUnit } = useProfileStore();

  const { data, isLoading } = trpc.useQuery([
    "workout.sum",
    { id: workout.id }
  ]);

  const totalSets = useTotalSets(workout);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className='block p-4 space-y-2 bg-zinc-900 border border-zinc-500 rounded-md'
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
              {weightUnit === "kg" && `${data?._sum.weight} kg`}
              {weightUnit === "lbs" &&
                `${convertKgToLbs(data?._sum.weight)} lbs`}
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
