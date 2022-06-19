import { FC, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  HiLogout,
  HiMenu,
  HiOutlineLightningBolt,
  HiUser,
  HiX
} from "react-icons/hi";
import Link from "next/link";
import Button from "@/components/button";
import Image from "next/image";
import Loader from "./loader";

const Header: FC<{ app?: boolean }> = ({ app }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className='relative container mx-auto p-4 flex justify-between items-center'>
      <nav className='flex items-center gap-8'>
        <Link href='/'>
          <p className='text-2xl font-bold flex items-center gap-2'>
            <HiOutlineLightningBolt className='w-9 h-9 text-orange-400 rotate-12' />
            {!app && "Upsurge"}
          </p>
        </Link>

        {!app && (
          <>
            <Link href='/'>
              <a className='hidden hover:opacity-80 hover:underline md:inline'>
                Home
              </a>
            </Link>
            <Link href='/'>
              <a className='hidden hover:opacity-80 hover:underline md:inline'>
                Features
              </a>
            </Link>
          </>
        )}
      </nav>

      {session && (
        <div className='flex items-center gap-4'>
          <p>{session.user?.name}</p>
          {session.user?.image && (
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className='relative w-10 h-10'
            >
              <Image
                className='rounded-full'
                src={session.user?.image as string}
                alt={session.user?.name as string}
                layout='fill'
                objectFit='contain'
              />
            </button>
          )}
        </div>
      )}

      {isOptionsOpen && (
        <ul className='absolute top-16 right-4 space-y-4 bg-slate-900 rounded-md shadow-md overflow-hidden'>
          <li>
            <Link href='/profile'>
              <a className='flex items-center gap-2 p-4 hover:bg-slate-700'>
                <HiUser className='w-6 h-6' />
                <p>Profile</p>
              </a>
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className='flex items-center gap-2 p-4 hover:bg-slate-700'
            >
              <HiLogout className='w-6 h-6' />
              <p>Sign Out</p>
            </button>
          </li>
        </ul>
      )}

      {!session && (
        <>
          <div className='hidden md:flex md:items-center md:gap-8'>
            <Link href='/api/auth/signin'>
              <a className='hover:opacity-80 hover:underline'>Sign In</a>
            </Link>
            <Button onClick={signIn}>Get Started</Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label='Open navigation menu'
            className='md:hidden'
          >
            <HiMenu className='w-8 h-8 cursor-pointer hover:opacity-80' />
          </button>

          {isMenuOpen && (
            <nav
              className='absolute top-4 left-0 w-full p-4 space-y-4 rounded-md bg-slate-900 
              border border-slate-500 animate-scale'
              aria-hidden={isMenuOpen}
            >
              <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold flex items-center gap-2'>
                  <HiOutlineLightningBolt className='w-9 h-9 text-orange-400 rotate-12' />
                  {!app && "Upsurge"}
                </p>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label='Close navigation draw'
                >
                  <HiX className='w-8 h-8 cursor-pointer hover:opacity-80' />
                </button>
              </div>

              <div className='flex justify-between items-center gap-4'>
                <ul className='flex gap-4'>
                  <Link href='/'>
                    <a className='hover:opacity-80 hover:underline'>Home</a>
                  </Link>
                  <Link href='/'>
                    <a className='hover:opacity-80 hover:underline'>Features</a>
                  </Link>
                </ul>

                <Link href='/api/auth/signin'>
                  <a className='hover:opacity-80 hover:underline'>Sign In</a>
                </Link>
              </div>
            </nav>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
