import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useGetAllWorkouts } from "@/hooks/queries/use-get-all-workouts";
import Loader from "./loader";

const Tabs = () => {
  const { data, isLoading } = useGetAllWorkouts();

  if (isLoading) return <Loader />;

  return (
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
          {data?.map(workout => (
            <p key={workout.id}>{workout.name}</p>
          ))}
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
export default Tabs;
