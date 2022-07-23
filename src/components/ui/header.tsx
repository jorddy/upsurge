import Link from "next/link";
import Loader from "./loader";
import { Dispatch, SetStateAction, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  HiCog,
  HiLightningBolt,
  HiLogout,
  HiOutlineLightningBolt,
  HiX,
  HiMenu,
  HiStatusOnline,
  HiStatusOffline,
  HiArrowLeft
} from "react-icons/hi";
import { useOnlineStore } from "@/utils/online";

type UserImageProps = {
  isOptionsOpen: boolean;
  setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const UserImage = ({
  isOptionsOpen,
  setIsOptionsOpen,
  setIsMenuOpen
}: UserImageProps) => {
  const { data: session, status } = useSession();
  const { onlineStatus } = useOnlineStore();

  if (session && session.user?.image && session.user.name) {
    return (
      <>
        <button
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className='flex items-center gap-4'
        >
          {onlineStatus && (
            <HiStatusOnline className='w-6 h-6 text-green-400' />
          )}
          {!onlineStatus && (
            <HiStatusOffline className='text-red-400 w-6 h-6' />
          )}
          <img
            className='w-10 h-10 rounded-full object-cover'
            src={session.user?.image}
            alt={session.user?.name}
          />
        </button>
      </>
    );
  }

  if (session && !session.user?.image && session.user.name) {
    return (
      <button
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        className='w-10 h-10 rounded-full bg-zinc-900 text-white 
          font-bold border border-zinc-500 grid place-content-center'
      >
        {session.user.name.charAt(0)}
      </button>
    );
  }

  if (session && !session.user?.image && !session.user.name) {
    return (
      <button
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-900'
      >
        P
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <button
          className='button hidden md:inline'
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/dashboard" })
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
      </>
    );
  }

  return null;
};

const OptionsMenu = () => {
  return (
    <ul
      className='absolute top-16 right-4 bg-zinc-900 border border-zinc-500 
      rounded-md shadow-md overflow-hidden standalone:top-24'
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
};

type MobileMenuProps = {
  app: boolean | undefined;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({ app, isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
  return (
    <nav
      className='absolute top-4 left-0 w-full p-4 space-y-4 rounded-md bg-zinc-900 
      border border-gray-400 animate-scale standalone:top-10'
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
              signIn("google", { redirect: true, callbackUrl: "/dashboard" })
            }
          >
            Sign In
          </button>
        </li>
      </ul>
    </nav>
  );
};

type HeaderProps = {
  app?: boolean;
  dashboard?: boolean;
};

export default function Header({ app, dashboard }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { status } = useSession();

  return (
    <header
      className='container mx-auto p-5 flex justify-between items-center
      standalone:pt-12 standalone:fixed standalone:bg-zinc-900 standalone:border-b standalone:border-zinc-500 standalone:z-50'
    >
      <nav className='flex items-center gap-8'>
        <Link href={app ? "/dashboard" : "/"}>
          <p className='text-2xl font-bold flex items-center gap-2 cursor-pointer hover:opacity-80'>
            {!dashboard && (
              <HiArrowLeft className='hidden w-6 h-6 standalone:inline' />
            )}
            <HiOutlineLightningBolt className='w-9 h-9 text-orange-600 rotate-12' />
            {!app && "Upsurge"}
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

      {status === "loading" && <Loader inline />}

      <UserImage
        isOptionsOpen={isOptionsOpen}
        setIsOptionsOpen={setIsOptionsOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {isOptionsOpen && <OptionsMenu />}

      {isMenuOpen && (
        <MobileMenu
          app={app}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </header>
  );
}
