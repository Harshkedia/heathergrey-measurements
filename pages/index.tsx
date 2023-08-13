import Head from "next/head";
import { loosening, measurements } from "../static/measurements";
import React, { useState } from "react";
import { AddPerson } from "../components/AddPerson";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { ViewMeasurements } from "../components/ViewMeasurements";
import { EnterMeasurements } from "../components/EnterMeasurements";
import { Header } from "../components/Header";

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
  const gender: keyof typeof measurements = people[person]
    ? people[person].gender
    : "male";
  const router = useRouter();
  const { brandname, storeName } = router.query;

  const onSubmit = async () => {
    if (!people[person][selected].saved) {
      const list = { ...people };
      list[person][selected] = {
        saved: true,
        ...list[person][selected],
      };
      setPeople(list);
      const { error } = await supabase.from("measurements").insert({
        hotel: storeName,
        person: JSON.stringify(people[person]),
      });
    }
    setStep(2);
  };

  const onPersonSubmit = ({
    name,
    department,
    designation,
    gender,
  }: {
    name: string;
    department: string;
    designation: string;
    gender: string;
  }) => {
    if (people[name]) {
      alert("Person already exists!");
      return;
    }
    setPeople({ ...people, [name]: { name, department, designation, gender } });
    setPerson(name);
    setOpen(false);
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
        <Header />
        <div
          className={`${
            step === 2 ? "h-full w-[95%] pb-2" : "w-[85%] pb-8"
          } flex flex-col gap-6 relative overflow-auto`}
        >
          {step === 1 ? (
            <EnterMeasurements
              {...{ setStep, measurements, onSubmit }}
              {...{ person, setPerson, gender, addField, setAddField }}
              {...{ people, setPeople, selected, setSelected, setOpen }}
            />
          ) : null}
          {step === 2 ? (
            <ViewMeasurements
              {...{ measurements, loosening, selected, setStep, person }}
              {...{ people, gender }}
            />
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
