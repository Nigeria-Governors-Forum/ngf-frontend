"use client";

import React from "react";

export type Status = "safe" | "normal" | "hard" | "unknown";

export interface SummaryRow {
  lga: string;
  population?: string; // you can also use number and format outside
  healthFacilities?: number | string;
  politicalWards?: number | string;
  status?: Status; // determines background accent
}

export interface StatusStyle {
  label: string;
  bgClass: string;
  textClass?: string;
  borderClass?: string;
}

export interface SummaryTableProps {
  title?: string;
  data: SummaryRow[];
  statusStyles?: Partial<Record<Status, StatusStyle>>;
}

/**
 * Default mapping:
 * - safe: green
 * - normal: light/white (no fill)
 * - hard: red
 * - unknown: gray
 */
const defaultStatusStyles: Record<Status, StatusStyle> = {
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

const SummaryTable: React.FC<SummaryTableProps> = ({
  title = "LGA Summary",
  data,
  statusStyles = {},
}) => {
  const styles = { ...defaultStatusStyles, ...statusStyles } as Record<
    Status,
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
                Level
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Private
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Public
              </th>
              <th className="ui:px-4 ui:py-3 ui:text-center ui:font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const status = row.status || "unknown";
              const style = styles[status];
              return (
                <tr
                  key={`${row.lga}-${i}`}
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
                      <span>{row.lga}</span>
                    </div>
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.population}
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.healthFacilities}
                  </td>
                  <td className="ui:px-4 ui:py-3 ui:text-center">
                    {row.politicalWards}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;
