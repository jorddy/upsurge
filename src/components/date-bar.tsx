import { Dispatch, FC, SetStateAction } from "react";
import { HiCalendar } from "react-icons/hi";

const DateBar: FC<{}> = ({}) => {
  return (
    <div className='flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-md focus-within:outline'>
      <HiCalendar className='h-5 w-5 text-gray-400' />
      <input
        className='flex-1 bg-transparent text-gray-400 outline-none'
        type='date'
      />
    </div>
  );
};

export default DateBar;
