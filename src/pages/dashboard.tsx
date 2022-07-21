import Link from "next/link";
import Header from "@/components/ui/header";
import Loader from "@/components/ui/loader";
import WorkoutCard from "@/components/cards/workout-card";
import SearchBar from "@/components/ui/search-bar";
import ExerciseCard from "@/components/cards/exercise-card";
import TabComponent from "@/components/ui/tab";
import { authorize } from "@/utils/authorize";
import { Tab } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { useState } from "react";
import { useSearch } from "@/utils/use-search";

export { authorize as getServerSideProps };

const Tabs = () => {
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
          <p>Coming soon</p>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["workout.get-latest"]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
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
          {data?.length === 0 && (
            <p className='p-4 bg-zinc-900 rounded-md border border-zinc-500'>
              No recent workouts found.
            </p>
          )}

          {data?.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </section>

        <h2 className='text-lg font-bold sm:text-xl'>Explore</h2>

        <Tabs />
      </main>
    </>
  );
}
