import Button from "@/components/button";
import Header from "@/components/header";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <>
      <Header />

      <main className='container mx-auto p-4'>
        <section className='py-16 space-y-8 max-w-3xl mx-auto sm:text-center'>
          <h1 className='text-3xl font-bold md:text-6xl'>
            The simpiler way to log your gym workouts.
          </h1>
          <p className='text-xl text-gray-300'>
            No ads, automation, and the ability to share with friends. Upsurge
            is the app that gets out of your way and lets you focus on what
            really matters.
          </p>
          <Button onClick={signIn} className='sm:mx-auto'>
            Get Started
          </Button>
        </section>
      </main>
    </>
  );
};

export default Home;
