import Link from "next/link";
import Loader from "./loader";
import SearchBar from "./search-bar";
import ExerciseCard from "./exercise-card";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExercises } from "@/hooks/queries/use-exercises";
import { useSearch } from "@/hooks/use-search";
import { Exercises } from "@/pages/api/exercise/get-exercises";
import {
  CreateEntryInput,
  createEntryValidator
} from "@/hooks/mutations/validators";

export default function EntryForm() {
  const [query, setQuery] = useState("");
  const [exerciseType, setExerciseType] = useState<{
    type: "weight" | "cardio";
    name: string;
    id: string;
  } | null>(null);

  const { data: exercises, isLoading } = useExercises();
  const filteredData = useSearch(query, exercises) as Exercises;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateEntryInput>({
    resolver: zodResolver(createEntryValidator),
    defaultValues: { exerciseId: exerciseType?.id }
  });

  const { fields, append, remove } = useFieldArray({
    name: "sets",
    control
  });

  const handleExerciseType = (exercise: Exercises[0]) => {
    if (exercise.currentWeight || exercise.targetWeight) {
      setExerciseType({ name: exercise.name, type: "weight", id: exercise.id });
    }

    if (exercise.currentDistance || exercise.targetDistance) {
      setExerciseType({ name: exercise.name, type: "cardio", id: exercise.id });
    }
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(data => console.log(data))}
    >
      {isLoading && <Loader />}

      {exerciseType?.type === "weight" && (
        <>
          <div className='flex gap-2 justify-between items-center'>
            <h3>{exerciseType.name}</h3>
            <button className='underline' onClick={() => setExerciseType(null)}>
              Remove
            </button>
          </div>

          {fields.map((set, idx) => (
            <div key={set.id} className='p-4 bg-zinc-900 rounded-md'>
              <div className='flex gap-2 justify-between items-center'>
                <p>Set {idx}</p>
                <button onClick={() => remove(idx)}>Remove</button>
              </div>
            </div>
          ))}

          <button
            className='px-4 py-3 border border-dashed w-full'
            onClick={() => append({})}
          >
            + Add set
          </button>

          <div className='field'>
            <label htmlFor='notes'>Notes</label>

            <textarea
              {...register("notes")}
              className='input min-h-[100px]'
              id='notes'
            />
          </div>
        </>
      )}

      {exerciseType?.type === "cardio" && <p>Rendering cardio</p>}

      {!isLoading && !exerciseType && (
        <>
          <div className='flex flex-wrap gap-2 justify-between items-center'>
            <h2 className='font-semibold'>Select an exercise</h2>
            <Link className='link block' href='/exercise/create?entry=true'>
              + Create exercise
            </Link>
          </div>

          <div className='space-y-6'>
            <SearchBar type='exercise' query={query} setQuery={setQuery} />

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
        </>
      )}

      {exerciseType && (
        <button className='button w-full sm:w-fit' type='submit'>
          Log Entry
        </button>
      )}
    </form>
  );
}
