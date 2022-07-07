import Header from "@/components/header";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExerciseInput,
  createExerciseValidator
} from "@/hooks/mutations/validators";
import { useCreateExercise } from "@/hooks/mutations/use-create-exercise";

const CreateExercisePage = () => {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const [option, setOption] = useState<"weight" | "cardio" | null>(null);

  const { mutate, isLoading } = useCreateExercise();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseInput>({
    resolver: zodResolver(createExerciseValidator)
  });

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") signIn();

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <h1 className='text-xl font-semibold'>Create exercise</h1>

          <form
            className='space-y-6'
            onSubmit={handleSubmit(data => {
              mutate(data);
              push("/dashboard");
            })}
          >
            <div className='field'>
              <label htmlFor='name'>Exercise name:</label>
              <input {...register("name")} className='input' id='name' />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
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
                  <label htmlFor='current-weight'>Current Weight:</label>
                  <input
                    {...register("currentWeight")}
                    type='number'
                    id='current-weight'
                    step={0.01}
                    className='input'
                  />
                  {errors.currentWeight && (
                    <p className='text-red-500'>
                      {errors.currentWeight.message}
                    </p>
                  )}
                </div>

                <div className='field'>
                  <label htmlFor='target-weight'>Target Weight:</label>
                  <input
                    {...register("targetWeight")}
                    className='input'
                    type='number'
                    step={0.01}
                    id='target-weight'
                  />
                  {errors.targetWeight && (
                    <p className='text-red-500'>
                      {errors.targetWeight.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {option === "cardio" && (
              <>
                <div className='field'>
                  <label htmlFor='current-distance'>Current Distance:</label>
                  <input
                    {...register("currentDistance")}
                    className='input'
                    type='number'
                    step={0.01}
                    id='current-distance'
                  />
                  {errors.currentDistance && (
                    <p className='text-red-500'>
                      {errors.currentDistance.message}
                    </p>
                  )}
                </div>

                <div className='field'>
                  <label htmlFor='target-distance'>Target Distance:</label>
                  <input
                    {...register("targetDistance")}
                    className='input'
                    type='number'
                    step={0.01}
                    id='target-distance'
                  />
                  {errors.targetDistance && (
                    <p className='text-red-500'>
                      {errors.targetDistance.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              className='button w-full sm:w-fit disabled:opacity-60'
              type='submit'
              disabled={isLoading}
            >
              Create
            </button>
          </form>
        </main>
      </>
    );
  }
};

export default CreateExercisePage;
