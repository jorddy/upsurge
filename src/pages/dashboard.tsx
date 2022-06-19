import Header from "@/components/header";
import { useSession } from "next-auth/react";
import { useGetWorkouts } from "@/hooks/queries/use-get-workouts";
import Loader from "@/components/loader";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useGetWorkouts();

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4'>
        {data?.map(workout => (
          <article key={workout.id}>
            <p>{workout.name}</p>
          </article>
        ))}
      </main>
    </>
  );
};

export default Dashboard;
