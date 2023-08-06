import Head from "next/head";
import {
  MeasurementInput,
  splitAndCapitalize,
} from "../components/MeasurementInput";
import { loosening, measurements } from "../static/measurements";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { AddPerson } from "../components/AddPerson";
import { Select } from "../components/Select";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { Buttons } from "../components/Buttons";
import Link from "next/link";

export default function Home({ data }: any) {
  const [step, setStep] = useState<number>(1);
  const [addField, setAddField] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [person, setPerson] = useState<string | keyof typeof people>(
    data[0] ? JSON.parse(data[0].person).name : ""
  );
  const [people, setPeople] = useState<any>(
    data.reduce(
      (a: any, v: any) => ({
        ...a,
        [JSON.parse(v.person).name]: JSON.parse(v.person),
      }),
      {}
    )
  );
  const [selected, setSelected] =
    useState<keyof typeof measurements.male>("shirt");
  const gender: keyof typeof measurements =
    (people[person] && people[person].gender) ||
    ("male" as keyof typeof measurements);
  const router = useRouter();
  const { brandname, storeName } = router.query;

  const onSubmit = async () => {
    if (!people[person].saved) {
      const list = { ...people };
      list[person] = {
        saved: true,
        ...list[person],
      };
      setPeople(list);
      const { error } = await supabase.from("measurements").insert({
        hotel: "Heathergrey",
        person: JSON.stringify(people[person]),
      });
      console.log(error);
    }
    setStep(2);
  };

  const onPersonSubmit = (data: any) => {
    if (people[data.name]) {
      alert("Person already exists!");
      return;
    }
    setPeople({ ...people, [data.name]: data });
    setPerson(data.name);
    setOpen(false);
  };

  const matchChestSize = (standard: number, input: number) => {
    if (Math.abs(input - standard) <= 1) {
      return "#75C093";
    } else if (Math.abs(input - standard) <= 2) {
      return "#FCDA67";
    } else {
      return "false";
    }
  };

  const colIsHighlighted = (col: any, row: any, id: number) => {
    return col.includes(
      Object.keys(
        // @ts-ignore
        measurements[gender][selected][row as keyof typeof measurements]
      )[id]
    );
  };

  if (!brandname || !storeName)
    return (
      <div className="h-[80vh] !w-screen flex items-center justify-center ">
        <span>
          Please{" "}
          <Link
            href="https://heathergreycollective.com/store"
            className="text-[#DB302B]"
          >
            login
          </Link>{" "}
          first.
        </span>
      </div>
    );

  return (
    <>
      <Head>
        <title>Heathergrey Measurements</title>
        <meta name="description" content="Fit measurements into sizes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center">
        <div
          className={`${
            step === 2 ? "h-full w-[95%] pb-2" : "w-[85%] pb-8"
          } flex flex-col gap-6 relative overflow-auto`}
        >
          {step === 1 ? (
            <div className="w-full h-full pt-8 flex gap-8">
              <div className="flex flex-col w-[40%] gap-6">
                <div className="w-full h-[48%]">
                  <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[90%]">
                    {Object.values(people).map((p: any, idx: number) => (
                      <div
                        className={`px-6 py-8 flex flex-col gap-5 w-full ${
                          person === p.name ? "bg-white" : "bg-gray-100"
                        }`}
                        key={idx}
                        onClick={() => setPerson(p.name)}
                      >
                        <h3 className="text-xl font-light text-[#DB302B]">
                          {p.name}
                        </h3>
                        <p className="uppercase text-sm">{p.gender}</p>
                        <p className="uppercase text-sm">{p.department}</p>
                        <p className="uppercase text-sm">{p.designation}</p>
                      </div>
                    ))}
                  </div>
                  <p
                    className="text-[#DB302B] flex items-center gap-x-1 mt-4 cursor-pointer text-sm"
                    onClick={() => setOpen(true)}
                  >
                    <AiOutlinePlus className="h-4 w-4" />
                    Add a person
                  </p>
                </div>
                <div className="">
                  <h3 className="text-xl text-[#DB302B] tracking-wide capitalize">
                    upload measurement using AI generated tool.
                    <span className="ml-2 rounded-full p-1 bg-[#DB302B] text-white text-[10px]">
                      Coming Soon!
                    </span>
                  </h3>
                  <div className="flex pt-2">
                    <img
                      src="/ai.png"
                      alt=""
                      className="w-[60%] object-contain"
                    />
                    <p className="opacity-70 text-[13px]">
                      Open your device camera. Press the record button. Wait for
                      2 minutes in front of the screen. The sizes will appear in
                      the Measurement box on your left.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-6 !h-full">
                <div className="bg-white p-6 h-[20%]">
                  <p className="pb-2">Select the product</p>
                  <Select
                    items={Object.keys(measurements.male)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
                <form
                  className="bg-white p-6 h-[80%]"
                  onSubmit={(e: any) => e.preventDefault()}
                >
                  <div className="flex items-center justify-between pb-2 font-light text-[15px]">
                    <p>
                      Measurement <br /> (Sizes in Inches)
                    </p>
                    <div className="flex items-center gap-8">
                      <p>
                        Enter <br />
                        manually
                      </p>
                      <p>
                        AI <br />
                        Generated
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3 max-h-[70%] overflow-y-auto">
                    {Object.keys(measurements[gender][selected])
                      .slice(0, addField + 6)
                      .map((sel) => (
                        <MeasurementInput
                          selec={sel}
                          key={sel}
                          changeable={false}
                          required
                          // disabled={people[person] && people[person].saved}
                          value={
                            (people[person] &&
                              people[person][selected] &&
                              Number(
                                people[person][selected].measurements[sel]
                              )) ||
                            ""
                          }
                          onChange={(e: any) => {
                            if (!person) {
                              alert("Add a person first!");
                              return;
                            }
                            const list = { ...people };
                            list[person] = {
                              ...list[person],
                              [selected]: {
                                measurements: {
                                  ...list[person][selected]?.measurements,
                                  [sel]: Number(e.target.value),
                                },
                              },
                            };
                            setPeople(list);
                          }}
                        />
                      ))}
                  </div>
                  <p
                    className="text-[#DB302B] flex items-center gap-x-1 pt-4 pb-7 cursor-pointer text-sm"
                    onClick={() => setAddField((prev) => prev + 1)}
                  >
                    <AiOutlinePlus className="h-4 w-4" />
                    Add another parameter
                  </p>
                  <div className="flex items-center gap-4">
                    {people[person] && !people[person].saved ? (
                      <button
                        className="bg-[#DB302B] text-white px-6 py-2"
                        onClick={() => {
                          if (people[person]) onSubmit();
                        }}
                        type="submit"
                      >
                        Save
                      </button>
                    ) : null}
                    <button
                      className="border-[#DB302B] text-black border px-6 py-2"
                      onClick={() => {
                        if (people[person]) setStep(2);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-white flex flex-col gap-6 p-6 !h-full items-center">
                <h3 className="text-lg text-center text-[#DB302B]">
                  How to take Measurement?
                </h3>
                <img src="/size-chart.png" alt="" className="w-[70%] h-auto" />
                <div className="max-h-[40%] overflow-y-auto tracking-wide flex flex-col gap-y-3 text-sm">
                  <p>
                    <span className="tracking-wider">(1)</span> Collar: <br />
                    measure around the base of the neck where the collar starts.
                  </p>
                  <p>
                    <span className="tracking-wider">(2)</span> Chest: <br />
                    measure the chest at the fullest part, placing the tape
                    close up under the arms.
                  </p>
                  <p>
                    <span className="tracking-wider">(3)</span> Waist: <br />
                    measure the natural waistline.
                  </p>
                  <p>
                    <span className="tracking-wider">(4)</span> Hip: <br />
                    With the feet together measure around fullest part
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          {step === 2 ? (
            <>
              <h3 className="text-2xl my-6 text-[#DB302B]">
                {`${String(person)}'s ${selected} matching Measurements`}
              </h3>
              <table className="w-[100rem] border border-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 border-r border-gray-300"
                    >
                      Point of Parameters
                    </th>
                    {Object.keys(measurements.male.shirt.frontLength).map(
                      (col, idx) => (
                        <th
                          scope="col"
                          className="px-2 py-4 border-r border-t border-gray-300"
                          key={idx}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                {Object.keys(measurements[gender][selected]).map((row, idx) => (
                  <tr
                    key={idx}
                    className="text-left border-l border-y border-gray-300"
                  >
                    <th
                      scope="row"
                      className="font-normal py-4 pl-4 border-r border-gray-300"
                    >
                      {splitAndCapitalize(row)}
                    </th>
                    {/* @ts-ignore */}
                    {Object.values(measurements[gender][selected][row]).map(
                      (val, id) => {
                        let background = "";
                        let colBg = "";
                        let col: string[] = [];

                        if (String(row) === "chestFinish") {
                          background = matchChestSize(
                            val as number,
                            people[person][selected].measurements.chestFinish +
                              5
                          );
                        }

                        let keysOfRow =
                          measurements[gender][selected].hipsFinish;
                        let entered = "";
                        let loose = loosening[gender][selected].hipsFinish;

                        if (selected === "trouser") {
                          keysOfRow = measurements[gender][selected].hipsFinish;
                          entered =
                            people[person][selected].measurements.hipsFinish;
                          loose = loosening[gender][selected].hipsFinish;
                        } else {
                          keysOfRow =
                            measurements[gender][selected].chestFinish;
                          entered =
                            people[person][selected].measurements.chestFinish;
                          loose = loosening[gender][selected].chestFinish;
                        }

                        Object.keys(keysOfRow).forEach(
                          (k) =>
                            // @ts-ignore
                            Math.abs(entered + loose - keysOfRow[k]) <= 1 &&
                            col.push(k)
                        );

                        if (colIsHighlighted(col, row, id)) {
                          const difference = Math.abs(
                            Number(
                              people[person][selected].measurements[row] +
                                // @ts-ignore
                                loosening[gender][selected][row] -
                                Number(val)
                            )
                          );

                          if (difference <= 1) {
                            colBg = "#75C093 #fff";
                          } else if (difference <= 2) {
                            colBg = "#FCDA67 #fff";
                          } else {
                            colBg = "#DC5947 #fff";
                          }

                          if (
                            !people[person][selected].measurements[row] ||
                            row === "waist"
                          ) {
                            colBg = "rgba(176,205,252,.2) #000";
                          }
                        }

                        return (
                          <td
                            key={id}
                            className="border-gray-300 border-r pl-4"
                            style={{
                              background: background
                                ? background
                                : colBg.split(" ")[0],
                              color: colBg.split(" ")[1],
                            }}
                          >
                            <div className="flex flex-col">
                              {val}
                              {colIsHighlighted(col, row, id) &&
                                people[person][selected].measurements[row] &&
                                row !== "waist" && (
                                  <span className="text-[0.7rem]">
                                    {people[person][selected].measurements[row]}{" "}
                                    entered
                                  </span>
                                )}
                            </div>
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </table>
              <Buttons
                prevProps={{
                  onClick: () => setStep(1),
                  className:
                    "border border-gray-200 rounded-lg px-6 py-2 bg-[#fcfcfc] fixed bottom-4 left-8",
                }}
                nextProps={{ className: "hidden" }}
              />
            </>
          ) : null}
        </div>
      </div>
      <AddPerson
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onPersonSubmit}
      />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const fetchURL = `${
    context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted
      ? "https"
      : "http"
  }://${context.req.headers.host}/api/getMeasurements${context.req.url}`;
  const res = await fetch(fetchURL);
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}
