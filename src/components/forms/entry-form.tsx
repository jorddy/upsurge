import toast from "react-hot-toast";
import Link from "next/link";
import SearchBar from "../fields/search-bar";
import ExerciseCard from "../cards/exercise-card";
import SetForm from "./set-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "@/utils/hooks/use-search";
import { HiX } from "react-icons/hi";
import { EntryValidator, entryValidator } from "@/utils/validators";
import { InferQueryOutput, trpc } from "@/utils/trpc";

export default function EntryForm() {
  const { push } = useRouter();
  const ctx = trpc.useContext();

  const [query, setQuery] = useState("");
  const [exerciseType, setExerciseType] = useState<{
    type: "weight" | "cardio";
    name: string;
    id: string;
  } | null>(null);

  const { data: exercises } = trpc.useQuery(["exercise.get-all"]);
  const filteredData = useSearch(
    query,
    exercises
  ) as InferQueryOutput<"exercise.get-all">;

  const { mutate: createEntry, isLoading } = trpc.useMutation(
    ["entry.create"],
    {
      onSuccess: () => ctx.invalidateQueries(["exercise.get-all"])
    }
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<EntryValidator>({
    resolver: zodResolver(entryValidator)
  });

  const { fields, append, remove } = useFieldArray({
    name: "sets",
    control
  });

  const handleExerciseType = (
    exercise: InferQueryOutput<"exercise.get-all">[0]
  ) => {
    if (exercise.currentWeight || exercise.targetWeight) {
      setExerciseType({ name: exercise.name, type: "weight", id: exercise.id });
    }

    if (exercise.currentDistance || exercise.targetDistance) {
      setExerciseType({ name: exercise.name, type: "cardio", id: exercise.id });
    }

    setValue("exerciseId", exercise.id);
  };

  const onSubmit = async (data: EntryValidator) => {
    const toastId = toast.loading("Creating entry...");
    createEntry(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        push("/dashboard");
        toast.success("Successfully created entry", { id: toastId });
      }
    });
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {errors.exerciseId && (
        <p className='text-red-600'>{errors.exerciseId.message}</p>
      )}

      {exerciseType?.type === "weight" && (
        <>
          <div className='flex gap-4 items-center'>
            <h3>{exerciseType.name}</h3>
            <button
              className='button-remove'
              type='button'
              onClick={() => setExerciseType(null)}
            >
              <HiX className='h-5 w-5' />
              <p className='hidden sm:inline'>Remove exercise</p>
            </button>
          </div>

          {fields.map((set, idx) => (
            <SetForm
              key={set.id}
              set={set}
              index={idx}
              register={register}
              remove={remove}
            />
          ))}

          <button
            className='px-4 py-3 border border-dashed w-full hover:bg-zinc-900'
            type='button'
            onClick={() => append({})}
          >
            + Add set
          </button>

          <div className='field'>
            <label htmlFor='notes'>Notes</label>

            <textarea
              {...register("notes")}
              className='input min-h-[100px] w-full'
              id='notes'
            />

            {errors.notes && (
              <p className='text-red-600'>{errors.notes.message}</p>
            )}
          </div>
        </>
      )}

      {exerciseType?.type === "cardio" && (
        <>
          <div className='flex gap-4 items-center'>
            <h3>{exerciseType.name}</h3>
            <button
              className='button-remove'
              type='button'
              onClick={() => setExerciseType(null)}
            >
              <HiX className='h-5 w-5' />
              <p className='hidden sm:inline'>Remove exercise</p>
            </button>
          </div>

          {fields.map((set, idx) => (
            <SetForm
              key={set.id}
              cardio={true}
              set={set}
              index={idx}
              register={register}
              remove={remove}
            />
          ))}

          <button
            className='px-4 py-3 border border-dashed w-full'
            type='button'
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
                type='button'
                onClick={() => handleExerciseType(exercise)}
              >
                <ExerciseCard key={exercise.id} exercise={exercise} linkOff />
              </button>
            ))}
          </div>
        </>
      )}

      {exerciseType && (
        <button className='button' type='submit' disabled={isLoading}>
          Log Entry
        </button>
      )}
    </form>
  );
}
