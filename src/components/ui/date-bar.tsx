import type { Dispatch, SetStateAction } from "react";
import { HiCalendar } from "react-icons/hi";

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

export default function DateBar({ date, setDate }: Props) {
  return (
    <div
      className='flex items-center gap-2 bg-zinc-900 border border-zinc-500 px-3 py-2 
      rounded-md focus-within:outline'
    >
      <HiCalendar className='h-5 w-5 text-gray-400' />
      <input
        className='flex-1 bg-transparent text-gray-400 outline-none'
        id='date'
        type='date'
        value={date.toLocaleDateString("en-CA")}
        onChange={e => {
          if (e.target.valueAsDate) {
            setDate(e.target.valueAsDate);
          }
        }}
      />
    </div>
  );
}
