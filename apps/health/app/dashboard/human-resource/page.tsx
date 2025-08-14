"use client";

import React, { useState } from "react";
import DemographyCard from "@repo/ui/demographyCard";
import PopulationSummaryTable, { LgaRow } from "@repo/ui/populationSummaryTable";
import SummaryTable, { SummaryRow } from "@repo/ui/summaryTable";
import { FaMoneyCheck } from "react-icons/fa";
import MapView from "../../components/MapWrapper";

interface HumanResourcePageProps {
  state?: string;
  title?: string;
  total?: string | number;
  perPerson?: string | number;
}

const HumanResource: React.FC<HumanResourcePageProps> = ({
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

  const data: SummaryRow[] = [
    {
      lga: "Primary",
      population: "141",
      healthFacilities: 517,
      politicalWards: 658,
    },
    {
      lga: "Secondary",
      population: "44",
      healthFacilities: 14,
      politicalWards: 58,
    },
    {
      lga: "Tertiary",
      population: "0",
      healthFacilities: 3,
      politicalWards: 3,
    },
    {
      lga: "Total",
      population: "185",
      healthFacilities: 534,
      politicalWards: 719,
    },
  ];
    const dataTwo: LgaRow[] = [
      {
        occupation: "Akoko South East",
        number: "136,238",
        density: 24,
        target: 11,
        status: "hard",
      },
      {
        occupation: "Akoko North East",
        number: "289,924",
        density: 32,
        target: 13,
        status: "normal",
      },
      {
        occupation: "Akure South",
        number: "583,804",
        density: 38,
        target: 11,
        status: "safe",
      },
      {
        occupation: "Akoko North East",
        number: "289,924",
        density: 32,
        target: 13,
        status: "normal",
      },
      {
        occupation: "Akure South",
        number: "583,804",
        density: 38,
        target: 11,
        status: "safe",
      },
      {
        occupation: "Akoko North East",
        number: "289,924",
        density: 32,
        target: 13,
        status: "normal",
      },
      {
        occupation: "Akure South",
        number: "583,804",
        density: 38,
        target: 11,
        status: "safe",
      },
      // ...
    ];

return (
  <div className="flex flex-col gap-6">
    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DemographyCard
        title="Total Health Worker"
        subtitle="1,979"
        icon={<FaMoneyCheck size={24} color="#16a34a" />}
      />
      <DemographyCard
        title="Total Health Training Institution"
        subtitle="1,979"
        icon={<FaMoneyCheck size={24} color="#16a34a" />}
      />
      <SummaryTable title="Health Facility Summary" data={data} />
    </div>

    {/* Middle Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PopulationSummaryTable title="Population by LGA" data={dataTwo} />

      {/* Map spans 2 columns */}
      <div className="md:col-span-2">
        <MapView
          mapClassName="h-96 w-full rounded-xl shadow"
          showCard={true}
          title="National Comparison"
        />
      </div>
    </div>
  </div>
);


};

export default HumanResource;
