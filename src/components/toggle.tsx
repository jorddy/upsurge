import { Switch } from "@headlessui/react";

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <Switch.Group>
      <div className='flex items-center'>
        <Switch.Label className='pr-4'>{label}</Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
