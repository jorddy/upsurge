import Link from "next/link";
import Loader from "@/components/ui/loader";
import AppLayout from "@/components/layouts/app-layout";
import DateBar from "@/components/ui/date-bar";
import EntryCard from "@/components/cards/entry-card";
import EmptyCard from "@/components/cards/empty-card";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { useDateFilter } from "@/utils/use-date-filter";
import { trpc } from "@/utils/trpc";
import { useProfileStore } from "@/utils/profile";
import toast from "react-hot-toast";

export { authorize as getServerSideProps };

type Props = {
  exerciseId: string;
};

const Exercise = ({ exerciseId }: Props) => {
  const { push } = useRouter();
  const { weightUnit, convertKilosToPounds } = useProfileStore();
  const ctx = trpc.useContext();

  const { data: exercise, isLoading } = trpc.useQuery(
    ["exercise.get-by-id", { id: exerciseId }],
    {
      enabled: !!exerciseId
    }
  );

  const { mutate: deleteExercise, isLoading: isDeleting } = trpc.useMutation(
    ["exercise.delete"],
    {
      onSuccess: () => ctx.invalidateQueries(["exercise.get-all"])
    }
  );

  const [date, setDate] = useState(new Date());
  const filteredData = useDateFilter(date, exercise);

  const handleDelete = () => {
    if (exercise) {
      const toastId = toast.loading("Deleting exercise...");
      deleteExercise(
        { id: exercise.id },
        {
          onError: error => {
            toast.error(`Something went wrong: ${error}`, { id: toastId });
          },
          onSuccess: () => {
            push("/dashboard");
            toast.success("Successfully deleted exercise", { id: toastId });
          }
        }
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <section className='flex flex-wrap items-center justify-between gap-2'>
        <div className='space-y-1'>
          <h1 className='text-lg font-bold sm:text-2xl'>{exercise?.name}</h1>

          <p>Last Updated: {exercise?.updatedAt.toLocaleDateString()}</p>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Link className='button-edit' href={`/exercise/${exercise?.id}/edit`}>
            Edit
          </Link>

          <button
            className='button-remove'
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <HiX className='h-5 w-5' />
            <p>Delete</p>
          </button>
        </div>
      </section>

      <section className='flex flex-col gap-4 sm:flex-row'>
        {exercise?.targetWeight && (
          <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
            <h2>Target Weight</h2>
            <p className='text-xl font-bold'>
              {weightUnit === "kg" && `${exercise.targetWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.targetWeight)} lbs`}
            </p>
          </div>
        )}

        {exercise?.currentWeight && (
          <div className='flex-1 px-4 py-3 rounded-md bg-zinc-900 sm:flex-initial'>
            <h2>Current Weight</h2>
            <p className='text-xl font-bold'>
              {weightUnit === "kg" && `${exercise.currentWeight} kg`}
              {weightUnit === "lbs" &&
                `${convertKilosToPounds(exercise.currentWeight)} lbs`}
            </p>
          </div>
        )}

        {exercise?.targetDistance && (
          <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
            <h2>Target Distance</h2>
            <p className='text-xl font-bold'>{exercise.targetDistance} miles</p>
          </div>
        )}

        {exercise?.currentDistance && (
          <div className='flex-1 px-4 py-3 rounded-md bg-zinc-900 sm:flex-initial'>
            <h2>Current Distance</h2>
            <p className='text-xl font-bold'>
              {exercise.currentDistance} miles
            </p>
          </div>
        )}
      </section>

      <h2 className='text-lg font-bold sm:text-xl'>Entries</h2>

      <DateBar date={date} setDate={setDate} />

      <section className='space-y-4'>
        {filteredData && filteredData.length === 0 && (
          <EmptyCard>No entries found with this date</EmptyCard>
        )}

        {exercise &&
          filteredData?.map(entry => (
            <EntryCard key={entry.id} entry={entry} page='exercise' />
          ))}
      </section>
    </>
  );
};

export default function ExercisePage() {
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
      <Exercise exerciseId={query.id} />
    </AppLayout>
  );
}
