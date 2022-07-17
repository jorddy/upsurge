import Link from "next/link";
import Loader from "./loader";
import WorkoutCard from "./workout-card";
import ExerciseCard from "./exercise-card";
import TabComponent from "./tab";
import SearchBar from "./search-bar";
import HistoryTab from "./history-tab";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useSearch } from "@/utils/hooks/use-search";
import { InferQueryOutput, trpc } from "@/utils/trpc";

export default function Tabs() {
  const [workoutQuery, setWorkoutQuery] = useState("");
  const [exerciseQuery, setExerciseQuery] = useState("");

  const workouts = trpc.useQuery(["workout.get-all"]);
  const exercises = trpc.useQuery(["exercise.get-all"]);

  const filteredWorkoutData = useSearch(
    workoutQuery,
    workouts.data
  ) as InferQueryOutput<"workout.get-all">;
  const filteredExerciseData = useSearch(
    exerciseQuery,
    exercises.data
  ) as InferQueryOutput<"exercise.get-all">;

  if (workouts.isLoading || exercises.isLoading) return <Loader />;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto scrollbar-hide'>
        <TabComponent>Workouts</TabComponent>
        <TabComponent>Exercises</TabComponent>
        <TabComponent>History</TabComponent>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel className='space-y-6'>
          <SearchBar
            type='workout'
            query={workoutQuery}
            setQuery={setWorkoutQuery}
          />

          <Link className='link' href='/entry/create?option=workout'>
            + Create workout
          </Link>

          {filteredWorkoutData && filteredWorkoutData?.length <= 0 && (
            <p className='p-4 bg-zinc-900 border border-zinc-500 rounded-md'>
              No workouts found.
            </p>
          )}

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredWorkoutData &&
              filteredWorkoutData.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='space-y-6'>
          <SearchBar
            type='exercise'
            query={exerciseQuery}
            setQuery={setExerciseQuery}
          />

          <Link className='link' href='/exercise/create'>
            + Create exercise
          </Link>

          {filteredExerciseData && filteredExerciseData?.length <= 0 && (
            <p className='p-4 bg-zinc-900 border border-zinc-500 rounded-md'>
              No exercises found.
            </p>
          )}

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredExerciseData &&
              filteredExerciseData?.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise as any} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <HistoryTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
