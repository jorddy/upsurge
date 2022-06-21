import { useSession } from "next-auth/react";
import { useGetLatestWorkouts } from "@/hooks/queries/use-get-latest-workouts";
import { useGetWorkouts } from "@/hooks/queries/use-get-workouts";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const getWorkouts = useGetWorkouts();
  const latestWorkouts = useGetLatestWorkouts();

  // if (getWorkouts.isLoading || latestWorkouts.isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4'>
        <section>
          <h2 className='text-2xl font-semibold'>Recent</h2>
        </section>
        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }
                >
                  Workouts
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }
                >
                  Exercises
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }
                >
                  Progress
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-orange-400 pb-1" : ""
                  }
                >
                  History
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
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
