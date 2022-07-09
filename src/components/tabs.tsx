import Link from "next/link";
import Loader from "./loader";
import WorkoutCard from "./workout-card";
import ExerciseCard from "./exercise-card";
import TabComponent from "./tab";
import SearchBar from "./search-bar";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useWorkouts } from "@/hooks/queries/use-workouts";
import { useExercises } from "@/hooks/queries/use-exercises";
import { useSearch } from "@/hooks/use-search";

export default function Tabs() {
  const [workoutQuery, setWorkoutQuery] = useState("");
  const [exerciseQuery, setExerciseQuery] = useState("");
  const workouts = useWorkouts();
  const exercises = useExercises();

  const filteredWorkoutData = useSearch(workoutQuery, workouts.data);
  const filteredExerciseData = useSearch(exerciseQuery, exercises.data);

  if (workouts.isLoading || exercises.isLoading) return <Loader />;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto scrollbar-hide'>
        <TabComponent>Workouts</TabComponent>
        <TabComponent>Exercises</TabComponent>
        <TabComponent>History</TabComponent>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel className='space-y-4'>
          <SearchBar
            type='workout'
            query={workoutQuery}
            setQuery={setWorkoutQuery}
          />

          <Link className='link block' href='/entry/create?option=workout'>
            + Create workout
          </Link>

          {filteredWorkoutData && filteredWorkoutData?.length <= 0 && (
            <p className='p-4 bg-zinc-900 rounded-md'>
              No workouts found with that name.
            </p>
          )}

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredWorkoutData &&
              filteredWorkoutData.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='space-y-4'>
          <SearchBar
            type='exercise'
            query={exerciseQuery}
            setQuery={setExerciseQuery}
          />

          <Link className='link block' href='/exercise/create'>
            + Create exercise
          </Link>

          {filteredExerciseData && filteredExerciseData?.length <= 0 && (
            <p className='p-4 bg-zinc-900 rounded-md'>
              No exercises found with that name.
            </p>
          )}

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredExerciseData &&
              filteredExerciseData?.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise as any} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
