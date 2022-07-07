import Link from "next/link";
import Loader from "@/components/loader";
import Header from "@/components/header";
import DateBar from "@/components/date-bar";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useWorkoutById } from "@/hooks/queries/use-workout-by-id";
import { useSumWorkout } from "@/hooks/queries/use-sum-workout";
import { useDateFilter } from "@/hooks/use-date-filter";

const WorkoutPage = () => {
  const { data: session, status } = useSession();
  const { query } = useRouter();
  const { data: workout, isLoading } = useWorkoutById(query.id as string);
  const { data: sum } = useSumWorkout(workout?.id);

  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const filteredData = useDateFilter(date, workout);

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") signIn();
  if (status === "authenticated" && isLoading) return <Loader />;

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='space-y-1'>
              <h1 className='text-lg font-bold sm:text-2xl'>{workout?.name}</h1>
              <p>Last Updated: {workout?.updatedAt.toLocaleDateString()}</p>
            </div>
            <Link
              className='underline font-semibold hover:text-orange-600'
              href={`/workout/${workout?.id}/edit`}
            >
              Edit
            </Link>
          </div>

          <section className='flex flex-col gap-4 sm:flex-row'>
            {sum?.weight && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Total Weight Lifted</h2>
                <p className='text-xl font-bold'>{sum.weight}kg</p>
              </div>
            )}
            {sum?.distance && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Total Distance Travelled</h2>
                <p className='text-xl font-bold'>{sum.distance}m</p>
              </div>
            )}
          </section>

          <h2 className='text-lg font-bold sm:text-xl'>Entries</h2>

          <DateBar date={date} setDate={setDate} />

          <section className='space-y-4'>
            {filteredData && filteredData?.length <= 0 && (
              <p className='p-4 bg-zinc-900 rounded-md'>
                No entries found with this date.
              </p>
            )}

            {filteredData?.map(entry => (
              <article
                key={entry.id}
                className='p-4 space-y-2 rounded-md bg-zinc-900'
              >
                <div className='flex flex-wrap gap-2 items-center justify-between'>
                  <p className='text-xl font-semibold'>
                    {entry.createdAt.toLocaleDateString()}
                  </p>
                  <Link
                    href='#'
                    className='underline font-semibold hover:text-orange-600'
                  >
                    Edit
                  </Link>
                </div>

                {entry.exercise && (
                  <p>
                    <strong>Exercise:</strong> {entry.exercise.name}
                  </p>
                )}

                <ul>
                  {entry.sets.map(set => (
                    <li key={set.id}>
                      {set.weight && `${set.weight}kg - ${set.reps} reps`}
                      {set.distance &&
                        `${set.distance}m ${
                          set.elevation ? `- ${set.elevation} ft` : ""
                        }`}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </main>
      </>
    );
  }
};

export default WorkoutPage;
