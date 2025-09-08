"use client";

import DemographyCard from "@repo/ui/demographyCard";
import { FaMapMarked, FaMoneyCheck, FaPersonBooth } from "react-icons/fa";
import DonutChart from "../components/DonoughtChart";
import MultiLineChart from "../components/LineChart";
import MapView from "../components/MapWrapper";
import { useEffect, useState } from "react";
import { Endpoints, httpClient } from "../../api-client/src";
import toast from "react-hot-toast";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
import LoadingScreen from "@repo/ui/loadingScreen";
import { stat } from "fs";

export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

export default function DashboardHome() {
  const [loading, setLoading] = useState(false);
  const { selectedState, selectedYear, setSelectedState } = useTopbarFilters();
  const [stateData, setStateData] = useState<any>();

  const fetchData = async () => {
    if (!selectedState || !selectedYear) return;
    setLoading(true);
    if (selectedState === "Federal Capital Territory") setSelectedState("FCT");
    try {
      const stats = await httpClient.get(
        `${Endpoints.dashboard.summary}/${selectedState}/${selectedYear}`
      );
      console.log(stats);
      setStateData(stats.data);
      toast.success(`Welcome, ${selectedState} - ${selectedYear}!`);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedState, selectedYear]);

  const chartData = [
    { name: "Covered", value: stateData?.insurance_coverage, color: "#008000" }, // green
    {
      name: "Uncovered",
      value: 100 - (stateData?.insurance_coverage || 0),
      color: "#FF3B30",
    }, // red
  ];

  const data = [
    {
      year: stateData?.graphData[0].year,
      anc: stateData?.graphData[0]?.data[0]?.value,
      stunting: stateData?.graphData[0]?.data[1]?.value,
      zeroDose: stateData?.graphData[0]?.data[2]?.value,
    },
    {
      year: stateData?.graphData[1].year,
      anc: stateData?.graphData[1]?.data[0]?.value,
      stunting: stateData?.graphData[1]?.data[1]?.value,
      zeroDose: stateData?.graphData[1]?.data[2]?.value,
    },
    {
      year: stateData?.graphData[2]?.year,
      anc: stateData?.graphData[2]?.data[0]?.value,
      stunting: stateData?.graphData[2]?.data[1]?.value,
      zeroDose: stateData?.graphData[2]?.data[2]?.value,
    },
  ];

  const lines = [
    { key: "anc", name: "4th ANC", color: "#1D9BF0" }, // blue
    { key: "stunting", name: "Stunting", color: "#1E3A8A" }, // dark blue
    { key: "zeroDose", name: "Zero Dose", color: "#F97316" }, // orange
  ];

  return (
    <>
      {loading && <LoadingScreen text="Please wait..." />}
      <div className="space-y-8 min-h-screen">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DemographyCard
            title="State Population"
            subtitle={formatNumber(stateData?.total_population || "N/A") as any}
            icon={<FaPersonBooth size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Land mass"
            subtitle={formatNumber(stateData?.land_mass || "N/A") as any}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Political wards"
            subtitle={formatNumber(stateData?.political_wards || "N/A") as any}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Health Facility"
            subtitle={formatNumber(stateData?.healthFacilities || "N/A") as any}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Health workers"
            subtitle={formatNumber(stateData?.hRH_Professions || "N/A")}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Health Institutions"
            subtitle={formatNumber(stateData?.hRH || "N/A")}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="LGA's"
            subtitle={formatNumber(stateData?.no_of_lgas || "N/A")}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Partners mapping"
            subtitle={formatNumber(stateData?.partners_mapping || "N/A")}
            icon={<FaMoneyCheck size={24} color="#16a34a" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DonutChart title="Health Insurance Coverage" data={chartData} />
          <MultiLineChart
            title="Maternal & Child Health Trends"
            data={data}
            lines={lines}
          />
          <MapView
            mapClassName={`h-96 w-full rounded-xl shadow`}
            showCard={true}
            total={stateData?.demography_LGA.length || "N/A"}
            h2r={stateData?.totalHardToReach || "N/A"}
          />
        </div>
      </div>
    </>
  );
}
