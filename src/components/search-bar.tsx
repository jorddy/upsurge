import { Dispatch, SetStateAction } from "react";
import { HiSearch } from "react-icons/hi";

interface Props {
  type: "workout" | "exercise";
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ type, query, setQuery }: Props) {
  const text =
    type === "workout" ? "Search workouts..." : "Search exercises...";

  return (
    <div
      className='flex px-4 py-3 items-center gap-2 bg-zinc-900 border border-zinc-500 
      rounded-md focus-within:outline'
    >
      <HiSearch className='h-5 w-5 text-gray-400' />
      <input
        className='flex-1 bg-transparent text-gray-400 outline-none'
        type='search'
        placeholder={text}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
