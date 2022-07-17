import Link from "next/link";
import Loader from "@/components/common/loader";
import Header from "@/components/common/header";
import DateBar from "@/components/fields/date-bar";
import EntryCard from "@/components/cards/entry-card";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDateFilter } from "@/utils/hooks/use-date-filter";
import { HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useProfileStore } from "@/utils/stores";
import { convertKgToLbs } from "@/utils/kg-to-lbs";

export { authorize as getServerSideProps };

interface Props {
  workoutId: string;
}

const Workout = ({ workoutId }: Props) => {
  const { push } = useRouter();
  const { weightUnit } = useProfileStore();
  const ctx = trpc.useContext();

  const { data: workout, isLoading } = trpc.useQuery(
    ["workout.get-by-id", { id: workoutId }],
    {
      enabled: !!workoutId
    }
  );

  const { data: total } = trpc.useQuery(
    ["workout.sum", { id: workout?.id as string }],
    {
      enabled: !!workout?.id
    }
  );

  const { mutate: deleteWorkout, isLoading: isDeleting } = trpc.useMutation(
    ["workout.delete"],
    {
      onSuccess: () => {
        ctx.invalidateQueries(["workout.get-all"]);
        ctx.invalidateQueries(["workout.get-latest"]);
      }
    }
  );

  const [date, setDate] = useState(new Date());
  const filteredData = useDateFilter(date, workout);

  const handleDelete = () => {
    if (workout) {
      const toastId = toast.loading("Deleting workout...");
      deleteWorkout(
        { id: workout.id },
        {
          onError: error => {
            toast.error(`Something went wrong: ${error}`, { id: toastId });
          },
          onSuccess: () => {
            push("/dashboard");
            toast.success("Successfully deleted workout", { id: toastId });
          }
        }
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <section className='flex flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <h1 className='text-lg font-bold sm:text-2xl'>{workout?.name}</h1>
            <p>Last Updated: {workout?.updatedAt.toLocaleDateString()}</p>
          </div>

          <div className='flex flex-wrap gap-2'>
            <Link className='button-edit' href={`/workout/${workout?.id}/edit`}>
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
          {total?._sum.weight && (
            <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
              <h2>Total Weight Lifted</h2>
              <p className='text-xl font-bold'>
                {weightUnit === "kg" && `${total._sum.weight} kg`}
                {weightUnit === "lbs" &&
                  `${convertKgToLbs(total._sum.weight)} lbs`}
              </p>
            </div>
          )}

          {total?._sum.distance && (
            <div className='flex-1 px-4 py-3 rounded-md bg-orange-600 sm:flex-initial'>
              <h2>Total Distance Travelled</h2>
              <p className='text-xl font-bold'>{total._sum.distance} miles</p>
            </div>
          )}
        </section>

        <h2 className='text-lg font-bold sm:text-xl'>Entries</h2>

        <DateBar date={date} setDate={setDate} />

        <section className='space-y-4'>
          {filteredData && filteredData?.entries.length <= 0 && (
            <p className='p-4 bg-zinc-900 rounded-md'>
              No entries found with this date.
            </p>
          )}

          {workout &&
            filteredData?.map(entry => (
              <EntryCard key={entry.id} entry={entry} page='workout' />
            ))}
        </section>
      </main>
    </>
  );
};

export default function WorkoutPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return <Workout workoutId={query.id} />;
}
