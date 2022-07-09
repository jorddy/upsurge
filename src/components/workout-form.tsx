import SearchBar from "./search-bar";
import ExerciseCard from "./exercise-card";
import WorkoutSetForm from "./workout-set-form";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiX } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useExercises } from "@/hooks/queries/use-exercises";
import { Exercises } from "@/pages/api/exercise/get-exercises";
import { CreateWorkoutInput, createWorkoutValidator } from "@/utils/validators";
import { useSearch } from "@/hooks/use-search";
import { useCreateWorkout } from "@/hooks/mutations/use-create-workout";

export default function WorkoutForm() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { data } = useExercises();
  const { mutate, isLoading } = useCreateWorkout(queryClient);

  const [query, setQuery] = useState("");
  const filteredData = useSearch(query, data) as Exercises;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<CreateWorkoutInput>({
    resolver: zodResolver(createWorkoutValidator)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries"
  });

  const handleExerciseType = (exercise: Exercises[0]) => {
    if (exercise.currentWeight || exercise.targetWeight) {
      append({ exerciseId: exercise.id, name: exercise.name, type: "weight" });
    }

    if (exercise.currentDistance || exercise.targetDistance) {
      append({ exerciseId: exercise.id, name: exercise.name, type: "cardio" });
    }
  };

  const onSubmit = (data: CreateWorkoutInput) => {
    mutate(data, {
      onSuccess: () => push("/dashboard")
    });
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='field'>
        <label className='font-semibold' htmlFor='name'>
          Workout name
        </label>

        <input {...register("name")} className='input' id='name' />

        {errors?.name && <p className='text-red-600'>{errors.name.message}</p>}
      </div>

      <div className='field'>
        <label className='font-semibold' htmlFor='created-at'>
          When did you do the workout? (optional)
        </label>

        <p className='text-sm text-gray-300'>
          <strong>Note:</strong> Leaving this blank will default to today
        </p>

        <input
          {...register("createdAt")}
          className='input'
          type='date'
          id='created-at'
        />

        {errors?.createdAt && (
          <p className='text-red-600'>{errors.createdAt.message}</p>
        )}
      </div>

      <div className='space-y-6'>
        <h2 className='text-md font-semibold'>Add exercises</h2>

        {fields.length === 0 && (
          <p className='p-4 bg-zinc-900 rounded-md'>
            No exercises currently selected.
          </p>
        )}

        {fields.map((exercise, idx) => (
          <div
            key={exercise.id}
            className='bg-zinc-900 px-6 py-4 space-y-2 rounded-md'
          >
            <div className='flex gap-4 items-center'>
              <h3 className='text-md font-semibold'>{exercise.name}</h3>
              <button
                className='button-remove'
                type='button'
                onClick={() => remove(idx)}
              >
                <HiX className='h-5 w-5' />
                <p className='hidden sm:inline'>Remove exercise</p>
              </button>
            </div>

            {exercise.type === "weight" && (
              <WorkoutSetForm
                control={control}
                index={idx}
                register={register}
              />
            )}

            {exercise.type === "cardio" && (
              <WorkoutSetForm
                cardio={true}
                control={control}
                index={idx}
                register={register}
              />
            )}
          </div>
        ))}

        {watch("entries")?.length > 0 && (
          <button className='button' type='submit' disabled={isLoading}>
            Log workout
          </button>
        )}

        <SearchBar type='exercise' query={query} setQuery={setQuery} />

        {filteredData?.map(exercise => (
          <button
            key={exercise.id}
            className='text-left w-full'
            type='button'
            onClick={() => handleExerciseType(exercise)}
          >
            <ExerciseCard key={exercise.id} exercise={exercise} linkOff />
          </button>
        ))}
      </div>
    </form>
  );
}
