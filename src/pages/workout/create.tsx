import Header from "@/components/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { useCreateWorkout } from "@/hooks/mutations/use-create-workout";
import {
  CreateWorkoutType,
  createWorkoutValidator
} from "@/hooks/mutations/validators";
import Loader from "@/components/loader";

const CreateWorkoutPage = () => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const { mutate, isError, isLoading } = useCreateWorkout(queryClient);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateWorkoutType>({
    resolver: zodResolver(createWorkoutValidator)
  });

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") signIn();

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-8'>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Create your workout</h1>
            <p>
              Begin with a name for your workout and add exercises from there
            </p>
          </div>

          <form
            className='space-y-4'
            onSubmit={handleSubmit(data => console.log(data))}
          >
            <div className='field'>
              <label htmlFor='name'>Name:</label>
              <input {...register("name")} className='input' />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='px-4 py-2 bg-orange-600 text-slate-900 rounded-sm 
              transition hover:scale-95'
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </main>
      </>
    );
  }
};

export default CreateWorkoutPage;
