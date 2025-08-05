"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface CategoryComparison {
  name: string;
  actual: number;
  budgeted: number;
}

export interface ComparisonBarChartProps {
  data: CategoryComparison[];
  currencySymbol?: string;
  title?: string;
  className?: string;
  actualColor?: string;
  budgetColor?: string;
}

const formatCurrency = (value: number, symbol = "₦") =>
  symbol + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const TooltipContent: React.FC<any> = ({
  active,
  payload,
  label,
  currencySymbol,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const actual = payload.find((p: any) => p.dataKey === "actual")?.value ?? 0;
  const budgeted =
    payload.find((p: any) => p.dataKey === "budgeted")?.value ?? 0;

  return (
    <div className="ui:bg-black ui:shadow ui:rounded ui:p-3 ui:text-sm ui:border ui:border-gray-200">
      <div className="ui:font-semibold ui:mb-1">{label}</div>
      <div className="ui:flex ui:flex-col ui:gap-1">
        <div className="ui:flex ui:items-center">
          <div
            className="ui:w-2 ui:h-2 ui:rounded-full ui:mr-2"
            style={{ backgroundColor: "#2563EB" }}
          />
          <span>Actual: {formatCurrency(actual, currencySymbol)}</span>
        </div>
        <div className="ui:flex ui:items-center">
          <div
            className="ui:w-2 ui:h-2 ui:rounded-full ui:mr-2"
            style={{ backgroundColor: "#10B981" }}
          />
          <span>Budgeted: {formatCurrency(budgeted, currencySymbol)}</span>
        </div>
      </div>
    </div>
  );
};

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  data,
  currencySymbol = "₦",
  title,
  className = "",
  actualColor = "#2563EB",
  budgetColor = "#10B981",
}) => {
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.actual, d.budgeted)),
    0
  );

  return (
    <div className={className}>
      {title && (
        <div className="ui:mb-2 ui:text-base ui:font-semibold ui:text-gray-800">
          {title}
        </div>
      )}
      <div className="ui:w-full ui:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            barGap={8}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickFormatter={(val) => formatCurrency(val, currencySymbol)}
              width={80}
              domain={[0, Math.ceil(maxVal * 1.1)]}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={(props) => (
                <TooltipContent {...props} currencySymbol={currencySymbol} />
              )}
              wrapperStyle={{ outline: "none" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (
                <span className="ui:font-medium">{value}</span>
              )}
            />
            <Bar
              dataKey="actual"
              name="Actual"
              fill={actualColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            >
              {data.map((_, idx) => (
                <Cell key={`actual-${idx}`} fill={actualColor} />
              ))}
            </Bar>
            <Bar
              dataKey="budgeted"
              name="Budgeted"
              fill={budgetColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            >
              {data.map((_, idx) => (
                <Cell key={`budgeted-${idx}`} fill={budgetColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonBarChart;
