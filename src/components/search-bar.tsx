import { Dispatch, FC, SetStateAction } from "react";
import { HiSearch } from "react-icons/hi";

const SearchBar: FC<{
  type: "workout" | "exercise";
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}> = ({ type, query, setQuery }) => {
  const text =
    type === "workout" ? "Search workouts..." : "Search exercises...";

  return (
    <div className='flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-md focus-within:outline'>
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
};

export default SearchBar;
