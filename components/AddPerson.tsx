import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { BsDisplay, BsGenderMale, BsPerson } from "react-icons/bs";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { measurements } from "../static/measurements";
import { Input } from "./Input";

export const AddPerson = ({ open, onClose, onSubmit }: any) => {
  const { register, handleSubmit } = useForm();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="font-medium leading-6 text-gray-900 text-center text-xl"
                >
                  Staff Details
                </Dialog.Title>
                <form
                  className="mt-4 w-full flex flex-col gap-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    Icon={BsPerson}
                    placeholder="Full Name"
                    width="100%"
                    {...register("name")}
                  />
                  <Input
                    Icon={HiOutlineBuildingOffice}
                    placeholder="Department"
                    width="100%"
                    {...register("department")}
                  />
                  <Input
                    Icon={BsDisplay}
                    placeholder="Designation"
                    {...register("designation")}
                    width="100%"
                  />
                  <div className="border bg-[#F8F8F8] flex items-center gap-3 px-4 border-[#d1d5db] focus:border-[#DB302B] h-[54px]">
                    <BsGenderMale className="w-6 h-6" />
                    <div className="bg-gray-200 h-1/2 w-[3px] rounded-lg" />
                    <select
                      className="!outline-none capitalize bg-transparent grow"
                      {...register("gender")}
                    >
                      {Object.keys(measurements).map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="py-2 bg-[#DB302B] text-white mx-40"
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
