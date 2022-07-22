import Link from "next/link";
import { useEffect, useState } from "react";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { useProfileStore } from "@/utils/profile";
import { LazyMotion, m, domAnimation } from "framer-motion";

const useTotalSets = (workout: InferQueryOutput<"workout.get-all">[0]) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (workout?.entries) {
      setTotal(
        workout.entries.reduce((current, entry) => {
          if (entry._count) {
            return entry._count?.sets + current;
          }

          return current;
        }, 0)
      );
    }
  }, [workout]);

  return total;
};

type Props = {
  workout: InferQueryOutput<"workout.get-all">[0];
};

export default function WorkoutCard({ workout }: Props) {
  const { weightUnit, convertKilosToPounds } = useProfileStore();

  const { data, isLoading } = trpc.useQuery([
    "workout.sum",
    { id: workout.id }
  ]);

  const totalSets = useTotalSets(workout);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={`/workout/${workout.id}`}
          className='block px-5 py-4 space-y-2 bg-zinc-900 border border-zinc-500 rounded-md'
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
                    `${convertKilosToPounds(data?._sum.weight)} lbs`}
                </p>
              )}

              {data?._sum?.distance && (
                <p>
                  <strong className='font-medium'>
                    Total Distance Travelled:
                  </strong>{" "}
                  {data?._sum.distance}kg
                </p>
              )}
            </div>
          </div>
        </Link>
      </m.div>
    </LazyMotion>
  );
}
