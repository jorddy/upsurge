import { useSession } from "next-auth/react";
import { useGetWorkouts } from "@/hooks/queries/use-get-workouts";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useGetWorkouts();

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4'>
        {data?.map(workout => (
          <Link key={workout.id} href={`/dashboard/${workout.id}`}>
            <a>
              <p>{workout.name}</p>
            </a>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Dashboard;
