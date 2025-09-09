"use client";

import React, { useEffect, useState } from "react";
import DemographyCard from "@repo/ui/demographyCard";
import LgaSummaryTable, { LgaLookup, LgaRow } from "@repo/ui/lgaSummaryTable";
import { FaMoneyCheck } from "react-icons/fa";
import MapView from "../../components/MapWrapper";
import { Endpoints, httpClient } from "../../../api-client/src";
import toast from "react-hot-toast";
import LoadingScreen from "@repo/ui/loadingScreen";
import { useTopbarFilters } from "@repo/ui/hooks/TopbarFiltersContext";
import { formatNumber } from "../page";

const DemographyPage = () => {
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState<any>();
  const { selectedState, selectedYear, setSelectedState } = useTopbarFilters();

  console.log(selectedState, selectedYear);

  const fetchData = async () => {
    if (!selectedState || !selectedYear) return;
    setLoading(true);
    if (selectedState === "Federal Capital Territory") setSelectedState("FCT");
    try {
      const stats = await httpClient.get(
        `${Endpoints.demography.summary}/${selectedState}/${selectedYear}`
      );
      // console.log(stats);
      setStateData(stats?.data);
      toast.success(`Record Found for, ${selectedState} - ${selectedYear}!`);
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

  const data: LgaLookup[] = Array.isArray(stateData?.demography_LGA)
    ? stateData.demography_LGA
    : [];
;
  return (
    <>
      {loading && <LoadingScreen text="Please wait..." />}
      <div className="flex flex-col gap-6">
        {/* Left: takes 2x space */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <DemographyCard
            title="Year created"
            subtitle={stateData?.year_created || "N/A"}
          />
          <DemographyCard
            title="Total population"
            subtitle={
              formatNumber(Number(stateData?.total_population)) || "N/A"
            }
          />
          <DemographyCard
            title="Land mass"
            subtitle={formatNumber(Number(stateData?.land_mass)) || "N/A"}
          />
          <DemographyCard
            title="Under 1 pop"
            subtitle={formatNumber(Number(stateData?.under_1)) || "N/A"}
          />
          <DemographyCard
            title="LGAs"
            subtitle={formatNumber(Number(stateData?.no_of_lgas)) || "N/A"}
          />
          <DemographyCard
            title="Under 5 pop"
            subtitle={formatNumber(Number(stateData?.under_5)) || "N/A"}
          />
          <DemographyCard
            title="Political ward"
            subtitle={formatNumber(Number(stateData?.political_wards)) || "N/A"}
          />
          <DemographyCard
            title="WCBA"
            subtitle={formatNumber(Number(stateData?.wcba)) || "N/A"}
          />
          <DemographyCard
            title="Health Facility"
            subtitle={
              formatNumber(Number(stateData?.health_facilities)) || "N/A"
            }
          />
          <DemographyCard
            title="Pregnant women "
            subtitle={formatNumber(Number(stateData?.pregnant_women)) || "N/A"}
            icon={<FaMoneyCheck size={24} color="#16a34a" />}
          />
        </div>

        {/* Center: single card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MapView
            mapClassName={`h-96 w-full rounded-xl shadow`}
            showCard={true}
            total={stateData?.demography_LGA?.length}
            h2r={stateData?.total_Hard_To_Reach}
          />
          <LgaSummaryTable title="LGA Summary" data={data} />
        </div>
      </div>
    </>
  );
};

export default DemographyPage;
