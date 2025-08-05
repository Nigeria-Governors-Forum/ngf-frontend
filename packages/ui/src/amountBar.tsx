"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export interface StateValue {
  name: string;
  value: number;
  color?: string; // optional override
}

export interface HorizontalStateBarChartProps {
  data: StateValue[]; // sorted descending if desired
  title?: string;
  currencySymbol?: string;
  className?: string;
  barColor?: string; // default if individual color not provided
  max?: number; // optional max to unify scale (if omitted uses max from data)
  showValueSuffix?: string; // e.g. "T" or ""
}

const defaultColors = ["#2563EB", "#10B981", "#6366F1", "#F59E0B", "#EF4444"];

const formatCurrency = (val: number, symbol = "₦") =>
  symbol +
  val
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const TooltipContent: React.FC<any> = ({ active, payload, label, currencySymbol, suffix }) => {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0].payload as StateValue;
  return (
    <div className="ui:bg-black ui:shadow ui:rounded ui:p-2 ui:text-sm ui:border ui:border-gray-200">
      <div className="ui:font-semibold ui:mb-1">{entry.name}</div>
      <div>
        {formatCurrency(entry.value, currencySymbol)}{suffix}
      </div>
    </div>
  );
};

const HorizontalStateBarChart: React.FC<HorizontalStateBarChartProps> = ({
  data,
  title,
  currencySymbol = "₦",
  className = "",
  barColor = "#2563EB",
  max,
  showValueSuffix = "",
}) => {
  const effectiveMax =
    max && max > 0 ? max : Math.max(...data.map((d) => d.value), 0);

  return (
    <div className={className}>
      {title && (
        <div className="ui:text-lg ui:font-semibold ui:mb-2 ui:text-gray-800">
          {title}
        </div>
      )}
      <div className="ui:w-full ui:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            barCategoryGap="20%"
          >
            <XAxis
              type="number"
              domain={[0, Math.ceil(effectiveMax * 1.05)]}
              hide
            />
            <YAxis
              dataKey="name"
              type="category"
              width={120}
              tick={{ fontSize: 14, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <Tooltip
              content={(props) => (
                <TooltipContent
                  {...props}
                  currencySymbol={currencySymbol}
                  suffix={showValueSuffix}
                />
              )}
              wrapperStyle={{ outline: "none" }}
            />
            <Bar
              dataKey="value"
              isAnimationActive={false}
              maxBarSize={24}
              background={{ fill: "#f3f4f6" }}
              // label={{ position: "right", formatter: (v: any) => `${formatCurrency(v, currencySymbol)}${showValueSuffix}` }}
            >
              {data.map((entry, idx) => {
                const color = entry.color || defaultColors[idx % defaultColors.length] || barColor;
                return <Cell key={entry.name} fill={color} />;
              })}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: any) => `${formatCurrency(v, currencySymbol)}${showValueSuffix}`}
                style={{ fill: "#1f2d3a", fontWeight: 600, fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalStateBarChart;
