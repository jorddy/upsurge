import { Tab } from "@headlessui/react";
import { FC, Fragment, PropsWithChildren } from "react";

const TabComponent: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={`mr-4 ${
            selected &&
            "bg-orange-600 px-4 py-2 rounded-md font-bold outline-none"
          }`}
        >
          {children}
        </button>
      )}
    </Tab>
  );
};

export default TabComponent;
