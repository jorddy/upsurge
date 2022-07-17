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
  updateEntryValidator,
  UpdateEntryValidator
} from "@/utils/validators/update-entry";

export { authorize as getServerSideProps };

interface Props {
  entryId: string;
}

const EditEntryForm = ({ entryId }: Props) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();
  const { weightUnit } = useProfileStore();

  const { data: entry, isLoading } = trpc.useQuery([
    "entry.get-by-id",
    { id: entryId }
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateEntryValidator>({
    defaultValues: { entryId },
    resolver: zodResolver(updateEntryValidator)
  });

  const onSubmit = (data: UpdateEntryValidator) => {
    console.log(data);
    // const toastId = toast.loading("Updating entry...");

    // updateEntry(data, {
    //   onError: error => {
    //     toast.error(`Something went wrong: ${error}`, { id: toastId });
    //   },
    //   onSuccess: () => {
    //     toast.success("Successfuly updated workout", { id: toastId });
    //     push(`/workout/${workoutId}`);
    //   }
    // });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className='text-xl font-bold'>
        Edit entry - {entry?.createdAt.toLocaleDateString()}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='field'>
          <label htmlFor='date-done'>Update date done:</label>

          <p className='text-sm text-gray-300'>
            <strong>Current:</strong> {entry?.createdAt.toLocaleDateString()}
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

        {/* <button type='submit' disabled={isUpdating} className='button-create'>
          Update
        </button> */}
      </form>
    </>
  );
};

export default function EditEntryPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return (
    <>
      <Header app />

      <main className='container mx-auto p-4 space-y-6'>
        <EditEntryForm entryId={query.id} />
      </main>
    </>
  );
}
