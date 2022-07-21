import toast from "react-hot-toast";
import Header from "@/components/ui/header";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { exerciseValidator, ExerciseValidator } from "@/server/shared/exercise";

export { authorize as getServerSideProps };

export default function CreateExercisePage() {
  const { push, query } = useRouter();
  const ctx = trpc.useContext();

  const [option, setOption] = useState<"weight" | "cardio" | null>(null);
  const { mutate: createExercise, isLoading } = trpc.useMutation(
    ["exercise.create"],
    {
      onSuccess: () => ctx.invalidateQueries(["exercise.get-all"])
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ExerciseValidator>({
    resolver: zodResolver(exerciseValidator)
  });

  // Variables for watching each option
  const currentWeight = watch("currentWeight");
  const targetWeight = watch("targetWeight");
  const currentDistance = watch("currentDistance");
  const targetDistance = watch("targetDistance");

  // Deletes values from weight if distance is inputed
  // PREVENTS BOTH VALUES FROM BEING PUT IN THE DATABASE
  useEffect(() => {
    console.log("reran weight");
    if (currentWeight || targetWeight) {
      setValue("currentDistance", undefined);
      setValue("targetDistance", undefined);
    }
  }, [currentWeight, targetWeight, setValue]);

  // Deletes values from weight if distance is inputed
  // PREVENTS BOTH VALUES FROM BEING PUT IN THE DATABASE
  useEffect(() => {
    console.log("reran distance");
    if (currentDistance || targetDistance) {
      setValue("currentWeight", undefined);
      setValue("targetWeight", undefined);
    }
  }, [currentDistance, targetDistance, setValue]);

  const onSubmit = (data: ExerciseValidator) => {
    const toastId = toast.loading("Creating exercise...");
    createExercise(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        if (query.entry) {
          push("/entry/create?option=exercise");
        } else {
          push("/dashboard");
        }
        toast.success("Successfully created exercise", { id: toastId });
      }
    });
  };

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <h1 className='text-xl font-semibold'>Create exercise</h1>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label htmlFor='name'>Exercise name:</label>
            <input {...register("name")} className='input' id='name' />

            {errors.name && (
              <p className='text-red-600'>{errors.name.message}</p>
            )}
          </div>

          <fieldset className='space-y-2'>
            <legend className='font-semibold'>
              What type of exercise is this?
            </legend>

            <div className='flex gap-4'>
              <label htmlFor='weight'>
                <input
                  className='mr-2'
                  type='radio'
                  id='weight'
                  value='weight'
                  checked={option === "weight"}
                  onChange={e => setOption(e.target.value as "weight")}
                />
                Weight
              </label>

              <label htmlFor='cardio'>
                <input
                  className='mr-2'
                  type='radio'
                  id='cardio'
                  value='cardio'
                  checked={option === "cardio"}
                  onChange={e => setOption(e.target.value as "cardio")}
                />
                Cardio
              </label>
            </div>
          </fieldset>

          {option === "weight" && (
            <>
              <div className='field'>
                <label htmlFor='current-weight'>Current Weight (kg):</label>
                <input
                  {...register("currentWeight")}
                  type='number'
                  id='current-weight'
                  step={0.01}
                  className='input'
                />

                {errors.currentWeight && (
                  <p className='text-red-600'>{errors.currentWeight.message}</p>
                )}
              </div>

              <div className='field'>
                <label htmlFor='target-weight'>Target Weight (kg):</label>
                <input
                  {...register("targetWeight")}
                  className='input'
                  type='number'
                  step={0.01}
                  id='target-weight'
                />
                {errors.targetWeight && (
                  <p className='text-red-600'>{errors.targetWeight.message}</p>
                )}
              </div>
            </>
          )}

          {option === "cardio" && (
            <>
              <div className='field'>
                <label htmlFor='current-distance'>
                  Current Distance (miles):
                </label>
                <input
                  {...register("currentDistance")}
                  className='input'
                  type='number'
                  step={0.01}
                  id='current-distance'
                />
                {errors.currentDistance && (
                  <p className='text-red-600'>
                    {errors.currentDistance.message}
                  </p>
                )}
              </div>

              <div className='field'>
                <label htmlFor='target-distance'>
                  Target Distance (miles):
                </label>
                <input
                  {...register("targetDistance")}
                  className='input'
                  type='number'
                  step={0.01}
                  id='target-distance'
                />

                {errors.targetDistance && (
                  <p className='text-red-600'>
                    {errors.targetDistance.message}
                  </p>
                )}
              </div>
            </>
          )}

          <button className='button' type='submit' disabled={isLoading}>
            Create
          </button>
        </form>
      </main>
    </>
  );
}
