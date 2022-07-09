import Link from "next/link";
import { useQueryClient } from "react-query";
import { Entry, Exercise, Set } from "@prisma/client";
import { useDeleteEntry } from "@/hooks/mutations/use-delete-entry";
import { HiX } from "react-icons/hi";

export default function EntryCard({
  entry,
  page,
  pageId
}: {
  entry: Entry & { sets: Set[]; exercise?: Exercise };
  page: "workout" | "exercise";
  pageId: string;
}) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteEntry(queryClient, page, pageId);

  const handleDelete = () => {
    mutate({ id: entry.id });
  };

  return (
    <article key={entry.id} className='p-4 space-y-2 rounded-md bg-zinc-900'>
      <div className='flex flex-wrap gap-2 items-center justify-between'>
        <p className='text-xl font-semibold'>
          {new Date(entry.createdAt).toLocaleDateString()}
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
        <p className='truncate'>
          <strong>Notes:</strong> {entry.notes}
        </p>
      )}

      <ul>
        {entry.sets.map(set => (
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
