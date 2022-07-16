import Link from "next/link";
import Image from "next/image";
import Loader from "./loader";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  HiLightningBolt,
  HiLogout,
  HiMenu,
  HiOutlineLightningBolt,
  HiUser,
  HiX
} from "react-icons/hi";

interface Props {
  app?: boolean;
}

export default function Header({ app }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className='relative container mx-auto p-4 flex justify-between items-center'>
      <nav className='flex items-center gap-8'>
        <Link href={app ? "/dashboard" : "/"}>
          <p className='text-2xl font-bold flex items-center gap-2 cursor-pointer hover:opacity-80'>
            <HiOutlineLightningBolt className='w-9 h-9 text-orange-600 rotate-12' />
            {!app ? "Upsurge" : "Alpha"}
          </p>
        </Link>

        {!app && (
          <>
            <Link
              href='/'
              className='hidden hover:opacity-80 hover:underline md:inline'
            >
              Home
            </Link>
            <a
              href='#features'
              className='hidden hover:opacity-80 hover:underline md:inline'
            >
              Features
            </a>
          </>
        )}
      </nav>

      {session && session.user?.image && (
        <button
          className='relative w-10 h-10'
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <Image
            className='rounded-full object-contain'
            layout='fill'
            src={session.user?.image as string}
            alt={session.user?.name as string}
          />
        </button>
      )}

      {isOptionsOpen && (
        <ul
          className='absolute top-16 right-4 bg-zinc-900 border border-zinc-500 
          rounded-md shadow-md overflow-hidden'
        >
          <li>
            <Link
              href='/dashboard'
              className='flex items-center gap-2 p-4 hover:bg-zinc-700'
            >
              <HiLightningBolt className='w-6 h-6' />
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              href='/profile'
              className='flex items-center gap-2 p-4 hover:bg-zinc-700'
            >
              <HiUser className='w-6 h-6' />
              <p>Profile</p>
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className='flex items-center gap-2 p-4 hover:bg-zinc-700'
            >
              <HiLogout className='w-6 h-6' />
              <p>Sign Out</p>
            </button>
          </li>
        </ul>
      )}

      {status === "loading" && <Loader inline />}

      {status === "unauthenticated" && (
        <>
          <button
            className='button hidden md:inline'
            onClick={() =>
              signIn("", { redirect: true, callbackUrl: "/dashboard" })
            }
          >
            Get Started Now
          </button>

          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(true)}
            aria-label='Open navigation menu'
          >
            <HiMenu className='w-8 h-8 cursor-pointer hover:opacity-80' />
          </button>

          {isMenuOpen && (
            <nav
              className='absolute top-4 left-0 w-full p-4 space-y-4 rounded-md bg-zinc-900 
              border border-gray-400 animate-scale'
              aria-hidden={isMenuOpen}
            >
              <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold flex items-center gap-2'>
                  <HiOutlineLightningBolt className='w-9 h-9 text-orange-600 rotate-12' />
                  {!app && "Upsurge"}
                </p>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label='Close navigation draw'
                >
                  <HiX className='w-8 h-8 cursor-pointer hover:opacity-80' />
                </button>
              </div>

              <ul className='flex gap-4 justify-between'>
                <li className='flex gap-2'>
                  <Link href='/' className='hover:opacity-80 hover:underline'>
                    Home
                  </Link>
                  <Link href='/' className='hover:opacity-80 hover:underline'>
                    Features
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() =>
                      signIn("", { redirect: true, callbackUrl: "/dashboard" })
                    }
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </header>
  );
}
