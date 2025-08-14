"use client";

import React from "react";
import DemographyCard from "@repo/ui/demographyCard";
import LgaSummaryTable, { LgaRow } from "@repo/ui/lgaSummaryTable";
import SummaryTable, { SummaryRow } from "@repo/ui/summaryTable";
import { FaArrowRight } from "react-icons/fa";
import MapView from "../../components/MapWrapper";
import HorizontalStateBarChart from "@repo/ui/amountBar";
import DataCard from "../../components/PieChartUi";

interface HealthFacilityPageProps {
  state?: string;
  title?: string;
  total?: string | number;
  perPerson?: string | number;
}

const HealthFacility: React.FC<HealthFacilityPageProps> = ({
  state = "Akwa Ibom",
  title = "Total Health Facilities",
  total = 918,
  perPerson = 2,
}) => {
  const dataHor = [
    { name: "Igueben", value: 20150 },
    { name: "Etsako East", value: 9423 },
    { name: "Esan Central", value: 8555 },
    { name: "Esan West", value: 7866 },
    { name: "Esan North-East", value: 7475 },
    { name: "Ovia South-West", value: 7283 },
  ];

  const data: SummaryRow[] = [
    { lga: "Primary", population: "141", healthFacilities: 517, politicalWards: 658 },
    { lga: "Secondary", population: "44", healthFacilities: 14, politicalWards: 58 },
    { lga: "Tertiary", population: "0", healthFacilities: 3, politicalWards: 3 },
    { lga: "Total", population: "185", healthFacilities: 534, politicalWards: 719 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Row: Left cards & Right bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Two stacked cards */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-3 text-center">{title}</h2>
            <div className="flex justify-around items-center text-sm text-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-medium text-base">{total}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-green-600">
                  <FaArrowRight size={20} color="#16a34a" />
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-red-600 font-medium">{perPerson}</span>
                <span className="text-xs italic">per 10,000 population</span>
              </div>
            </div>
          </div>

          <SummaryTable title="Health Facility Summary" data={data} />
        </div>

        {/* Right: Horizontal Bar Chart */}
        <div className="lg:col-span-2 p-4 bg-white rounded-2xl shadow">
          <HorizontalStateBarChart
            title="Per Capita by LGA"
            data={dataHor}
            currencySymbol=""
            showValueSuffix="%"
            className="ui-w-full"
          />

        </div>
      </div>

      {/* Below: 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataCard
          title="Health Facilities by level of care"
          initialData={[
            { name: "Public", value: 8 },
            { name: "Private", value: 2 },
          ]}
          alternateData={[
            { name: "Primary", value: 7 },
            { name: "Secondary", value: 3 },
            { name: "Tertiary", value: 1 },
          ]}
        />
        <MapView
          mapClassName={`h-96 w-full rounded-xl shadow`}
          showCard={true}
          title="Health Facilities by LGA"
        />
      </div>
    </div>
  );
};

export default HealthFacility;
