"use client";

import React from "react";
import DemographyCard from "@repo/ui/demographyCard";
import LgaSummaryTable, { LgaRow } from "@repo/ui/lgaSummaryTable";
import { FaMoneyCheck } from "react-icons/fa";

interface DemograpyPageProps {
  state?: string;
}

const DemographyPage: React.FC<DemograpyPageProps> = ({
  state = "Akwa Ibom",
}) => {
  const data: LgaRow[] = [
    {
      lga: "Akoko South East",
      population: "136,238",
      healthFacilities: 24,
      politicalWards: 11,
      status: "hard",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "safe",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "safe",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "safe",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "safe",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "safe",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "hard",
    },
    {
      lga: "Akoko North East",
      population: "289,924",
      healthFacilities: 32,
      politicalWards: 13,
      status: "normal",
    },
    {
      lga: "Akure South",
      population: "583,804",
      healthFacilities: 38,
      politicalWards: 11,
      status: "unknown",
    },
    // ...
  ];
  return (
    <div className="flex gap-6">
      {/* Left: takes 2x space */}
      <div className="grid grid-cols-2 gap-4">
        <DemographyCard title="Year created" subtitle="1979" />
        <DemographyCard title="Total population" subtitle="1979" />
        <DemographyCard title="Land mass" subtitle="1979" />
        <DemographyCard title="Under 1 pop" subtitle="1979" />
        <DemographyCard title="LGAs" subtitle="1979" />
        <DemographyCard title="Under 5 pop" subtitle="1979" />
        <DemographyCard title="Political ward" subtitle="1979" />
        <DemographyCard title="WCBA" subtitle="1979" />
        <DemographyCard title="Health Facility" subtitle="1979" />
        <DemographyCard
          title="Pregnant women "
          subtitle="1979"
          icon={<FaMoneyCheck size={24} color="#16a34a" />}
        />
      </div>

      {/* Center: single card */}
      <div className="flex-1 flex items-start">
        <DemographyCard title="Year created" subtitle="1979" />
      </div>

      {/* Right: single card */}
      <div className="flex-1 flex items-start">
        <LgaSummaryTable title="LGA Summary" data={data} />
      </div>
    </div>
  );
};

export default DemographyPage;
