"use client";

import React, { useEffect, useState } from "react";
import MapView from "../../components/MapWrapper";
import ZoneHealthCard from "../../components/ZoneHealthCard";
import ComparisonBarChart from "@repo/ui/barchart";
import {
  getAllZones,
  getZoneData,
  getZoneByState,
} from "nigerian-geopolitical-zones";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
import { Endpoints, httpClient } from "../../../api-client/src";
import toast from "react-hot-toast";
import LoadingScreen from "@repo/ui/loadingScreen";

const ZonalHealthFacility = () => {
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState<any>();
  const [selectedZone, setSelectedZone] = useState<any>();
  const { selectedState, setSelectedState, selectedYear } = useTopbarFilters();

  const fetchData = async () => {
    if (!selectedState || !selectedYear) return;
    setLoading(true);
    if (selectedState === "Federal Capital Territory") setSelectedState("FCT");
    if (selectedState === "Nassarawa") setSelectedState("Nasarawa");
    try {
      const stats = await httpClient.get(
        `${Endpoints.healthFacilities.zone}/${selectedZone}/${selectedYear}`
      );
      console.log(stats);
      setStateData(stats.data);
      toast.success(`Data found, ${selectedState} - ${selectedYear}!`);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const zoneArea = getZoneByState(selectedState.toLocaleLowerCase());
    setSelectedZone(zoneArea?.zone.toLocaleLowerCase());

    console.log(selectedZone);

    fetchData();
  }, [selectedZone, selectedState]);

  const sampleData = [
    { name: "2020", actual: 120000, budgeted: 140000 },
    // { name: "2021", actual: 90000, budgeted: 85000 },
    { name: "2022", actual: 150000, budgeted: 160000 },
    // { name: "2023", actual: 120000, budgeted: 140000 },
    // { name: "2024", actual: 150000, budgeted: 160000 },
  ];

  return (
    <>
      {loading && <LoadingScreen text="Please wait..." />}
      <div className="flex flex-col gap-6">
        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 justify-between ">
          <ZoneHealthCard
            title="Zone"
            options={[
              { value: "north west", label: "North West" },
              { value: "north central", label: "North Central" },
              { value: "north east", label: "North East" },
              { value: "south west", label: "South West" },
              { value: "south east", label: "South East" },
              { value: "south south", label: "South South" },
            ]}
            onChange={(value) => {
              setSelectedZone(value);
              console.log("Selected zone:", value);
            }}
            defaultValue={selectedZone}
          />

          {/* <ZoneHealthCard
          title="State"
          options={[
            { value: "North West", label: "North West" },
            { value: "North Central", label: "North Central" },
            { value: "South West", label: "South West" },
            { value: "South East", label: "South East" },
          ]}
          onChange={(value) => {
            setSelectedState(value);
            console.log("Selected state:", value);
          }}
          defaultValue={selectedState}
        /> */}

          {/* <div className="bg-white rounded-xl shadow-md p-4">
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
        </div> */}
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
    </>
  );
};

export default ZonalHealthFacility;
