import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateWorkoutType,
  createWorkoutValidator
} from "@/hooks/mutations/validators";
import Link from "next/link";

const WorkoutForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateWorkoutType>({
    resolver: zodResolver(createWorkoutValidator)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries"
  });

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(data => console.log(data))}
    >
      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor='name'>
          Workout name
        </label>
        <input {...register("name")} className='bg-zinc-900 px-3 py-2' />
        {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor='createdAt'>
          When did you do the workout? (optional)
        </label>
        <p>
          <strong>Note:</strong> Leaving this blank will default to today
        </p>
        <input
          {...register("createdAt")}
          className='bg-zinc-900 px-3 py-2'
          type='date'
        />
        {errors?.createdAt && (
          <p className='text-red-500'>{errors.createdAt.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center justify-between'>
          <label className='font-semibold' htmlFor='createdAt'>
            Add exercises
          </label>
          <Link
            className='font-semibold underline hover:text-orange-500'
            href='/exercise/create'
          >
            + Create Exercise
          </Link>
        </div>
        {/* TODO: Exercise search box */}

        {/* TODO: List of Exercises to add */}
        {/* TODO: List of Entries within those exercises to add */}
      </div>
    </form>
  );
};

export default WorkoutForm;
