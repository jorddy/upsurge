import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserImage({ isOptionsOpen, setIsOptionsOpen }: Props) {
  const { data: session } = useSession();

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

  return (
    <button
      onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      className='w-10 h-10 rounded-full bg-zinc-900 border border-zinc-900'
    >
      P
    </button>
  );
}
