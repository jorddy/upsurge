import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import { useGetAllWorkouts } from "@/hooks/queries/use-get-all-workouts";
import { useGetLatestWorkouts } from "@/hooks/queries/use-get-latest-workouts";
import Header from "@/components/header";
import Loader from "@/components/loader";

const Dashboard = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const allWorkouts = useGetAllWorkouts();
  const latestWorkouts = useGetLatestWorkouts();

  if (!session) push("/");
  if (allWorkouts.isLoading || latestWorkouts.isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <section className='space-y-2'>
          <h2 className='text-2xl font-semibold'>Recent</h2>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {latestWorkouts.data?.map(workout => (
              <p key={workout.id}>{workout.name}</p>
            ))}
          </div>
        </section>
        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`mr-2 ${
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }`}
                >
                  Workouts
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`mr-2 ${
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }`}
                >
                  Exercises
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`mr-2 ${
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }`}
                >
                  Progress
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`mr-2 ${
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }`}
                >
                  History
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {allWorkouts.data?.map(workout => (
                <p key={workout.id}>{workout.name}</p>
              ))}
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Feature coming soon</Tab.Panel>
            <Tab.Panel>Feature coming soon</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </>
  );
};

export default Dashboard;
