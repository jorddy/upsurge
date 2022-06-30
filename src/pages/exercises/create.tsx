import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useCreateExercise } from "@/hooks/mutations/use-create-exercise";
import {
  CreateExerciseType,
  createExerciseValidator
} from "@/hooks/mutations/validators";
import Header from "@/components/header";

const CreateExercisePage = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading } = useCreateExercise(queryClient);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseValidator)
  });

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-xl font-semibold'>Create your exercise</h1>
          <p>Enter a name and your current/target weights</p>
        </div>

        <form
          className='space-y-4'
          onSubmit={handleSubmit(data => {
            mutate(data);
            if (!isError) push("/dashboard");
          })}
        >
          <div className='field'>
            <label htmlFor='name'>Name:</label>
            <input {...register("name")} className='input' />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='description'>Description (optional):</label>
            <input {...register("description")} className='input' />
            {errors.description && (
              <p className='text-red-500'>{errors.description.message}</p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='current-weight'>Current Weight:</label>
            <input
              {...register("currentWeight")}
              type='number'
              className='input'
            />
            {errors.currentWeight && (
              <p className='text-red-500'>{errors.currentWeight.message}</p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='target-weight'>Target Weight:</label>
            <input
              {...register("targetWeight")}
              type='number'
              className='input'
            />
            {errors.targetWeight && (
              <p className='text-red-500'>{errors.targetWeight.message}</p>
            )}
          </div>

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

export default CreateExercisePage;
