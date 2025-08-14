import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#2563eb", "#facc15"]; // Green, Red, Blue, Yellow

interface DataCardProps {
  title: string;
  initialData: any;
  alternateData?: any;
}

export default function DataCard({
  title,
  initialData,
  alternateData,
}: DataCardProps) {
  const [enabled, setEnabled] = useState(false);

  const data = enabled && alternateData ? alternateData : initialData;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-auto mb-4">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-green-800">{title}</h2>
        {alternateData && (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${enabled ? "translate-x-5" : ""}`}
              />
            </div>
          </label>
        )}
      </div>

      {/* Pie Chart */}
      <div className="h-40 ">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Row */}
      <div className="flex justify-between text-sm gap-4 text-gray-700 mt-10">
        {data.map((item: any, idx: number) => (
          <span
            key={idx}
            className={`font-medium`}
            style={{ color: COLORS[idx % COLORS.length] }}
          >
            {item.value} <br />
            <span className="text-xs">{item.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
