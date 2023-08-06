import { measurements, loosening } from "../static/measurements";
import { Buttons } from "./Buttons";
import { splitAndCapitalize } from "./MeasurementInput";

export const Measurements = ({
  setStep,
  people,
  selected,
  person,
  gender,
}: any) => {
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
  return (
    <>
      <table className="w-[100rem] border border-gray-300">
        <thead>
          <tr>
            <th scope="col" className="px-2 py-3 border-r border-gray-300">
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
            className="text-left border-l border-y border-gray-300 "
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
                    people[person][selected].measurements.chestFinish + 5
                  );
                }

                let keysOfRow = measurements[gender][selected].hipsFinish;
                let entered = "";
                let loose = loosening[gender][selected].hipsFinish;

                if (selected === "trouser") {
                  keysOfRow = measurements[gender][selected].hipsFinish;
                  entered = people[person][selected].measurements.hipsFinish;
                  loose = loosening[gender][selected].hipsFinish;
                } else {
                  keysOfRow = measurements[gender][selected].chestFinish;
                  entered = people[person][selected].measurements.chestFinish;
                  loose = loosening[gender][selected].chestFinish;
                }

                Object.keys(keysOfRow).forEach(
                  (k) =>
                    // @ts-ignore
                    Math.abs(entered + loose - keysOfRow[k]) <= 1 && col.push(k)
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
                      background: background ? background : colBg.split(" ")[0],
                      color: colBg.split(" ")[1],
                    }}
                  >
                    <div className="flex flex-col">
                      {val}
                      {colIsHighlighted(col, row, id) &&
                        people[person][selected].measurements[row] &&
                        row !== "waist" && (
                          <span className="text-[0.7rem]">
                            {people[person][selected].measurements[row]} entered
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
  );
};
