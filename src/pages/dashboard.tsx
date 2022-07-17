import Link from "next/link";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Tabs from "@/components/tabs";
import WorkoutCard from "@/components/workout-card";
import { authorize } from "@/utils/authorize";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

export { authorize as getServerSideProps };

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["workout.get-latest"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <section className='flex flex-wrap justify-between items-center gap-4'>
          <div className='space-y-1'>
            <h1 className='text-lg font-bold sm:text-2xl'>
              Welcome back, {session?.user.name}
            </h1>
            <p className='mb-4'>Your recent workout summary</p>
          </div>

          <Link className='button-create' href='/entry/create'>
            + Log entry
          </Link>
        </section>

        <h2 className='text-lg font-bold sm:text-xl'>Recent</h2>

        <section className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
          {data?.length === 0 && (
            <p className='p-4 bg-zinc-900 rounded-md border border-zinc-500'>
              No recent workouts found.
            </p>
          )}

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
