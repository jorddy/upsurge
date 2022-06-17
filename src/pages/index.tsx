import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <header>
        <nav className='container mx-auto p-4 flex justify-between items-center'>
          <p className='text-2xl font-bold italic'>Upsurge</p>
          <button
            className='flex justify-between items-center gap-2 p-4 bg-gray-900'
            onClick={() => signIn("google")}
          >
            <FaGoogle />
            <p>Sign In With Google</p>
          </button>
        </nav>
      </header>

      <main>
        <section className='container mx-auto p-4 flex gap-12'>
          <div>
            <h1 className='text-6xl font-bold'>
              The easier way to manage your{" "}
              <span className='text-orange-400'>workouts</span>
            </h1>
          </div>
          <div>
            <h1>awdwa</h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
