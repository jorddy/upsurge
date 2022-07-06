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
import { ExerciseType, WorkoutType } from "@/hooks/queries/validators";

const Tabs = () => {
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
          <Link
            href='/workouts/create'
            className='underline font-semibold hover:text-orange-600'
          >
            + Create New Workout
          </Link>

          <SearchBar
            type='workout'
            query={workoutQuery}
            setQuery={setWorkoutQuery}
          />

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredWorkoutData &&
              filteredWorkoutData.map(workout => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout as WorkoutType}
                />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='space-y-4'>
          <Link
            href='/exercises/create'
            className='underline font-semibold hover:text-orange-600'
          >
            + Create New Exercise
          </Link>

          <SearchBar
            type='exercise'
            query={exerciseQuery}
            setQuery={setExerciseQuery}
          />

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {filteredExerciseData &&
              filteredExerciseData?.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise as ExerciseType}
                />
              ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className='font-bold'>Feature coming soon</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
