import { Tab } from "@headlessui/react";
import { Fragment, type PropsWithChildren } from "react";

export default function TabComponent({ children }: PropsWithChildren<{}>) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={`mr-4 px-3 py-2 rounded-md outline-none hover:bg-zinc-900 ${
            selected && "bg-orange-600 font-bold hover:bg-orange-600"
          }`}
        >
          {children}
        </button>
      )}
    </Tab>
  );
}
