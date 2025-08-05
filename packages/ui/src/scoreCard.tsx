"use client";

import React from "react";

export type StatusKey = "yes" | "no" | "blank";

export interface StatusMappingEntry {
  label: string;
  colorClass: string;
}

export interface StatusMapping {
  yes: StatusMappingEntry;
  no: StatusMappingEntry;
  blank: StatusMappingEntry;
}

export interface TableColumn {
  key: string;  // property name in data
  label: string; // column label
  type?: "status" | "text";
}

export interface ScorecardRow {
  [key: string]: string | undefined;
}

export interface ScorecardTableProps {
  title: string;
  mode?: "single" | "multi";
  columns?: TableColumn[];
  data: ScorecardRow[];
  statusMapping?: StatusMapping;
}

const defaultStatusMapping: StatusMapping = {
  yes: { label: "Yes", colorClass: "ui:bg-green-600" },
  no: { label: "No", colorClass: "ui:bg-red-500" },
  blank: { label: "No Data", colorClass: "ui:bg-black" },
};

interface StatusCircleProps {
  status?: string;
  mapping: StatusMapping;
}

const StatusCircle: React.FC<StatusCircleProps> = ({
  status,
  mapping = defaultStatusMapping,
}) => {
  const key: StatusKey =
    status === "yes" ? "yes" : status === "no" ? "no" : "blank";
  const { label, colorClass } = mapping[key];

  return (
    <div className="ui:flex ui:items-center ui:justify-center">
      <span
        className={`ui:inline-block ui:h-4 ui:w-4 ui:rounded-full ${colorClass}`}
      />
      <span className="ui:sr-only">{label}</span>
    </div>
  );
};

const ScorecardTable: React.FC<ScorecardTableProps> = ({
  title,
  mode = "single",
  columns,
  data,
  statusMapping = defaultStatusMapping,
}) => {
  // Default columns if not provided
  const defaultSingleCols: TableColumn[] = [
    { key: "indicator", label: "Indicator", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const defaultMultiCols: TableColumn[] = [
    { key: "state", label: "State", type: "text" },
    { key: "phc", label: "60% Ward PHCs Capitalized", type: "status" },
    { key: "dma", label: "DMA Established", type: "status" },
    { key: "dmaCapita", label: "DMA Fully Capitalized", type: "status" },
    { key: "warehouse", label: "Functional Warehousing System", type: "status" },
    { key: "supplyChain", label: "Single Supply Chain", type: "status" },
    { key: "stateOwn", label: "State owns Last Mile", type: "status" },
  ];

  const finalColumns = columns || (mode === "single" ? defaultSingleCols : defaultMultiCols);

  return (
    <div className="ui:max-w-full ui:bg-white ui:rounded-2xl ui:shadow-md ui:p-4 ui:text-black">
      <h2 className="ui:text-lg ui:font-bold ui:mb-4 ui:capitalize">{title}</h2>

      <div className="ui:overflow-x-auto">
        <table className="ui:min-w-full ui:border-collapse">
          <thead>
            <tr className="ui:bg-green-800 ui:text-white">
              {finalColumns.map((col) => (
                <th
                  key={col.key}
                  className="ui:px-4 ui:py-3 ui:text-left ui:font-semibold ui:whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="ui:even:bg-gray-100 ui:odd:bg-white ui:border-t ui:border-green-700"
              >
                {finalColumns.map((col) => (
                  <td
                    key={col.key}
                    className="ui:px-4 ui:py-3 ui:whitespace-nowrap"
                  >
                    {col.type === "status" ? (
                      <StatusCircle
                        status={row[col.key]}
                        mapping={statusMapping}
                      />
                    ) : (
                      <span>{row[col.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="ui:mt-6 ui:flex ui:gap-4 ui:justify-center">
        {Object.entries(statusMapping).map(([key, { label, colorClass }]) => (
          <div key={key} className="ui:flex ui:items-center ui:gap-2">
            <span
              className={`ui:inline-block ui:h-4 ui:w-4 ui:rounded-full ${colorClass}`}
            />
            <span className="ui:text-sm ui:font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScorecardTable;
