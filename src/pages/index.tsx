import Header from "@/components/header";
import Footer from "@/components/footer";
import Button from "@/components/button";
import { FaDumbbell } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />

      <main className='container mx-auto p-4'>
        <section className='py-8 space-y-6 max-w-3xl mx-auto sm:text-center sm:py-16'>
          <h1 className='text-3xl font-bold md:text-6xl'>
            The simpiler way to log your gym workouts.
          </h1>
          <p className='text-xl text-gray-300'>
            No ads, automation, and the ability to share with friends. Upsurge
            is the app that gets out of your way and lets you focus on what
            really matters.
          </p>
          <Button
            onClick={() =>
              signIn("google", { redirect: true, callbackUrl: "/dashboard" })
            }
            className='sm:mx-auto'
          >
            Get Started
          </Button>
        </section>

        <section className='py-8 space-y-6 max-w-3xl mx-auto sm:py-16'>
          <h2 className='text-center text-2xl font-semibold md:text-4xl'>
            The workout logger that gets out of your way.
          </h2>
          <p className='text-center text-lg text-gray-300'>
            Upsurge is built for people who want to get serious about
            progression and manage their own workouts.
          </p>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
            <div className='space-y-4'>
              <div className='bg-slate-900 rounded-md p-2 max-w-fit'>
                <FaDumbbell className='w-8 h-8' />
              </div>
              <h3 className='font-bold'>Powerful logging capablities</h3>
              <p>
                Structure your workouts however you wish, are you aiming to
                progress, or just wanting a way to consistently stick to your
                goals. Upsurge has got you covered.
              </p>
            </div>
            <div className='space-y-4'>
              <div className='bg-slate-900 rounded-md p-2 max-w-fit'>
                <FaDumbbell className='w-8 h-8' />
              </div>
              <h3 className='font-bold'>Powerful logging capablities</h3>
              <p>
                Structure your workouts however you wish, are you aiming to
                progress, or just wanting a way to consistently stick to your
                goals. Upsurge has got you covered.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
