import { Fragment, MutableRefObject, Ref, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { measurements } from "../static/measurements";
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import React from "react";

export const splitAndCapitalize = (s: string) => {
  const newS = s.split(/(?=[A-Z])/).join(" ");
  return newS[0].toUpperCase() + newS.slice(1);
};

export const MeasurementInput = ({
  selec,
  changeable,
  value,
  onChange,
  ...props
}: any) => {
  const [selected, setSelected] = useState(selec);

  return (
    <div className="flex gap-4 items-center">
      <div className="w-[320px] relative">
        <Listbox value={selected} onChange={changeable && setSelected}>
          <Listbox.Button
            className={`relative w-full py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
              !changeable && "pointer-events-none"
            }`}
          >
            <span className="block truncate max-w-[170px]">
              {splitAndCapitalize(selected)}
            </span>
            <span
              className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ${
                !changeable && "hidden"
              }`}
            >
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
            <Listbox.Options className="z-[9999] absolute -bottom-12 max-h-60 overflow-auto rounded-md bg-white py-1 text-base border border-[#F4F5F6] focus:outline-none sm:text-sm">
              {Object.keys(measurements)
                .slice(7)
                .map((parameter, idx) => (
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
                          className={`block truncate ${
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
      <input
        className="w-3/5 h-full outline-none px-1 border-b border-black text-[#DB302B]"
        type="number"
        {...props}
        step={0.01}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
