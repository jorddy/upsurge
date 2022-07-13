import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormRegister
} from "react-hook-form";
import { HiX } from "react-icons/hi";
import { WorkoutValidator } from "@/utils/validators";

const Set = ({
  cardio,
  entryIndex,
  setIndex,
  register,
  remove
}: {
  cardio?: boolean;
  entryIndex: number;
  setIndex: number;
  register: UseFormRegister<WorkoutValidator>;
  remove: UseFieldArrayRemove;
}) => {
  return (
    <div className='py-4 px-6 bg-zinc-800 rounded-md'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div className='self-start flex gap-2 sm:flex-col'>
          <p>Set</p>
          <p>{setIndex + 1}</p>
        </div>

        <div className='field'>
          <label htmlFor={cardio ? "distance" : "reps"}>
            {cardio ? "Distance (miles)" : "Reps"}
          </label>

          <input
            {...register(
              cardio
                ? `entries.${entryIndex}.sets.${setIndex}.distance`
                : `entries.${entryIndex}.sets.${setIndex}.reps`
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
              cardio
                ? `entries.${entryIndex}.sets.${setIndex}.elevation`
                : `entries.${entryIndex}.sets.${setIndex}.weight`
            )}
            className='input-small'
            type='number'
            id={cardio ? "distance" : "reps"}
            step='0.01'
          />
        </div>

        <button className='button-remove' onClick={() => remove(setIndex)}>
          <HiX className='h-5 w-5' />
          <p className='hidden sm:inline'>Remove set</p>
        </button>
      </div>
    </div>
  );
};

export default function WorkoutSetForm({
  cardio,
  index,
  control,
  register
}: {
  cardio?: boolean;
  index: number;
  control: Control<WorkoutValidator>;
  register: UseFormRegister<WorkoutValidator>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `entries.${index}.sets`
  });

  return (
    <div className='space-y-6'>
      <h3 className='font-semibold'>Sets</h3>

      {fields.map((set, setIndex) => (
        <Set
          key={set.id}
          entryIndex={index}
          setIndex={setIndex}
          cardio={cardio}
          register={register}
          remove={remove}
        />
      ))}

      <button
        className='px-4 py-3 border border-dashed w-full'
        type='button'
        onClick={() => append({})}
      >
        + Add set
      </button>

      <div className='field'>
        <label htmlFor='notes'>Notes</label>
        <textarea
          {...register(`entries.${index}.notes`)}
          className='input bg-zinc-700 min-h-[100px]'
          id='notes'
        />
      </div>
    </div>
  );
}
