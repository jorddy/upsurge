import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { HiMenu, HiOutlineLightningBolt, HiX } from "react-icons/hi";
import Link from "next/link";
import Button from "@/components/button";

const Header: FC<{ app?: boolean }> = ({ app }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <div className='hidden md:flex md:items-center md:gap-8'>
        <Link href='/api/auth/signin'>
          <a className='hover:opacity-80 hover:underline'>Sign In</a>
        </Link>
        <Button onClick={signIn}>Get Started</Button>
      </div>

      <button
        onClick={() => setIsMenuOpen(true)}
        aria-label='Open navigation menu'
      >
        <HiMenu className='w-8 h-8 cursor-pointer hover:opacity-80 md:hidden' />
      </button>

      {isMenuOpen && (
        <nav
          className='absolute top-4 left-0 w-full p-4 rounded-md bg-slate-900 border 
          border-slate-500 animate-scale'
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
        </nav>
      )}
    </header>
  );
};

export default Header;
