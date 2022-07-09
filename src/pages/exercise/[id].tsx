import Link from "next/link";
import Loader from "@/components/loader";
import Header from "@/components/header";
import DateBar from "@/components/date-bar";
import EntryCard from "@/components/entry-card";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { HiX } from "react-icons/hi";
import { useQueryClient } from "react-query";
import { useExerciseById } from "@/hooks/queries/use-exercise-by-id";
import { useDateFilter } from "@/hooks/use-date-filter";
import { useDeleteExercise } from "@/hooks/mutations/use-delete-exercise";

export default function ExercisePage() {
  const { query, push } = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const { data: exercise, isLoading } = useExerciseById(query.id as string);
  const { mutate, isLoading: isDeleting } = useDeleteExercise(queryClient);

  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const filteredData = useDateFilter(date, exercise);

  const handleDelete = () => {
    if (exercise) {
      mutate(
        { id: exercise.id },
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
              <h1 className='text-lg font-bold sm:text-2xl'>
                {exercise?.name}
              </h1>

              <p>
                Last Updated:{" "}
                {new Date(exercise?.updatedAt as Date).toLocaleDateString()}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Link
                className='bg-zinc-700 px-3 py-2 rounded-sm hover:bg-zinc-600'
                href={`/exercise/${exercise?.id}/edit`}
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
            {exercise?.targetWeight && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Target Weight</h2>
                <p className='text-xl font-bold'>{exercise.targetWeight}kg</p>
              </div>
            )}

            {exercise?.currentWeight && (
              <div className='flex-1 px-4 py-3 rounded-md bg-zinc-900 sm:flex-initial'>
                <h2>Current Weight</h2>
                <p className='text-xl font-bold'>{exercise.currentWeight}kg</p>
              </div>
            )}

            {exercise?.targetDistance && (
              <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
                <h2>Target Distance</h2>
                <p className='text-xl font-bold'>{exercise.targetDistance}m</p>
              </div>
            )}

            {exercise?.currentDistance && (
              <div className='flex-1 px-4 py-3 rounded-md bg-zinc-900 sm:flex-initial'>
                <h2>Current Distance</h2>
                <p className='text-xl font-bold'>{exercise.currentDistance}m</p>
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

            {exercise &&
              filteredData?.map(entry => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  page='exercise'
                  pageId={exercise.id}
                />
              ))}
          </section>
        </main>
      </>
    );
  }
}
