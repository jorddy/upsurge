import WebLayout from "@/components/layouts/web-layout";
import { signIn } from "next-auth/react";
import {
  HiBookOpen,
  HiChartBar,
  HiLockClosed,
  HiPencilAlt
} from "react-icons/hi";

export default function Home() {
  return (
    <WebLayout>
      <section className='py-8 space-y-6 max-w-3xl mx-auto sm:text-center sm:py-16'>
        <h1 className='text-3xl font-bold md:text-6xl'>
          The simpler way to log your workouts.
        </h1>
        <p className='text-xl text-gray-300'>
          No ads and the ability to share with friends. Upsurge is the app that
          gets out of your way and lets you focus on what really matters.
        </p>
        <button
          className='button mx-auto'
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/dashboard" })
          }
        >
          Get Started
        </button>
      </section>

      <section id='features' className='py-8 max-w-3xl mx-auto sm:py-16'>
        <h2 className='text-center text-2xl font-semibold md:text-4xl'>
          The workout logger that gets out of your way.
        </h2>
        <p className='mt-4 text-center text-lg text-gray-300'>
          Upsurge is built for people who want to get serious about progression
          and manage their own workouts.
        </p>

        <div className='mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2'>
          <div className='space-y-4 text-center'>
            <div className='p-3 max-w-fit mx-auto bg-zinc-900 border border-zinc-500 rounded-md'>
              <HiPencilAlt className='w-8 h-8' />
            </div>
            <h3 className='font-bold'>Flexible Ways To Log</h3>
            <p className='text-gray-300'>
              Structure your workouts however you wish, are you aiming to
              progress, or just wanting a way to consistently stick to your
              goals. Upsurge has got you covered.
            </p>
          </div>

          <div className='space-y-4 text-center'>
            <div className='p-3 max-w-fit mx-auto bg-zinc-900 border border-zinc-500 rounded-md'>
              <HiBookOpen className='w-8 h-8' />
            </div>
            <h3 className='font-bold'>Your Workout Diary</h3>
            <p className='text-gray-300'>
              Improve your workouts through custom notes, figured out where you
              went wrong or things you can do better - you can record them
              against your workouts.
            </p>
          </div>

          <div className='space-y-4 text-center'>
            <div className='p-3 max-w-fit mx-auto bg-zinc-900 border border-zinc-500 rounded-md'>
              <HiLockClosed className='w-8 h-8' />
            </div>
            <h3 className='font-bold'>Private, Secure & No Ads</h3>
            <p className='text-gray-300'>
              We respect your privacy, all data is stored securely and is only
              accessible by you. We do not share your data or advertise anything
              on our platform.
            </p>
          </div>

          <div className='space-y-4 text-center'>
            <div className='p-3 max-w-fit mx-auto bg-zinc-900 border border-zinc-500 rounded-md'>
              <HiChartBar className='w-8 h-8' />
            </div>
            <h3 className='font-bold'>Analytical Reporting</h3>
            <p className='text-gray-300'>
              Don&apos; want to track your progress yourself. We provide you
              with a history and progression graphs that you can use to improve
              or reflect on your workouts.
            </p>
          </div>
        </div>
      </section>

      <section className='py-8 max-w-3xl mx-auto sm:py-16'>
        <h2 className='text-center text-2xl font-semibold md:text-4xl'>
          What are you waiting for?
        </h2>
        <button
          className='button mt-6 block mx-auto'
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/dashboard" })
          }
        >
          Get Started Now
        </button>
      </section>
    </WebLayout>
  );
}
