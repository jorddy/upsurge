import Link from "next/link";
import Loader from "./loader";
import WorkoutCard from "./workout-card";
import ExerciseCard from "./exercise-card";
import TabComponent from "./tab";
import { Tab } from "@headlessui/react";
import { useGetAllWorkouts } from "@/hooks/queries/use-get-all-workouts";
import { useGetAllExercises } from "@/hooks/queries/use-get-all-exercises";

const Tabs = () => {
  const allWorkouts = useGetAllWorkouts();
  const allExercises = useGetAllExercises();

  if (allWorkouts.isLoading || allExercises.isLoading) return <Loader />;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto scrollbar-hide'>
        <TabComponent>Workouts</TabComponent>
        <TabComponent>Exercises</TabComponent>
        <TabComponent>History</TabComponent>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel className='space-y-2'>
          <Link
            href='/workouts/create'
            className='underline hover:text-orange-400'
          >
            + Create New Workout
          </Link>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {allWorkouts.data?.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='space-y-2'>
          <Link
            href='/exercises/create'
            className='underline hover:text-orange-400'
          >
            + Create New Exercise
          </Link>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {allExercises.data?.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='font-bold'>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
