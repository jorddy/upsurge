import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useGetAllWorkouts } from "@/hooks/queries/use-get-all-workouts";
import { useGetAllExercises } from "@/hooks/queries/use-get-all-exercises";
import Loader from "./loader";
import WorkoutCard from "./workout-card";
import ExerciseCard from "./exercise-card";
import Link from "next/link";

const Tabs = () => {
  const allWorkouts = useGetAllWorkouts();
  const allExercises = useGetAllExercises();

  if (allWorkouts.isLoading || allExercises.isLoading) return <Loader />;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto scrollbar-hide'>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`mr-4 ${
                selected ? "border-b-2 border-orange-400" : ""
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
                selected ? "border-b-2 border-orange-400" : ""
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
                selected ? "border-b-2 border-orange-400" : ""
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
                selected ? "border-b-2 border-orange-400" : ""
              }`}
            >
              History
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className='space-y-2'>
          <Link href='/workouts/create'>
            <a className='underline hover:text-orange-400'>
              + Create New Workout
            </a>
          </Link>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {allWorkouts.data?.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </Tab.Panel>
        <Tab.Panel className='space-y-2'>
          <Link href='/exercises/create'>
            <a className='underline hover:text-orange-400'>
              + Create New Exercise
            </a>
          </Link>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {allExercises.data?.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
        <Tab.Panel>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
