"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

type BarChartProps = {
  title: string;
  data: { name: string; value: number, color?: string;  }[];
  benchmark?: number; // reference line value (optional)
};

export default function CustomBarChart({ title, data, benchmark,  }: BarChartProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(val) => `₦${val.toLocaleString()}`}
            domain={[0, "dataMax + 500"]}
          />
          <Tooltip
            formatter={(val: number) => `₦${val.toLocaleString()}`}
          />

          {/* ✅ Reference Line */}
          {benchmark && (
            <ReferenceLine
              y={benchmark}
              stroke="red"
              strokeDasharray="4 4"
              label={{
                value: `Benchmark ₦${benchmark.toLocaleString()}`,
                position: "right",
                fill: "red",
                fontSize: 12,
              }}
            />
          )}

          <Bar
            dataKey="value"
            radius={[5, 5, 0, 0]}
          >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#60A5FA"} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: any) => `₦${val.toLocaleString()}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
