import Link from "next/link";
import dynamic from "next/dynamic";
import AppLayout from "@/components/layouts/app-layout";
import Loader from "@/components/ui/loader";
import WorkoutCard from "@/components/cards/workout-card";
import EmptyCard from "@/components/cards/empty-card";
import { authorize } from "@/utils/authorize";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

const LazyDashboardTabs = dynamic(
  () => import("@/components/ui/dashboard-tabs"),
  {
    ssr: false
  }
);

export { authorize as getServerSideProps };

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["workout.get-recent"]);
  const { isLoading: isLoadingWorkouts } = trpc.useQuery(["workout.get-all"]);
  const { isLoading: isLoadingExercises } = trpc.useQuery(["exercise.get-all"]);

  if (isLoading || isLoadingWorkouts || isLoadingExercises) return <Loader />;

  return (
    <AppLayout>
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
        {data?.length === 0 && <EmptyCard>No recent workouts found</EmptyCard>}

        {data?.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </section>

      <h2 className='text-lg font-bold sm:text-xl'>Explore</h2>

      <LazyDashboardTabs />
    </AppLayout>
  );
}
