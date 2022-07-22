import Link from "next/link";
import EmptyCard from "../cards/empty-card";
import WorkoutCard from "../cards/workout-card";
import Loader from "./loader";
import SearchBar from "@/components/ui/search-bar";
import ExerciseCard from "@/components/cards/exercise-card";
import TabComponent from "@/components/ui/tab";
import EntryCard from "@/components/cards/entry-card";
import DateBar from "@/components/ui/date-bar";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useSearch } from "@/utils/use-search";
import { motion } from "framer-motion";
import { InferQueryOutput, trpc } from "@/utils/trpc";

export default function DashboardTabs() {
  const [workoutQuery, setWorkoutQuery] = useState("");
  const [exerciseQuery, setExerciseQuery] = useState("");
  const [date, setDate] = useState(new Date());

  const { data: workouts } = trpc.useQuery(["workout.get-all"]);
  const { data: exercises } = trpc.useQuery(["exercise.get-all"]);
  const {
    data: entries,
    isLoading,
    refetch
  } = trpc.useQuery(["entry.get-all-by-date", { date }]);

  useEffect(() => {
    refetch();
  }, [date, refetch]);

  const filteredWorkoutData = useSearch(
    workoutQuery,
    workouts
  ) as InferQueryOutput<"workout.get-all">;
  const filteredExerciseData = useSearch(
    exerciseQuery,
    exercises
  ) as InferQueryOutput<"exercise.get-all">;

  return (
    <Tab.Group>
      <Tab.List className='flex overflow-x-auto scrollbar-hide'>
        <TabComponent>Workouts</TabComponent>
        <TabComponent>Exercises</TabComponent>
        <TabComponent>History</TabComponent>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel
          className='space-y-6'
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SearchBar
            type='workout'
            query={workoutQuery}
            setQuery={setWorkoutQuery}
          />

          <Link className='link' href='/entry/create?option=workout'>
            + Create workout
          </Link>

          {filteredWorkoutData && filteredWorkoutData?.length <= 0 && (
            <EmptyCard>No workouts found</EmptyCard>
          )}

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredWorkoutData &&
              filteredWorkoutData.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel
          className='space-y-6'
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SearchBar
            type='exercise'
            query={exerciseQuery}
            setQuery={setExerciseQuery}
          />
          <Link className='link' href='/exercise/create'>
            + Create exercise
          </Link>
          {filteredExerciseData && filteredExerciseData?.length <= 0 && (
            <EmptyCard>No exercises found</EmptyCard>
          )}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredExerciseData &&
              filteredExerciseData?.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise as any} />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel
          className='space-y-6'
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='space-y-2'>
            <h3 className='text-xl font-bold'>View your workout history</h3>
            <p className='text-gray-300'>Select a date from the field below</p>
          </div>

          <DateBar date={date} setDate={setDate} />

          {isLoading && <Loader inline />}

          {entries && entries.length === 0 && (
            <EmptyCard>No entries found</EmptyCard>
          )}

          {entries?.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
