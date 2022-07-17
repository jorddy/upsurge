import Link from "next/link";
import Loader from "./loader";
import UserImage from "./user-image";
import OptionsMenu from "./options-menu";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { HiMenu, HiOutlineLightningBolt, HiX } from "react-icons/hi";
import MobileMenu from "./mobile-menu";

interface Props {
  app?: boolean;
}

export default function Header({ app }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { status } = useSession();

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

      <UserImage
        isOptionsOpen={isOptionsOpen}
        setIsOptionsOpen={setIsOptionsOpen}
      />

      {isOptionsOpen && <OptionsMenu />}

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
            <MobileMenu
              app={app}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          )}
        </>
      )}
    </header>
  );
}
