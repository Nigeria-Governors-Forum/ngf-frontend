"use client";

import React from "react";

export interface LgaRow {
  id: number;
  occupation: string;
  number?: string;
  density?: number | string;
  target?: number | string;
  institution?: string;
  page?: string;
  state?: string;
  year?: number;
  zone?: string;
}

interface PopulationSummaryTableProps {
  title?: string;
  data: LgaRow[];
}

const PopulationSummaryTable: React.FC<PopulationSummaryTableProps> = ({
  title = "Population by LGA",
  data,
}) => {
  // helper to decide density color
  const getDensityColor = (density?: number) => {
    if (density === undefined || isNaN(density)) return "ui:bg-gray-200"; // unknown
    if (density <= 0.5) return "ui:bg-red-500"; // critical
    if (density < 5) return "ui:bg-white"; // warning
    return "ui:bg-green-500"; // safe
  };

  return (
    <div className="ui:max-w-full ui:bg-white ui:rounded-2xl ui:shadow-md ui:p-6 ui:text-black">
      <h2 className="ui:text-xl ui:font-bold ui:text-green-700 ui:mb-4">
        {title}
      </h2>

      <div className="ui:overflow-x-auto">
        <table className="ui:min-w-full ui:border-collapse ui:text-sm">
          <thead>
            <tr className="ui:bg-green-800 ui:text-white">
              <th className="ui:px-4 ui:py-3 ui:text-left ui:font-semibold">
                Occupation
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Number
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Density/10,000
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Target
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const densityVal = Number(row.density);
              const densityColor = getDensityColor(densityVal);

              return (
                <tr
                  key={`${row.occupation}-${i}`}
                  className="ui:border-t ui:border-green-700"
                >
                  <td className="ui:px-4 ui:py-3 ui:font-medium ui:whitespace-nowrap">
                    <div className="ui:flex ui:items-center ui:gap-2">
                      {/* density pill */}
                      <span
                        className={`ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ${densityColor}`}
                      />
                      <span>{row.institution}</span>
                    </div>
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.number}
                  </td>
                  <td
                    className={`ui:px-4 ui:py-3 ui:text-center font-semibold ${densityColor}`}
                  >
                    {isNaN(densityVal)
                      ? "N/A"
                      : parseFloat(densityVal.toFixed(0))}
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row?.target || 15}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="ui:mt-6 ui:flex ui:gap-6 ui:flex-wrap">
        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:font-medium">
          <span className="ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ui:bg-red-500" />
          <span>Critical (≤ 0)</span>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:font-medium">
          <span className="ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ui:bg-yellow-400" />
          <span>Low (&lt; 5)</span>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:font-medium">
          <span className="ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ui:bg-green-500" />
          <span>Safe (≥ 5)</span>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:font-medium">
          <span className="ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ui:bg-gray-200" />
          <span>Unknown</span>
        </div>
      </div>
    </div>
  );
};

export default PopulationSummaryTable;
