import React from "react";

export type Variant = "budget" | "gauge" | "simple";

export interface BreakdownItem {
  label: string;
  percentage: number;
  color: string; // CSS color or hex
}

export interface MetricCardProps {
  variant: Variant;
  title: string;
  // For "simple" and "budget"
  amount?: number; // raw number, will be formatted
  currencySymbol?: string; // e.g., "₦"
  // For "budget"
  breakdown?: BreakdownItem[];
  // For "gauge"
  valuePct?: number; // e.g., 12.3 means 12.3%
  maxPct?: number; // gauge upper bound, e.g., 15
  className?: string;
}

const formatAmount = (value: number, symbol = "₦") => {
  // Example: 4856.57 -> ₦4,856.57
  return (
    symbol +
    value
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

const BudgetVariant: React.FC<{
  title: string;
  amount: number;
  currencySymbol: string;
  breakdown: BreakdownItem[];
}> = ({ title, amount, currencySymbol, breakdown }) => {
  const totalPct = breakdown.reduce((s, b) => s + b.percentage, 0) || 1;
  const normalized = breakdown.map((b) => ({
    ...b,
    displayPct: (b.percentage / totalPct) * 100,
  }));

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
      </div>

      <div className="flex justify-center items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{currencySymbol}</span>
        <span className="text-4xl font-extrabold text-black">
          {amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>

      <div className="w-full h-4 rounded-lg overflow-hidden flex">
        {normalized.map((b, i) => (
          <div
            key={i}
            aria-label={`${b.label}: ${b.percentage}%`}
            role="progressbar"
            aria-valuenow={Math.round(b.displayPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              width: `${b.displayPct}%`,
              backgroundColor: b.color,
              transition: "width .3s ease",
            }}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-2 justify-center flex-wrap">
        {breakdown.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: b.color }}
            />
            <span className="text-gray-700">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GaugeVariant: React.FC<{
  title: string;
  valuePct: number;
  maxPct: number;
}> = ({ title, valuePct, maxPct }) => {
  const safePct = Math.min(Math.max(valuePct, 0), maxPct);
  const ratio = safePct / maxPct; // 0..1
  const startAngle = 180;
  const endAngle = 0;
  // SVG arc for semicircle: use stroke-dasharray to simulate fill
  const radius = 60;
  const circumference = Math.PI * radius; // half circle length
  const filledLength = circumference * ratio;

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          width={160}
          height={100}
          viewBox="0 0 160 100"
          aria-label={`${valuePct}% of ${maxPct}%`}
        >
          {/* Background track */}
          <path
            d={describeArc(80, 80, radius, 180, 0)}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={20}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d={describeArc(80, 80, radius, 180, 180 - ratio * 180)}
            fill="none"
            stroke="#dc2626" // red
            strokeWidth={20}
            strokeLinecap="round"
          />
          {/* Left label */}
          <text
            x={10}
            y={95}
            fontSize={12}
            fill="#1f2d3a"
            fontWeight="500"
          >
            0%
          </text>
          {/* Right label */}
          <text
            x={150}
            y={95}
            fontSize={12}
            fill="#1f2d3a"
            fontWeight="500"
            textAnchor="end"
          >
            {maxPct}%
          </text>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-3xl font-bold text-black">
            {valuePct.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to generate arc path (SVG) for gauge
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
}

const SimpleVariant: React.FC<{
  title: string;
  amount: number;
  currencySymbol: string;
}> = ({ title, amount, currencySymbol }) => {
  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
      </div>
      <div className="flex justify-center items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{currencySymbol}</span>
        <span className="text-4xl font-extrabold text-black">
          {formatAmount(amount, "")}
        </span>
      </div>
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = (props) => {
  const {
    variant,
    title,
    amount = 0,
    currencySymbol = "₦",
    breakdown = [],
    valuePct = 0,
    maxPct = 100,
    className = "",
  } = props;

  if (variant === "budget") {
    return (
      <BudgetVariant
        title={title}
        amount={amount}
        currencySymbol={currencySymbol}
        breakdown={breakdown}
      />
    );
  }

  if (variant === "gauge") {
    return (
      <GaugeVariant title={title} valuePct={valuePct} maxPct={maxPct} />
    );
  }

  if (variant === "simple") {
    return (
      <SimpleVariant title={title} amount={amount} currencySymbol={currencySymbol} />
    );
  }

  return null;
};

export default MetricCard;
