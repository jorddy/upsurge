import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  CreateExerciseType,
  createExerciseValidator
} from "@/shared/create-exercise-validator";

const CreateExercisePage = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseType>({
    resolver: zodResolver(createExerciseValidator)
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div className='space-y-2'>
        <label htmlFor='name'>Name:</label>
        <input {...register("name")} />
      </div>
      <div className='space-y-2'>
        <label htmlFor='description'>Description:</label>
        <input {...register("description")} />
      </div>
      <div className='space-y-2'>
        <label htmlFor='current-weight'>Current Weight:</label>
        <input {...register("currentWeight")} type='number' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='target-weight'>Target Weight:</label>
        <input {...register("targetWeight")} type='number' />
      </div>
    </form>
  );
};

export default CreateExercisePage;
