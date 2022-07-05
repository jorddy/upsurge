import Header from "@/components/header";
import Loader from "@/components/loader";
import Tabs from "@/components/tabs";
import WorkoutCard from "@/components/workout-card";
import { signIn, useSession } from "next-auth/react";
import { useGetLatestWorkouts } from "@/hooks/queries/use-get-latest-workouts";
import Link from "next/link";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const { data, isLoading } = useGetLatestWorkouts();

  if (status === "loading" || isLoading) return <Loader />;

  if (status === "unauthenticated") signIn();

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <section>
            <div className='flex flex-wrap gap-2 items-center justify-between'>
              <h1 className='text-lg font-bold sm:text-2xl'>
                Welcome back, {session.user.name}
              </h1>
              <Link
                href='/create'
                className='text-sm font-semibold underline hover:text-orange-600'
              >
                + New Log
              </Link>
            </div>

            <p className='mt-1 mb-4'>Your recent workout summary</p>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
              {data?.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </section>

          <h2 className='text-lg font-bold sm:text-xl'>Explore</h2>

          <Tabs />
        </main>
      </>
    );
  }
};

export default Dashboard;
