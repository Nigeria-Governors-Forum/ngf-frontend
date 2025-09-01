"use client";

import React from "react";
import DemographyCard from "@repo/ui/demographyCard";
import LgaSummaryTable, { LgaRow } from "@repo/ui/lgaSummaryTable";
import { FaMoneyCheck } from "react-icons/fa";
import MapView from "../../components/MapWrapper";
import { useTopbarFilters } from "../hooks/useTopBarFilter";

interface DemographyPageProps {
  state?: string;
}

const DemographyPage: React.FC<DemographyPageProps> = ({
  state = "Akwa Ibom",
}) => {

  const { selectedState, selectedYear } = useTopbarFilters();

  console.log(selectedState, selectedYear);

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
    <div className="flex flex-col gap-6">
      {/* Left: takes 2x space */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MapView mapClassName={`h-96 w-full rounded-xl shadow`} showCard={true}/>
        <LgaSummaryTable title="LGA Summary" data={data} />
      </div>
    </div>
  );
};

export default DemographyPage;
