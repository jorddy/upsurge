import Header from "@/components/common/header";
import EntryForm from "@/components/forms/entry-form";
import WorkoutForm from "@/components/forms/workout-form";
import { authorize } from "@/utils/authorize";
import { useRouter } from "next/router";
import { useState } from "react";

export { authorize as getServerSideProps };

export default function CreateEntryPage() {
  const { query } = useRouter();

  const [option, setOption] = useState<"workout" | "exercise" | null>(
    query.option === "workout"
      ? "workout"
      : query.option === "exercise"
      ? "exercise"
      : null
  );

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
          <legend className='font-semibold'>What would you like to log?</legend>

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
