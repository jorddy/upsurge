import { Dispatch, SetStateAction } from "react";
import { HiCalendar } from "react-icons/hi";

export default function DateBar({
  date,
  setDate
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <div className='flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-md focus-within:outline'>
      <HiCalendar className='h-5 w-5 text-gray-400' />
      <input
        className='flex-1 bg-transparent text-gray-400 outline-none'
        id='date'
        type='date'
        value={date.toLocaleDateString("en-CA")}
        onChange={e => setDate(e.target.valueAsDate as Date)}
      />
    </div>
  );
}
