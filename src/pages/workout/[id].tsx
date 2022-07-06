import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useWorkoutById } from "@/hooks/queries/use-workout-by-id";
import Header from "@/components/header";
import Link from "next/link";

const WorkoutPage = () => {
  const { data: session, status } = useSession();
  const { query } = useRouter();
  const { data, isLoading } = useWorkoutById(query.id as string);
  // const { data, isLoading } = useSumWorkout(type, workout.id);

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") signIn();

  if (status === "authenticated" && isLoading) return <Loader />;

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <h1 className='text-lg font-bold sm:text-2xl'>{data?.name}</h1>
            <Link
              className='underline font-semibold'
              href={`/workout/${data?.id}/edit`}
            >
              Edit
            </Link>
          </div>

          <section className='flex flex-wrap gap-2'>
            <div className='p-4 rounded-md bg-orange-600 text-white'></div>
          </section>

          <section>
            {data?.entries.map(entry => (
              <Link
                key={entry.id}
                href={`/workout/${data.id}/entry/${entry.id}`}
              >
                <p>{entry.createdAt.toLocaleDateString()}</p>
              </Link>
            ))}
          </section>
        </main>
      </>
    );
  }
};

export default WorkoutPage;
