import Link from "next/link";
import dynamic from "next/dynamic";
import AppLayout from "@/components/layouts/app-layout";
import Loader from "@/components/ui/loader";
import WorkoutCard from "@/components/cards/workout-card";
import EmptyCard from "@/components/cards/empty-card";
import SearchBar from "@/components/ui/search-bar";
import ExerciseCard from "@/components/cards/exercise-card";
import DateBar from "@/components/ui/date-bar";
import EntryCard from "@/components/cards/entry-card";
import TabComponent from "@/components/ui/tab";
import { authorize } from "@/utils/authorize";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { useSearch } from "@/utils/use-search";

export { authorize as getServerSideProps };

const DashboardTabs = () => {
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
};

const LazyDashboardTabs = dynamic(() => Promise.resolve(DashboardTabs), {
  ssr: false
});

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["workout.get-recent"]);
  const { isLoading: isLoadingWorkouts } = trpc.useQuery(["workout.get-all"]);
  const { isLoading: isLoadingExercises } = trpc.useQuery(["exercise.get-all"]);

  if (isLoading || isLoadingWorkouts || isLoadingExercises) return <Loader />;

  return (
    <AppLayout>
      <section className='flex flex-wrap justify-between items-center gap-4'>
        <div className='space-y-1'>
          <h1 className='text-lg font-bold sm:text-2xl'>
            Welcome back, {session?.user.name}
          </h1>
          <p className='mb-4'>Your recent workout summary</p>
        </div>

        <Link className='button-create' href='/entry/create'>
          + Log entry
        </Link>
      </section>

      <h2 className='text-lg font-bold sm:text-xl'>Recent</h2>

      <section className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
        {data?.length === 0 && <EmptyCard>No recent workouts found</EmptyCard>}

        {data?.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </section>

      <h2 className='text-lg font-bold sm:text-xl'>Explore</h2>

      <LazyDashboardTabs />
    </AppLayout>
  );
}
