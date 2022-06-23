import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useGetAllWorkouts } from "@/hooks/queries/use-get-all-workouts";
import { useGetAllExercises } from "@/hooks/queries/use-get-all-exercises";
import Loader from "./loader";

const Tabs = () => {
  const allWorkouts = useGetAllWorkouts();
  const allExercises = useGetAllExercises();

  if (allWorkouts.isLoading || allExercises.isLoading) return <Loader />;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto'>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`mr-4 ${
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
              className={`mr-4 ${
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
              className={`mr-4 ${
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
              className={`mr-4 ${
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
        <Tab.Panel>
          {allExercises.data?.map(exercise => (
            <p key={exercise.id}>{exercise.name}</p>
          ))}
        </Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
export default Tabs;
