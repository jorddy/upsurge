import Link from "next/link";
import { signOut } from "next-auth/react";
import { HiCog, HiLightningBolt, HiLogout } from "react-icons/hi";

export default function OptionsMenu() {
  return (
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
          href='/settings'
          className='flex items-center gap-2 p-4 hover:bg-zinc-700'
        >
          <HiCog className='w-6 h-6' />
          <p>Settings</p>
        </Link>
      </li>
      <li
        role='button'
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className='flex items-center gap-2 p-4 cursor-pointer hover:bg-zinc-700'
      >
        <HiLogout className='w-6 h-6' />
        <p>Sign Out</p>
      </li>
    </ul>
  );
}
