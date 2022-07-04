import Header from "@/components/header";
import Loader from "@/components/loader";
import Tabs from "@/components/tabs";
import WorkoutCard from "@/components/workout-card";
import { useGetLatestWorkouts } from "@/hooks/queries/use-get-latest-workouts";

const Dashboard = () => {
  const { data, isLoading } = useGetLatestWorkouts();

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <section className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Recent</h2>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {data?.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </section>

        <Tabs />
      </main>
    </>
  );
};

export default Dashboard;
