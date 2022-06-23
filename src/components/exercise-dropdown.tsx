import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" }
];

const ExerciseDropdown = () => {
  const [selectedPeople, setSelectedPeople] = useState([]);

  return (
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <div className='flex flex-col'>
        <Combobox.Input
          onChange={() => {}}
          className='input'
          displayValue={(people: any) =>
            people.map((person: any) => person.name).join(", ")
          }
        />
        <Combobox.Options className='mt-2 bg-slate-900  '>
          {people.map(person => (
            <Combobox.Option key={person.id} value={person}>
              {({ active, selected }) => (
                <li
                  className={`px-2 py-1 flex items-center gap-1 ${
                    active && "bg-slate-700"
                  }`}
                >
                  {selected && <HiCheck className='' />}
                  {person.name}
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
