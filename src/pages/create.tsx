import Header from "@/components/header";
import Loader from "@/components/loader";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const CreateExercisePage = () => {
  const { data: session, status } = useSession();
  const [option, setOption] = useState("");

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") signIn();

  if (session) {
    return (
      <>
        <Header app />

        <main className='container mx-auto p-4 space-y-8'>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Log a workout or exercise</h1>
            <p>
              Here you can log a collection of exercises through a workout or a
              one-off exercise.
            </p>
          </div>

          <fieldset>
            <legend>What would you like to log?</legend>
            <div className='flex gap-4'>
              <label htmlFor='workout-option'>
                <input
                  className='mr-2'
                  type='radio'
                  id='workout-option'
                  value='workout'
                  checked={option === "workout"}
                  onChange={e => setOption(e.target.value)}
                />
                Workout
              </label>
              <label htmlFor='exercise-option'>
                <input
                  className='mr-2'
                  type='radio'
                  id='exercise-option'
                  value='exercise'
                  checked={option === "exercise"}
                  onChange={e => setOption(e.target.value)}
                />
                Exercise
              </label>
            </div>
          </fieldset>

          {/* Workout form */}
          <form></form>

          {/* Exercise form */}
          <form></form>
        </main>
      </>
    );
  }
};

export default CreateExercisePage;
