import Header from "@/components/header";
import Loader from "@/components/loader";
import EntryForm from "@/components/entry-form";
import WorkoutForm from "@/components/workout-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateEntryPage = () => {
  const { query } = useRouter();
  const { data: session, status } = useSession();

  const [option, setOption] = useState<"workout" | "exercise" | null>(
    query.option === "workout" ? "exercise" : "exercise" ? "exercise" : null
  );

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") signIn();

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-6'>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Log a new entry</h1>
            <p>
              Here you can log a collection of entries you have done through a
              workout or a one-off exercise.
            </p>
          </div>

          <fieldset className='space-y-2'>
            <legend className='font-semibold'>
              What would you like to log?
            </legend>

            <div className='flex gap-4'>
              <label htmlFor='workout'>
                <input
                  className='mr-2'
                  type='radio'
                  id='workout'
                  value='workout'
                  checked={option === "workout"}
                  onChange={e => setOption(e.target.value as "workout")}
                />
                Workout
              </label>

              <label htmlFor='exercise'>
                <input
                  className='mr-2'
                  type='radio'
                  id='exercise'
                  value='exercise'
                  checked={option === "exercise"}
                  onChange={e => setOption(e.target.value as "exercise")}
                />
                Exercise
              </label>
            </div>
          </fieldset>

          {option === "workout" && <WorkoutForm />}
          {option === "exercise" && <EntryForm />}
        </main>
      </>
    );
  }
};

export default CreateEntryPage;
