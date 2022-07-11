import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDeleteEntry } from "@/hooks/mutations/use-delete-entry";
import { HiX } from "react-icons/hi";
import { EntryType } from "@/hooks/queries/validators";

export default function EntryCard({
  entry,
  page,
  pageId
}: {
  entry: EntryType;
  page: "workout" | "exercise";
  pageId: string;
}) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteEntry(queryClient, page, pageId);

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
    <article key={entry.id} className='p-4 space-y-2 rounded-md bg-zinc-900'>
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
            {set.weight && `${set.weight}kg - ${set.reps} reps`}

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
