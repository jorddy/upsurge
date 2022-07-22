import AppLayout from "@/components/layouts/app-layout";
import Loader from "@/components/ui/loader";
import {
  UpdateEntryValidator,
  updateEntryValidator
} from "@/server/shared/update-entry";
import { authorize } from "@/utils/authorize";
import { useProfileStore } from "@/utils/profile";
import { InferQueryOutput, trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";

export { authorize as getServerSideProps };

type SetFormProps = {
  set: UpdateEntryValidator["sets"][0]["data"];
  index: number;
  cardio?: boolean;
  register: UseFormRegister<UpdateEntryValidator>;
  entryId: string;
  page: "workout" | "exercise";
};

const SetForm = ({
  set,
  index,
  cardio,
  register,
  entryId,
  page
}: SetFormProps) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();
  const { weightUnit, convertKilosToPounds } = useProfileStore();

  const { data: entry } = trpc.useQuery(["entry.get-by-id", { id: entryId }]);

  const { mutate: deleteSet, isLoading } = trpc.useMutation(["set.delete"], {
    onSuccess: () => ctx.invalidateQueries(["entry.get-by-id", { id: entryId }])
  });

  const { mutate: deleteEntry } = trpc.useMutation(["entry.delete"], {
    onSuccess: () => {
      if (page === "exercise") {
        ctx.invalidateQueries([
          "exercise.get-by-id",
          { id: entry!.exerciseId }
        ]);
      }

      if (page === "workout") {
        ctx.invalidateQueries(["workout.get-by-id", { id: entry!.workoutId! }]);
      }
    }
  });

  const handleDeleteSet = () => {
    if (entry!.sets.length === 1) {
      const toastId = toast.loading("Deleting set and entry...");

      deleteEntry(
        { id: entryId },
        {
          onError: error => {
            toast.error(`Something went wrong: ${error}`, { id: toastId });
          },
          onSuccess: () => {
            toast.success("Successfully deleted set and entry", {
              id: toastId
            });

            if (page === "workout") {
              push(`/workout/${entry!.workoutId}`);
            }

            if (page === "exercise") {
              push(`/exercise/${entry!.exerciseId}`);
            }
          }
        }
      );
    } else {
      const toastId = toast.loading("Deleting set...");

      deleteSet(
        { id: set.id },
        {
          onError: error => {
            toast.error(`Something went wrong: ${error}`, { id: toastId });
          },
          onSuccess: () => {
            toast.success("Successfully deleted set", { id: toastId });
          }
        }
      );
    }
  };

  return (
    <div className='py-4 px-6 bg-zinc-900 rounded-md border border-zinc-500'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div className='self-start flex gap-2 sm:flex-col'>
          <p>Set</p>
          <p>{index + 1}</p>
        </div>

        <div className='field'>
          <label htmlFor={cardio ? "distance" : "reps"}>
            {cardio ? "Distance (miles)" : "Reps"}
          </label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {cardio && `${set.distance} miles`}
            {!cardio && `${set.reps}`}
          </p>

          <input
            {...register(
              cardio ? `sets.${index}.data.distance` : `sets.${index}.data.reps`
            )}
            className='input-small'
            type='number'
            id={cardio ? "distance" : "reps"}
            step={cardio ? "0.01" : "0"}
          />
        </div>

        <div className='field'>
          <label htmlFor={cardio ? "elevation" : "weight"}>
            {cardio ? "Elevation (ft)" : "Weight (kg)"}
          </label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {cardio && `${set.elevation} ft`}
            {!cardio && weightUnit === "kg" && `${set.weight} kg`}
            {!cardio &&
              weightUnit === "lbs" &&
              `${convertKilosToPounds(set.weight!)} lbs`}
          </p>

          <input
            {...register(
              cardio
                ? `sets.${index}.data.elevation`
                : `sets.${index}.data.weight`
            )}
            className='input-small'
            type='number'
            id={cardio ? "distance" : "reps"}
            step='0.01'
          />
        </div>

        <button
          type='button'
          disabled={isLoading}
          onClick={handleDeleteSet}
          className='button-remove'
        >
          <HiX className='h-5 w-5' />
          <p className='hidden sm:inline'>Remove set</p>
        </button>
      </div>
    </div>
  );
};

type EditEntryFormProps = {
  entry: InferQueryOutput<"entry.get-by-id">;
  page: "workout" | "exercise";
};

const EditEntryForm = ({ entry, page }: EditEntryFormProps) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();

  const initialSets = entry!.sets.map(set => ({
    where: { id: set.id },
    data: set
  }));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateEntryValidator>({
    resolver: zodResolver(updateEntryValidator),
    defaultValues: {
      entryId: entry!.id,
      sets: initialSets
    }
  });

  const { mutate: updateEntry, isLoading: isUpdating } = trpc.useMutation(
    ["entry.update"],
    {
      onSuccess: () => {
        if (page === "exercise") {
          ctx.invalidateQueries([
            "exercise.get-by-id",
            { id: entry!.exerciseId }
          ]);
        }

        if (page === "workout") {
          ctx.invalidateQueries([
            "workout.get-by-id",
            { id: entry!.workoutId! }
          ]);
        }
      }
    }
  );

  const onSubmit = (data: UpdateEntryValidator) => {
    const toastId = toast.loading("Updating entry...");

    updateEntry(data, {
      onError: error => {
        toast.error(`Something went wrong: ${error}`, { id: toastId });
      },
      onSuccess: () => {
        toast.success("Successfully updated entry", { id: toastId });

        if (page === "workout") {
          push(`/workout/${entry!.workoutId}`);
        }

        if (page === "exercise") {
          push(`/exercise/${entry!.exerciseId}`);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='field'>
        <label htmlFor='date'>Update date done:</label>

        <p className='text-sm text-gray-300'>
          <strong>Current:</strong> {entry?.createdAt.toLocaleDateString()}
        </p>

        <input
          {...register("createdAt")}
          type='date'
          id='date'
          className='input'
        />

        {errors.createdAt && (
          <p className='text-red-500'>{errors.createdAt.message}</p>
        )}
      </div>

      <div className='field'>
        <label htmlFor='notes'>Update notes:</label>

        <p className='text-sm text-gray-300'>
          {entry?.notes && (
            <>
              <strong>Current:</strong> {entry?.notes}
            </>
          )}
          {!entry?.notes && ""}
        </p>

        <textarea {...register("notes")} id='notes' className='input-text' />

        {errors.notes && <p className='text-red-500'>{errors.notes.message}</p>}
      </div>

      <h2 className='text-lg font-semibold'>Edit Sets:</h2>

      {entry &&
        entry.sets.map((set, idx) => {
          if (set.reps || set.weight) {
            return (
              <SetForm
                key={set.id}
                set={set}
                index={idx}
                register={register}
                entryId={entry.id}
                page={page}
              />
            );
          }

          if (set.distance || set.elevation) {
            return (
              <SetForm
                key={set.id}
                set={set}
                cardio={true}
                index={idx}
                register={register}
                entryId={entry.id}
                page={page}
              />
            );
          }
        })}

      <button type='submit' disabled={isUpdating} className='button-create'>
        Update
      </button>
    </form>
  );
};

type EditEntryProps = {
  entryId: string;
};

const EditEntry = ({ entryId }: EditEntryProps) => {
  const { query } = useRouter();

  const { data: entry, isLoading } = trpc.useQuery([
    "entry.get-by-id",
    { id: entryId }
  ]);

  if (!query.page || typeof query.page !== "string") {
    return (
      <h1 className='text-center text-2xl font-bold'>
        Error: Wrong query param
      </h1>
    );
  }

  if (isLoading) return <Loader />;

  if (
    (query.page === "workout" && entry) ||
    (query.page === "exercise" && entry)
  )
    return (
      <>
        <div className='space-y-2'>
          <h1 className='text-xl font-bold'>
            Edit entry - {entry.createdAt.toLocaleDateString()}
          </h1>
          <p className='text-gray-300'>Note: All fields are optional</p>
        </div>
        <EditEntryForm entry={entry} page={query.page} />
      </>
    );

  return null;
};

export default function EditEntryPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return (
      <h1 className='text-center text-2xl font-bold'>
        Error: Wrong query param
      </h1>
    );
  }

  return (
    <AppLayout>
      <EditEntry entryId={query.id} />
    </AppLayout>
  );
}
