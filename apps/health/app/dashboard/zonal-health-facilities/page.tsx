"use client";

import React, { useEffect, useState } from "react";
import MapView from "../../components/MapWrapper";
import ZoneHealthCard from "../../components/ZoneHealthCard";
import { getZoneByState } from "nigerian-geopolitical-zones";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
import { Endpoints, httpClient } from "../../../api-client/src";
import toast from "react-hot-toast";
import LoadingScreen from "@repo/ui/loadingScreen";
import StateBarChart from "../../components/StateBarChart";

const ZonalHealthFacility = () => {
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState<any>();
  const [selectedZone, setSelectedZone] = useState<any>();
  const { selectedState, setSelectedState, selectedYear } = useTopbarFilters();

  const fetchData = async () => {
    if (!selectedState || !selectedYear) return;
    setLoading(true);
    const stateParam =
      selectedState === "Federal Capital Territory"
        ? "FCT"
        : selectedState === "Nassarawa"
          ? "Nasarawa"
          : selectedState;
    try {
      const stats = await httpClient.get(
        `${Endpoints.healthFacilities.zone}/${selectedZone}/${stateParam}/${selectedYear}`
      );
      console.log(stats);
      setStateData(stats?.data);
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
    fetchData();
  }, [selectedZone, selectedState, selectedYear]);

  const sampleData = stateData?.zoneWithin;

  return (
    <>
      {loading && <LoadingScreen text="Please wait..." />}
      <div className="min-h-screen space-y-6">
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side: zone selector + bar chart */}
          <div className="flex flex-col gap-6">
            {/* Zone filter card */}
            <div className="bg-white rounded-2xl shadow p-4">
              <ZoneHealthCard
                title="Geopolitical Zone"
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
            </div>

            {/* Bar chart */}
            <StateBarChart
              title="Zonal Comparison"
              data={sampleData}
              className="bg-white rounded-2xl shadow p-4 h-[500px]"
            />
          </div>

          {/* Right side: map */}
          <div className="bg-white rounded-2xl shadow p-4">
            <MapView
              mapClassName="h-[600px] w-full rounded-xl shadow"
              showCard={true}
              title="National Comparison"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ZonalHealthFacility;
