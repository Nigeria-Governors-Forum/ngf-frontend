"use client";

import DemographyCard from "@repo/ui/demographyCard";
import { FaMapMarked, FaMoneyCheck, FaPersonBooth } from "react-icons/fa";
import DonutChart from "../components/DonoughtChart";
import MultiLineChart from "../components/LineChart";
import MapView from "../components/MapWrapper";
import { use, useEffect, useState } from "react";
import { Endpoints, httpClient } from "../../api-client/src";
import toast from "react-hot-toast";
import LoadingScreen from "@repo/ui/packages/ui/src/loadingScreen";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
// import { useTopbarFilters } from "./hooks/TopbarFiltersContext";

export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

export default function DashboardHome() {
  const [loading, setLoading] = useState(false);
  const { selectedState, selectedYear } = useTopbarFilters();
  const [stateData, setStateData] = useState<any>();

  const fetchData = async () => {
    if (!selectedState || !selectedYear) return;
    setLoading(true); // ✅ Start loading when fetch begins
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
      setLoading(false); // ✅ Stop loading when fetch completes
    }
  };

  useEffect(() => {
    console.log(selectedState, selectedYear);
    fetchData();
  }, [selectedState, selectedYear]);

  const chartData = [
    { name: "Covered", value: 94, color: "#FF3B30" }, // red
    { name: "Uncovered", value: 3, color: "#008000" }, // green
  ];

  const data = [
    { year: "2015", anc: 65, stunting: 34, zeroDose: 13 },
    { year: "2020", anc: 70, stunting: 40, zeroDose: 19 },
    { year: "2023", anc: 56, stunting: 44, zeroDose: 25 },
  ];

  const lines = [
    { key: "anc", name: "4th ANC", color: "#1D9BF0" }, // blue
    { key: "stunting", name: "Stunting", color: "#1E3A8A" }, // dark blue
    { key: "zeroDose", name: "Zero Dose", color: "#F97316" }, // orange
  ];

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <LoadingScreen text="Please wait..." />
        </div>
      )}
      <div className="space-y-8 min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
            subtitle={formatNumber(stateData?.healthFacilities.total_health_facilities || "N/A") as any}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Health workers"
            subtitle={formatNumber(730314)}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Health Institutions"
            subtitle={formatNumber(1979)}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="LGA's"
            subtitle={formatNumber(stateData?.no_of_lgas || "N/A")}
            icon={<FaMapMarked size={24} color="#16a34a" />}
          />
          <DemographyCard
            title="Partners mapping"
            subtitle={formatNumber(1979)}
            icon={<FaMoneyCheck size={24} color="#16a34a" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <DonutChart title="Health Insurance Coverage" data={chartData} />
          <MultiLineChart
            title="Maternal & Child Health Trends"
            data={data}
            lines={lines}
          />
          <MapView
            mapClassName={`h-96 w-full rounded-xl shadow`}
            showCard={true}
          />
        </div>
      </div>
    </>
  );
}
