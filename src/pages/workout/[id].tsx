import Link from "next/link";
import Loader from "@/components/loader";
import Header from "@/components/header";
import DateBar from "@/components/date-bar";
import EntryCard from "@/components/entry-card";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useWorkoutById } from "@/hooks/queries/use-workout-by-id";
import { useSumWorkout } from "@/hooks/queries/use-sum-workout";
import { useDateFilter } from "@/hooks/use-date-filter";
import { Entry, Exercise, Set } from "@prisma/client";
import { HiX } from "react-icons/hi";
import { useQueryClient } from "react-query";
import { useDeleteWorkout } from "@/hooks/mutations/use-delete-workout";

export default function WorkoutPage() {
  const { query, push } = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const { data: workout, isLoading } = useWorkoutById(query.id as string);
  const { mutate, isLoading: isDeleting } = useDeleteWorkout(queryClient);
  const { data: total } = useSumWorkout(workout?.id);

  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const filteredData = useDateFilter(date, workout) as (Entry & {
    sets: Set[];
    exercise: Exercise;
  })[];

  const handleDelete = () => {
    if (workout) {
      mutate(
        { id: workout.id },
        {
          onSuccess: () => push("/dashboard")
        }
      );
    }
  };

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
              <p>
                Last Updated:{" "}
                {new Date(workout?.updatedAt as Date).toLocaleDateString()}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Link
                className='bg-zinc-700 px-3 py-2 rounded-sm hover:bg-zinc-600'
                href={`/workout/${workout?.id}/edit`}
              >
                Edit
              </Link>

              <button
                className='button-remove'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <HiX className='h-5 w-5' />
                <p>Delete</p>
              </button>
            </div>
          </div>

          <section className='flex flex-col gap-4 sm:flex-row'>
            {total?._sum.weight && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Total Weight Lifted</h2>
                <p className='text-xl font-bold'>{total._sum.weight}kg</p>
              </div>
            )}

            {total?._sum.distance && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Total Distance Travelled</h2>
                <p className='text-xl font-bold'>{total._sum.distance}m</p>
              </div>
            )}
          </section>

          <h2 className='text-lg font-bold sm:text-xl'>Entries</h2>

          <DateBar date={date} setDate={setDate} />

          <section className='space-y-4'>
            {filteredData && filteredData?.entries.length <= 0 && (
              <p className='p-4 bg-zinc-900 rounded-md'>
                No entries found with this date.
              </p>
            )}

            {workout &&
              filteredData?.map(entry => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  page='workout'
                  pageId={workout.id}
                />
              ))}
          </section>
        </main>
      </>
    );
  }
}
