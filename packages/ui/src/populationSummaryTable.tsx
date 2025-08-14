"use client";

import React from "react";

export type LgaStatus = "safe" | "normal" | "hard" | "unknown";

export interface LgaRow {
  occupation: string;
  number?: string; // you can also use number and format outside
  density?: number | string;
  target?: number | string;
  status?: LgaStatus; // determines background accent
}

export interface StatusStyle {
  label: string;
  bgClass: string;
  textClass?: string;
  borderClass?: string;
}

export interface PopulationSummaryTableProps {
  title?: string;
  data: LgaRow[];
  statusStyles?: Partial<Record<LgaStatus, StatusStyle>>;
}

/**
 * Default mapping:
 * - safe: green
 * - normal: light/white (no fill)
 * - hard: red
 * - unknown: gray
 */
const defaultStatusStyles: Record<LgaStatus, StatusStyle> = {
  safe: {
    label: "Safe",
    bgClass: "ui:bg-green-100",
    textClass: "ui:text-black",
    borderClass: "ui:border-green-700",
  },
  normal: {
    label: "Normal",
    bgClass: "ui:bg-white",
    textClass: "ui:text-black",
    borderClass: "ui:border-green-700",
  },
  hard: {
    label: "Hard to Reach",
    bgClass: "ui:bg-red-500 ui:text-white",
    textClass: "ui:text-white",
    borderClass: "ui:border-red-700",
  },
  unknown: {
    label: "Unknown",
    bgClass: "ui:bg-gray-200",
    textClass: "ui:text-black",
    borderClass: "ui:border-green-700",
  },
};

const PopulationSummaryTable: React.FC<PopulationSummaryTableProps> = ({
  title = "Population by LGA",
  data,
  statusStyles = {},
}) => {
  const styles = { ...defaultStatusStyles, ...statusStyles } as Record<
    LgaStatus,
    StatusStyle
  >;

  return (
    <div className="ui:max-w-full ui:bg-white ui:rounded-2xl ui:shadow-md ui:p-6 ui:text-black">
      <h2 className="ui:text-2xl ui:font-bold ui:text-green-700 ui:mb-4">
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
              const status = row.status || "unknown";
              const style = styles[status];
              return (
                <tr
                  key={`${row.occupation}-${i}`}
                  className={`ui:border-t ui:border-green-700 ${
                    status === "hard"
                      ? "ui:bg-red-400" // you can also emphasize full row
                      : ""
                  }`}
                >
                  <td
                    className={`ui:px-4 ui:py-3 ui:font-medium ui:whitespace-nowrap ${style.textClass}`}
                  >
                    <div className="ui:flex ui:items-center ui:gap-2">
                      {/* colored pill for status */}
                      <span
                        className={`ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ${
                          status === "safe"
                            ? "ui:bg-green-600"
                            : status === "hard"
                              ? "ui:bg-red-600"
                              : status === "unknown"
                                ? "ui:bg-gray-500"
                                : "ui:bg-gray-200"
                        }`}
                      />
                      <span>{row.occupation}</span>
                    </div>
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.number}
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.density}
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.target}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="ui:mt-6 ui:flex ui:gap-6 ui:flex-wrap">
        {Object.entries(styles).map(([key, { label }]) => {
          const statusKey = key as LgaStatus;
          const pillColor =
            statusKey === "safe"
              ? "ui:bg-green-600"
              : statusKey === "hard"
                ? "ui:bg-red-600"
                : statusKey === "unknown"
                  ? "ui:bg-gray-500"
                  : "ui:bg-gray-200";
          return (
            <div
              key={key}
              className="ui:flex ui:items-center ui:gap-2 ui:text-sm ui:font-medium"
            >
              <span
                className={`ui:inline-block ui:h-3 ui:w-3 ui:rounded-full ${pillColor}`}
              />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopulationSummaryTable;
