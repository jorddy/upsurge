import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { HiOutlineLightningBolt, HiX } from "react-icons/hi";

interface Props {
  app: boolean | undefined;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({ app, isMenuOpen, setIsMenuOpen }: Props) {
  return (
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
  );
}
