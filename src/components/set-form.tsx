import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister
} from "react-hook-form";
import { CreateEntryInput } from "@/utils/validators";
import { HiX } from "react-icons/hi";

export default function SetForm({
  cardio,
  set,
  index,
  remove,
  register
}: {
  cardio?: boolean;
  workoutSet?: boolean;
  set: FieldArrayWithId<CreateEntryInput, "sets", "id">;
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<CreateEntryInput>;
}) {
  return (
    <div key={set.id} className='py-4 px-6 bg-zinc-900 rounded-md'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div className='self-start flex gap-2 sm:flex-col'>
          <p>Set</p>
          <p>{index + 1}</p>
        </div>

        <div className='field'>
          <label htmlFor={cardio ? "distance" : "reps"}>
            {cardio ? "Distance (miles)" : "Reps"}
          </label>

          <input
            {...register(
              cardio ? `sets.${index}.distance` : `sets.${index}.reps`
            )}
            className='input-small'
            type='number'
            id={cardio ? "distance" : "reps"}
            step={cardio ? "0.01" : "0"}
          />
        </div>

        <div className='field'>
          <label htmlFor={cardio ? "elevation" : "weight"}>
            {cardio ? "Elevation (ft)" : "Weight (kg)"}
          </label>

          <input
            {...register(
              cardio ? `sets.${index}.elevation` : `sets.${index}.weight`
            )}
            className='input-small'
            type='number'
            id={cardio ? "distance" : "reps"}
            step='0.01'
          />
        </div>

        <button className='button-remove' onClick={() => remove(index)}>
          <HiX className='h-5 w-5' />
          <p className='hidden sm:inline'>Remove set</p>
        </button>
      </div>
    </div>
  );
}
