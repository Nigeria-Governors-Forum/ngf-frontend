"use client";

import React, { useState } from "react";
import MapView from "../../components/MapWrapper";
import ZoneHealthCard from "../../components/ZoneHealthCard";
import ComparisonBarChart from "@repo/ui/barchart";

interface ZonalHealthFacilityPageProps {
  state?: string;
  title?: string;
  total?: string | number;
  perPerson?: string | number;
}

const ZonalHealthFacility: React.FC<ZonalHealthFacilityPageProps> = ({
  state = "Akwa Ibom",
  title = "Year",
}) => {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

  const sampleData = [
    { name: "2020", actual: 120000, budgeted: 140000 },
    { name: "2021", actual: 90000, budgeted: 85000 },
    { name: "2022", actual: 150000, budgeted: 160000 },
    { name: "2023", actual: 120000, budgeted: 140000 },
    { name: "2024", actual: 150000, budgeted: 160000 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 justify-between ">
        <ZoneHealthCard
          title="Zone"
          options={[
            { value: "north", label: "North" },
            { value: "south", label: "South" },
            { value: "east", label: "East" },
            { value: "west", label: "West" },
          ]}
          onChange={(value) => {
            setSelectedZone(value);
            console.log("Selected zone:", value);
          }}
          defaultValue={selectedZone}
        />

        {/* State Selector */}
        <ZoneHealthCard
          title="State"
          options={[
            { value: "north", label: "North West" },
            { value: "south", label: "South" },
            { value: "east", label: "East" },
            { value: "west", label: "West" },
          ]}
          onChange={(value) => {
            setSelectedState(value);
            console.log("Selected state:", value);
          }}
          defaultValue={selectedState}
        />

        {/* Year Selector */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold text-green-800 mb-3 text-center">
            {title}
          </h2>
          <label htmlFor={`select-${title}`} className="text-black pr-5">
            Select a {title}
          </label>
          <select
            id={`select-${title}`}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-1 border rounded-md border-green-400 bg-white text-green-700"
          >
            <option value="">Select...</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComparisonBarChart
          title="Health Expenditure Trend"
          data={sampleData}
          currencySymbol="₦"
          actualColor="#2563EB"
          budgetColor="#10B981"
          className="ui:bg-white ui:rounded-2xl ui:shadow ui:p-4"
        />

        <MapView
          mapClassName="h-96 w-full rounded-xl shadow"
          showCard={true}
          title="National Comparison"
        />
      </div>
    </div>
  );
};

export default ZonalHealthFacility;
