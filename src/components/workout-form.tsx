import toast from "react-hot-toast";
import SearchBar from "./search-bar";
import ExerciseCard from "./exercise-card";
import WorkoutSetForm from "./workout-set-form";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiX } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSearch } from "@/utils/hooks/use-search";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { workoutValidator, WorkoutValidator } from "@/utils/validators";

export default function WorkoutForm() {
  const { push } = useRouter();
  const ctx = trpc.useContext();

  const { data } = trpc.useQuery(["exercise.get-all"]);

  const { mutate: createWorkout, isLoading } = trpc.useMutation(
    ["workout.create"],
    {
      onSuccess: () => {
        ctx.invalidateQueries(["workout.get-all"]);
        ctx.invalidateQueries(["workout.get-latest"]);
      }
    }
  );

  const [query, setQuery] = useState("");
  const filteredData = useSearch(query, data);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<WorkoutValidator>({
    resolver: zodResolver(workoutValidator)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries"
  });

  const handleExerciseType = (
    exercise: InferQueryOutput<"exercise.get-all">[0]
  ) => {
    if (exercise.currentWeight || exercise.targetWeight) {
      append({ exerciseId: exercise.id, name: exercise.name, type: "weight" });
    }

    if (exercise.currentDistance || exercise.targetDistance) {
      append({ exerciseId: exercise.id, name: exercise.name, type: "cardio" });
    }
  };

  const onSubmit = (data: WorkoutValidator) => {
    const toastId = toast.loading("Creating workout...");
    createWorkout(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        push("/dashboard");
        toast.success("Successfully created workout", { id: toastId });
      }
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
          <p className='p-4 bg-zinc-900 border border-zinc-500 rounded-md'>
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
            onClick={() => handleExerciseType(exercise as any)}
          >
            <ExerciseCard
              key={exercise.id}
              exercise={exercise as InferQueryOutput<"exercise.get-all">[0]}
              linkOff
            />
          </button>
        ))}
      </div>
    </form>
  );
}
