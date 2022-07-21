import AppLayout from "@/components/layouts/app-layout";
import Loader from "@/components/ui/loader";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileStore } from "@/utils/profile";
import { trpc } from "@/utils/trpc";
import {
  updateExerciseValidator,
  UpdateExerciseValidator
} from "@/server/shared/update-exercise";
import toast from "react-hot-toast";

export { authorize as getServerSideProps };

type Props = {
  exerciseId: string;
};

const EditExerciseForm = ({ exerciseId }: Props) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();
  const { weightUnit, convertKilosToPounds } = useProfileStore();

  const { data: exercise, isLoading } = trpc.useQuery([
    "exercise.get-by-id",
    { id: exerciseId }
  ]);

  const { mutate: updateExercise, isLoading: isUpdating } = trpc.useMutation(
    ["exercise.update"],
    {
      onSuccess: () =>
        ctx.invalidateQueries(["exercise.get-by-id", { id: exerciseId }])
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateExerciseValidator>({
    defaultValues: { exerciseId },
    resolver: zodResolver(updateExerciseValidator)
  });

  const onSubmit = (data: UpdateExerciseValidator) => {
    const toastId = toast.loading("Updating exercise...");

    updateExercise(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        toast.success("Successfuly updated exercise", { id: toastId });
        push(`/exercise/${exerciseId}`);
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className='text-xl font-bold'>Edit {exercise?.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='field'>
          <label htmlFor='name'>Update name:</label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {exercise?.name}
          </p>

          <input
            {...register("name")}
            type='text'
            id='name'
            className='input'
          />

          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        {exercise?.currentWeight && (
          <div className='field'>
            <label htmlFor='current-weight'>Update current weight (kg):</label>

            <p className='text-sm text-gray-300'>
              <strong>Current:</strong>{" "}
              {weightUnit === "kg" && `${exercise.currentWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.currentWeight)} lbs`}
            </p>

            <input
              {...register("currentWeight")}
              type='number'
              id='current-weight'
              className='input'
            />

            {errors.currentWeight && (
              <p className='text-red-500'>{errors.currentWeight.message}</p>
            )}
          </div>
        )}

        {exercise?.targetWeight && (
          <div className='field'>
            <label htmlFor='target-weight'>Update target weight (kg):</label>

            <p className='text-sm text-gray-300'>
              <strong>Current:</strong>{" "}
              {weightUnit === "kg" && `${exercise.targetWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.targetWeight)} lbs`}
            </p>

            <input
              {...register("targetWeight")}
              type='number'
              id='target-weight'
              className='input'
            />

            {errors.targetWeight && (
              <p className='text-red-500'>{errors.targetWeight.message}</p>
            )}
          </div>
        )}

        {exercise?.currentDistance && (
          <div className='field'>
            <label htmlFor='current-distance'>
              Update current distance (miles):
            </label>

            <p className='text-sm text-gray-300'>
              <strong>Current:</strong> {exercise.currentDistance} miles
            </p>

            <input
              {...register("currentDistance")}
              type='number'
              id='current-distance'
              className='input'
            />

            {errors.currentDistance && (
              <p className='text-red-500'>{errors.currentDistance.message}</p>
            )}
          </div>
        )}

        {exercise?.targetDistance && (
          <div className='field'>
            <label htmlFor='target-distance'>
              Update target distance (miles):
            </label>

            <p className='text-sm text-gray-300'>
              <strong>Current:</strong> {exercise.targetDistance} miles
            </p>

            <input
              {...register("targetDistance")}
              type='number'
              id='target-distance'
              className='input'
            />

            {errors.targetDistance && (
              <p className='text-red-500'>{errors.targetDistance.message}</p>
            )}
          </div>
        )}

        <button type='submit' disabled={isUpdating} className='button-create'>
          Update
        </button>
      </form>
    </>
  );
};

export default function EditExercisePage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return (
    <AppLayout>
      <EditExerciseForm exerciseId={query.id} />
    </AppLayout>
  );
}
