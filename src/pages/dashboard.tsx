import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGetLatestWorkouts } from "@/hooks/queries/use-get-latest-workouts";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Tabs from "@/components/tabs";

const Dashboard = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useGetLatestWorkouts();

  useEffect(() => {
    if (!session) push("/");
  }, [push, session]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <section className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Recent</h2>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {data?.map(workout => (
              <p key={workout.id}>{workout.name}</p>
            ))}
          </div>
        </section>

        <Tabs />
      </main>
    </>
  );
};

export default Dashboard;
