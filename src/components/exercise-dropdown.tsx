import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";
import { useExercises } from "@/hooks/queries/use-exercises";

const ExerciseDropdown = () => {
  const { data, isLoading } = useExercises();
  const [selectedExercise, setSelectedExercise] = useState([]);

  return (
    <Combobox value={selectedExercise} onChange={setSelectedExercise} multiple>
      <div className='flex flex-col'>
        <Combobox.Input
          onChange={() => {}}
          autoComplete='off'
          className='input'
          displayValue={(people: any) =>
            people.map((person: any) => person.name).join(", ")
          }
        />
        <Combobox.Options className='mt-2 bg-slate-900'>
          {!isLoading &&
            data?.map(exercise => (
              <Combobox.Option key={exercise.id} value={exercise.id}>
                {({ active, selected }) => (
                  <li
                    className={`px-2 py-1 flex items-center gap-1 ${
                      active && "bg-slate-700"
                    }`}
                  >
                    {selected && <HiCheck className='h-5 w-5' />}
                    {exercise.name}
                  </li>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default ExerciseDropdown;
