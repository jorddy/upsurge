import Link from "next/link";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";
import { type InferQueryOutput, trpc } from "@/utils/trpc";
import { useProfileStore } from "@/utils/profile-store";
import { convertKgToLbs } from "@/utils/kg-to-lbs";

interface Props {
  entry: InferQueryOutput<"entry.get-by-id">;
  page: "workout" | "exercise";
}

export default function EntryCard({ entry, page }: Props) {
  const ctx = trpc.useContext();
  const { weightUnit } = useProfileStore();

  const { mutate, isLoading } = trpc.useMutation(["entry.delete"], {
    onSuccess: () => {
      if (page === "exercise") {
        ctx.invalidateQueries(["exercise.get-by-id"]);
      }

      if (page === "workout") {
        ctx.invalidateQueries(["workout.get-by-id"]);
      }
    }
  });

  if (!entry) {
    return null;
  }

  const handleDelete = () => {
    let toastId: string;
    toastId = toast.loading("Deleting entry...");

    mutate(
      { id: entry.id },
      {
        onError: error => {
          toast.error(`Something went wrong: ${error}`, { id: toastId });
        },
        onSuccess: () => {
          toast.success("Successfully deleted entry", { id: toastId });
        }
      }
    );
  };

  return (
    <article
      key={entry.id}
      className='p-4 space-y-2 rounded-md bg-zinc-900 border border-zinc-500'
    >
      <div className='flex flex-wrap gap-2 items-center justify-between'>
        <p className='text-xl font-semibold'>
          {entry.createdAt.toLocaleDateString()}
        </p>

        <div className='flex flex-wrap gap-2'>
          <Link
            className='bg-zinc-700 px-3 py-2 rounded-sm hover:bg-zinc-600'
            href={`/entry/${entry.id}`}
          >
            Edit
          </Link>

          <button
            className='button-remove'
            onClick={handleDelete}
            disabled={isLoading}
          >
            <HiX className='h-5 w-5' />
            <p>Delete</p>
          </button>
        </div>
      </div>

      {entry?.exercise && (
        <p className='truncate'>
          <strong>Exercise:</strong> {entry.exercise.name}
        </p>
      )}

      {entry?.notes && (
        <p className='line-clamp-3'>
          <strong>Notes:</strong> {entry.notes}
        </p>
      )}

      <ul>
        {entry.sets?.map(set => (
          <li key={set.id}>
            {set.weight && (
              <>
                {weightUnit === "kg" && `${set.weight} kg - ${set.reps} reps`}
                {weightUnit === "lbs" &&
                  `${convertKgToLbs(set.weight)} kg - ${set.reps} reps`}
              </>
            )}

            {set.distance &&
              `${set.distance}m ${
                set.elevation ? `- ${set.elevation} ft` : ""
              }`}
          </li>
        ))}
      </ul>
    </article>
  );
}
