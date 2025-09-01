"use client";

import React, { useState } from "react";
import MapView from "../../components/MapWrapper";
import ZoneHealthCard from "../../components/ZoneHealthCard";
import ComparisonBarChart from "@repo/ui/barchart";
import CustomBarChart from "../../components/CustomBarChart";

interface ZonalHealthFacilityPageProps {
  state?: string;
  title?: string;
  total?: string | number;
  perPerson?: string | number;
}

const ZonalHealthFinance: React.FC<ZonalHealthFacilityPageProps> = ({
  state = "Akwa Ibom",
  title = "Year",
}) => {
  const data = [
    { name: "Yobe", value: 2727, color: "#60A5FA" },
    { name: "Gombe", value: 2555, color: "#3B82F6" },
    { name: "Adamawa", value: 1590, color: "#2563EB" },
    { name: "Taraba", value: 1522, color: "#1D4ED8" },
    { name: "Borno", value: 1439, color: "#1E40AF" },
    { name: "Bauchi", value: 1339, color: "#1E3A8A" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <CustomBarChart
            title="Health Allocation (Zonal Comparison)"
            data={data}
            benchmark={2000} // ✅ Add a benchmark line (e.g., ₦2000)
          />
          <CustomBarChart
            title="Per Capita Expenditure (Zonal Comparison)"
            data={data}
            benchmark={2000} // ✅ Add a benchmark line (e.g., ₦2000)
          />
        </div>
        <MapView
          mapClassName="h-96 w-full rounded-xl shadow"
          showCard={true}
          title="National Comparison"
        />
      </div>
    </div>
  );
};

export default ZonalHealthFinance;
