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

export interface ScorecardItem {
  id: number;
  zone?: string;
  state?: string;
  name?: string;
  round?: string;
  year?: number;
  indicator?: string;
  status?: string;
  value?: number;
}

export interface ScorecardTableProps {
  title: string;
  data: Record<string, ScorecardItem[]>; // { Abia: [...], Adamawa: [...] }
  statusMapping?: StatusMapping;
}

const defaultStatusMapping: StatusMapping = {
  yes: { label: "Yes", colorClass: "ui:bg-green-600" },
  no: { label: "No", colorClass: "ui:bg-red-500" },
  blank: { label: "No Data", colorClass: "ui:bg-gray-400" },
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
    status?.toLowerCase() === "yes"
      ? "yes"
      : status?.toLowerCase() === "no"
      ? "no"
      : "blank";
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

const NationalScorecardTable: React.FC<ScorecardTableProps> = ({
  title,
  data,
  statusMapping = defaultStatusMapping,
}) => {
  // 1) collect all unique indicators from the data
  const uniqueIndicators = Array.from(
    new Set(
      Object.values(data).flatMap((records) =>
        records.map((r) => r.indicator?.trim())
      )
    )
  ).filter(Boolean) as string[];

  // 2) define columns: first column is "State", rest are indicators
  const columns = [
    { key: "state", label: "State", type: "text" as const },
    ...uniqueIndicators.map((indicator) => ({
      key: indicator.replace(/\s+/g, "_").toLowerCase(), // normalized key
      label: indicator,
      type: "status" as const,
    })),
  ];

  // 3) transform rows: map indicator → status
  const rows = Object.entries(data).map(([state, records]) => {
    const row: Record<string, any> = { state };
    records.forEach((r) => {
      const key = r.indicator?.trim().replace(/\s+/g, "_").toLowerCase();
      if (key) row[key] = r.status;
    });
    return row;
  });

  return (
    <div className="ui:max-w-full ui:bg-white ui:rounded-2xl ui:shadow-md ui:p-4 ui:text-black">
      <h2 className="ui:text-lg ui:font-bold ui:mb-4 ui:capitalize">{title}</h2>

      <div className="ui:overflow-x-auto ui:max-w-full">
        <table className="ui:min-w-[600px] ui:w-full ui:border-collapse">
          <thead>
            <tr className="ui:bg-green-800 ui:text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="ui:px-4 ui:py-3 ui:text-left ui:font-semibold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="ui:even:bg-gray-100 ui:odd:bg-white ui:border-t ui:border-green-700"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="ui:px-4 ui:py-3 ui:text-center ui:break-words"
                  >
                    {col.type === "status" ? (
                      <StatusCircle
                        status={row[col.key]}
                        mapping={statusMapping}
                      />
                    ) : (
                      <span className="ui:font-medium">{row[col.key]}</span>
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

export default NationalScorecardTable;
