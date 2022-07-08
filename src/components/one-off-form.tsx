import Link from "next/link";
import Loader from "./loader";
import SearchBar from "./search-bar";
import ExerciseCard from "./exercise-card";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useExercises } from "@/hooks/queries/use-exercises";
import { useSearch } from "@/hooks/use-search";
import { Exercises } from "@/pages/api/exercise/get-exercises";

const OneOffForm = () => {
  const [query, setQuery] = useState("");
  const [exerciseType, setExerciseType] = useState<{
    type: "weight" | "cardio";
    id: string;
  } | null>(null);

  const { data: exercises, isLoading } = useExercises();
  const filteredData = useSearch(query, exercises) as Exercises;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "wd",
    control
  });

  const handleExerciseType = (exercise: Exercises[0]) => {
    if (exercise.currentWeight || exercise.targetWeight) {
      setExerciseType({ type: "weight", id: exercise.id });
    }

    if (exercise.currentDistance || exercise.targetDistance) {
      setExerciseType({ type: "cardio", id: exercise.id });
    }
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(data => console.log(data))}
    >
      <div className='field'>
        <label htmlFor='name'>Exercise name:</label>
        <input {...register("name")} className='input' id='name' />
      </div>

      {exerciseType?.type === "weight" && <p>Rendering weights</p>}

      {exerciseType?.type === "cardio" && <p>Rendering cardio</p>}

      <Link className='link block' href='/exercise/create?entry=true'>
        + Create exercise
      </Link>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className='space-y-6'>
          <SearchBar type='workout' query={query} setQuery={setQuery} />
          {filteredData?.map(exercise => (
            <button
              key={exercise.id}
              className='text-left w-full'
              onClick={() => handleExerciseType(exercise)}
            >
              <ExerciseCard key={exercise.id} exercise={exercise} linkOff />
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default OneOffForm;
