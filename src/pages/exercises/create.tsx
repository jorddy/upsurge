import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  CreateExerciseType,
  createExerciseValidator
} from "@/shared/create-exercise-validator";
import { useCreateExercise } from "@/hooks/mutations/use-create-exercise";

const CreateExercisePage = () => {
  const { push } = useRouter();
  const { mutate } = useCreateExercise();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseValidator)
  });

  return (
    <form
      onSubmit={handleSubmit(data => {
        mutate(data);
        push("/dashboard");
      })}
    >
      <div className='space-y-2'>
        <label htmlFor='name'>Name:</label>
        <input {...register("name")} className='bg-slate-900 text-white' />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='space-y-2'>
        <label htmlFor='description'>Description:</label>
        <input
          {...register("description")}
          className='bg-slate-900 text-white'
        />
        {errors.description && (
          <p className='text-red-500'>{errors.description.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='current-weight'>Current Weight:</label>
        <input
          {...register("currentWeight")}
          type='number'
          className='bg-slate-900 text-white'
        />
        {errors.currentWeight && (
          <p className='text-red-500'>{errors.currentWeight.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='target-weight'>Target Weight:</label>
        <input
          {...register("targetWeight")}
          type='number'
          className='bg-slate-900 text-white'
        />
        {errors.targetWeight && (
          <p className='text-red-500'>{errors.targetWeight.message}</p>
        )}
      </div>

      <button type='submit'>Create</button>
    </form>
  );
};

export default CreateExercisePage;
