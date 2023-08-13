import { AiOutlinePlus } from "react-icons/ai";
import { Select } from "./Select";
import { measurements } from "../static/measurements";
import { MeasurementInput } from "./MeasurementInput";

export const EnterMeasurements = (props: any) => {
  return (
    <div className="w-full h-full pt-8 flex gap-8">
      <div className="flex flex-col w-[40%] gap-6">
        <div className="w-full h-[48%]">
          <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[90%]">
            {Object.values(props.people).map((p: any, idx: number) => (
              <div
                className={`px-6 py-8 flex flex-col gap-5 w-full ${
                  props.person === p.name ? "bg-white" : "bg-gray-100"
                }`}
                key={idx}
                onClick={() => props.setPerson(p.name)}
              >
                <h3 className="text-xl font-light text-[#DB302B]">{p.name}</h3>
                <p className="uppercase text-sm">{p.department}</p>
                <p className="uppercase text-sm">{p.designation}</p>
                <p className="uppercase text-sm">{p.gender}</p>
              </div>
            ))}
          </div>
          <p
            className="text-[#DB302B] flex items-center gap-x-1 mt-4 cursor-pointer text-sm"
            onClick={() => props.setOpen(true)}
          >
            <AiOutlinePlus className="h-4 w-4" />
            Add a person
          </p>
        </div>
        <AIUploadSection />
      </div>
      <div className="flex flex-col gap-y-6 !h-full">
        <div className="bg-white p-6 h-[20%]">
          <p className="pb-2">Select the product</p>
          <Select
            items={Object.keys(measurements.male)}
            selected={props.selected}
            setSelected={props.setSelected}
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
            {Object.keys(props.measurements[props.gender][props.selected])
              .slice(0, props.addField + 6)
              .map((sel) => (
                <MeasurementInput
                  selec={sel}
                  key={sel}
                  changeable={false}
                  required
                  //   disabled={people[person] && people[person].saved}
                  value={
                    props.people[props.person]?.[props.selected]
                      ? Number(
                          props.people[props.person][props.selected]
                            .measurements[sel]
                        )
                      : ""
                  }
                  onChange={(e: any) => {
                    if (!props.person) {
                      alert("Add a person first!");
                      return;
                    }
                    const list = { ...props.people };
                    list[props.person] = {
                      ...list[props.person],
                      [props.selected]: {
                        measurements: {
                          ...list[props.person][props.selected]?.measurements,
                          [sel]: Number(e.target.value),
                        },
                      },
                    };
                    props.setPeople(list);
                  }}
                />
              ))}
          </div>
          <p
            className="text-[#DB302B] flex items-center gap-x-1 pt-4 pb-7 cursor-pointer text-sm"
            onClick={() => props.setAddField((prev: number) => prev + 1)}
          >
            <AiOutlinePlus className="h-4 w-4" />
            Add another parameter
          </p>
          <div className="flex items-center gap-4">
            {!props.people?.[props.person]?.[props.selected]?.saved ? (
              <button
                className="bg-[#DB302B] text-white px-6 py-2"
                onClick={() => {
                  if (props.people[props.person]) props.onSubmit();
                }}
                type="submit"
              >
                Save
              </button>
            ) : null}
            <button
              className="border-[#DB302B] text-black border px-6 py-2"
              onClick={() => {
                if (props.people[props.person]) props.setStep(2);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <MeasurementsGuidlineSection />
    </div>
  );
};

const AIUploadSection = () => (
  <div className="">
    <h3 className="text-xl text-[#DB302B] tracking-wide capitalize">
      upload measurement using AI generated tool.
      <span className="ml-2 rounded-full p-1 bg-[#DB302B] text-white text-[10px]">
        Coming Soon!
      </span>
    </h3>
    <div className="flex pt-2">
      <img src="/ai.png" alt="" className="w-[60%] object-contain" />
      <p className="opacity-70 text-[13px]">
        Open your device camera. Press the record button. Wait for 2 minutes in
        front of the screen. The sizes will appear in the Measurement box on
        your left.
      </p>
    </div>
  </div>
);

const MeasurementsGuidlineSection = () => (
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
        measure the chest at the fullest part, placing the tape close up under
        the arms.
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
);
