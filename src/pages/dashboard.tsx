import Link from "next/link";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Tabs from "@/components/tabs";
import WorkoutCard from "@/components/workout-card";
import { signIn, useSession } from "next-auth/react";
import { useLatestWorkouts } from "@/hooks/queries/use-latest-workouts";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useLatestWorkouts();

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") signIn();
  if (status === "authenticated" && isLoading) return <Loader />;

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <section className='flex flex-wrap justify-between items-center gap-4'>
            <div className='space-y-1'>
              <h1 className='text-lg font-bold sm:text-2xl'>
                Welcome back, {session.user.name}
              </h1>
              <p className='mb-4'>Your recent workout summary</p>
            </div>

            <Link className='button-create' href='/entry/create'>
              + Log entry
            </Link>
          </section>

          <section className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {data?.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </section>

          <h2 className='text-lg font-bold sm:text-xl'>Explore</h2>

          <Tabs />
        </main>
      </>
    );
  }
}
