"use client";

import HorizontalStateBarChart from "@repo/ui/amountBar";
import ComparisonBarChart from "@repo/ui/barchart";
import RechartMetricCard from "@repo/ui/rechartMetricCard";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Endpoints, httpClient } from "../../../api-client/src";
import LoadingScreen from "@repo/ui/loadingScreen";

const HealthFinance = () => {
  const [loading, setLoading] = useState(false);
  const { selectedState, selectedYear } = useTopbarFilters();
  const [stateData, setStateData] = useState<any>();

  const sample = [
    { name: "2020", actual: 120000, budgeted: 140000 },
    { name: "2021", actual: 90000, budgeted: 85000 },
    { name: "2022", actual: 150000, budgeted: 160000 },
    { name: "2023", actual: 120000, budgeted: 140000 },
    { name: "2024", actual: 150000, budgeted: 160000 },
  ];

  const data = [
    { name: "Igueben", value: 20150 },
    { name: "Etsako East", value: 9423 },
    { name: "Esan Central", value: 8555 },
    { name: "Esan West", value: 7866 },
    { name: "Esan North-East", value: 7475 },
    { name: "Ovia South-West", value: 7283 },
    { name: "Etsako West", value: 7268 },
    { name: "Owan-West", value: 7229 },
    { name: "Owan-East", value: 7119 },
    { name: "Ovia North-East", value: 6539 },
    { name: "Esan South-East", value: 6379 },
    { name: "Egor", value: 6241 },
    { name: "Uhunmwonde", value: 6166 },
    { name: "Akoko-Edo", value: 6034 },
    { name: "Orhionmwon", value: 5021 },
    { name: "Etsako Central", value: 4972 },
    { name: "Oredo", value: 3551 },
    { name: "Ikpoba-Okha", value: 32420, color: "#cccccc" },
  ];

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
        `${Endpoints.healthFinance.summary}/${stateParam}/${selectedYear}`
      );
      console.log(stats);
      setStateData(stats?.data);

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

  const stateTotal = Number(stateData?.state_budget?.total) || 0;
  const healthTotal = Number(stateData?.health_budget?.total) || 0;

  const percentage =
    healthTotal > 0 ? ((healthTotal / stateTotal) * 100).toFixed(2) : "0";
    
  return (
    <>
      {" "}
      {loading && <LoadingScreen text="Please wait..." />}
      <div className="space-y-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <RechartMetricCard
            variant="budget"
            title="Total State Budget"
            amount={stateData?.state_budget?.formattedTotal || 0}
            breakdown={stateData?.state_budget?.breakdown || []}
            currencySymbol="₦"
          />

          <RechartMetricCard
            variant="budget"
            title="Total Health Budget"
            amount={stateData?.health_budget?.formattedTotal || 0}
            breakdown={stateData?.health_budget?.breakdown || []}
            currencySymbol="₦"
          />

          <RechartMetricCard
            variant="gauge"
            title="Health Allocation"
            valuePct={Number(percentage)}
            maxPct={15}
          />

          <RechartMetricCard
            variant="simple"
            title="Health Expenditure per Capita"
            amount={4856.57}
            currencySymbol="₦"
            currencyDenotation="T"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4">
          <ComparisonBarChart
            title="Health Expenditure Trend"
            data={sample}
            currencySymbol="₦"
            actualColor="#2563EB"
            budgetColor="#10B981"
            className="ui:bg-white ui:rounded-2xl ui:shadow ui:p-4"
          />

          <div className="p-4 bg-white rounded-2xl shadow">
            <HorizontalStateBarChart
              title="Per Capita by LGA"
              data={data}
              currencySymbol="₦"
              showValueSuffix=""
              className="ui-w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthFinance;
