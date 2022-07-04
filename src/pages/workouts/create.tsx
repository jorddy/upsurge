import Header from "@/components/header";
import ExerciseDropdown from "@/components/exercise-dropdown";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useCreateWorkout } from "@/hooks/mutations/use-create-workout";
import { useGetAllExercises } from "@/hooks/queries/use-get-all-exercises";
import {
  CreateWorkoutType,
  createWorkoutValidator
} from "@/hooks/mutations/validators";

const CreateWorkoutPage = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetAllExercises();
  const { mutate, isError, isLoading } = useCreateWorkout(queryClient);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<CreateWorkoutType>({
    resolver: zodResolver(createWorkoutValidator)
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "exercises"
  // });

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-xl font-semibold'>Create your workout</h1>
          <p>Begin with a name for your workout and add exercises from there</p>
        </div>

        <form
          className='space-y-4'
          onSubmit={handleSubmit(data => console.log(data))}
        >
          <div className='field'>
            <label htmlFor='name'>Name:</label>
            <input {...register("name")} className='input' />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          {!!watch("name") && (
            <div className='field'>
              <label htmlFor='name'>Exercises:</label>
              {/* {fields.map((field, idx) => (
                <div key={field.id} className='flex gap-2 items-center'>
                  <p className='text-sm self-start min-w-[80px]'>
                    Exercise {idx}:
                  </p>
                  <ExerciseDropdown />
                  <button
                    onClick={() => remove(idx)}
                    className='bg-red-500 p-2 rounded-sm'
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={() => append({})}
                className='bg-slate-900 py-2'
              >
                + Add exercise
              </button> */}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='px-4 py-2 bg-orange-400 text-slate-900 rounded-sm 
            transition hover:bg-orange-500'
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateWorkoutPage;
