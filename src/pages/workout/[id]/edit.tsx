import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertKgToLbs } from "@/utils/kg-to-lbs";
import { useProfileStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";
import {
  updateWorkoutValidator,
  UpdateWorkoutValidator
} from "@/utils/validators/update-workout";

export { authorize as getServerSideProps };

interface Props {
  workoutId: string;
}

const EditWorkoutForm = ({ workoutId }: Props) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();
  const { weightUnit } = useProfileStore();

  const { data: workout, isLoading } = trpc.useQuery([
    "workout.get-by-id",
    { id: workoutId }
  ]);

  const { mutate: updateWorkout, isLoading: isUpdating } = trpc.useMutation(
    ["workout.update"],
    {
      onSuccess: () =>
        ctx.invalidateQueries(["workout.get-by-id", { id: workoutId }])
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateWorkoutValidator>({
    defaultValues: { workoutId },
    resolver: zodResolver(updateWorkoutValidator)
  });

  const onSubmit = (data: UpdateWorkoutValidator) => {
    const toastId = toast.loading("Updating workout...");

    updateWorkout(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        toast.success("Successfuly updated workout", { id: toastId });
        push(`/workout/${workoutId}`);
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className='text-xl font-bold'>Edit {workout?.name} details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='field'>
          <label htmlFor='name'>Update name:</label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {workout?.name}
          </p>

          <input
            {...register("name")}
            type='text'
            id='name'
            className='input'
          />

          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='field'>
          <label htmlFor='date-done'>Update date done:</label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {workout?.createdAt.toLocaleDateString()}
          </p>

          <input
            {...register("createdAt")}
            type='date'
            id='date-done'
            className='input'
          />

          {errors.createdAt && (
            <p className='text-red-500'>{errors.createdAt.message}</p>
          )}
        </div>

        <button type='submit' disabled={isUpdating} className='button-create'>
          Update
        </button>
      </form>
    </>
  );
};

export default function EditWorkoutPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <EditWorkoutForm workoutId={query.id} />
      </main>
    </>
  );
}
