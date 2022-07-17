import { signIn, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { HiMenu } from "react-icons/hi";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserImage({
  isOptionsOpen,
  setIsOptionsOpen,
  setIsMenuOpen
}: Props) {
  const { data: session, status } = useSession();

  if (session && session.user?.image && session.user.name) {
    return (
      <button onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
        <img
          className='w-10 h-10 rounded-full object-cover'
          src={session.user?.image}
          alt={session.user?.name}
        />
      </button>
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
      </>
    );
  }

  return null;
}
