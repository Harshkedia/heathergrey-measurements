import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheck2, BsChevronDown } from "react-icons/bs";
import { splitAndCapitalize } from "./MeasurementInput";

export const Select = ({ items, selected, setSelected }: any) => (
  <div className="w-[140px] relative">
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button className="relative border-gray-200 border-b w-full bg-white py-1 pr-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate text-[#DB302B] text-[16px]">
          {splitAndCapitalize(selected)}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <BsChevronDown
            className="h-4 w-4 text-[#DB302B]"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="z-[999] absolute -bottom-32 max-h-60 overflow-auto rounded-md bg-white py-1 text-base border border-[#F4F5F6] focus:outline-none sm:text-sm">
          {items.map((parameter: any, idx: number) => (
            <Listbox.Option
              key={idx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-gray-100 text-[#DB302B]" : "text-gray-900"
                }`
              }
              value={parameter}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate capitalize ${
                      selected ? "text-[#DB302B]" : "font-normal"
                    }`}
                  >
                    {splitAndCapitalize(parameter)}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#DB302B]">
                      <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  </div>
);
