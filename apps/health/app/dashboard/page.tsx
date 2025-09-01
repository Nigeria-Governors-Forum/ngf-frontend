import DemographyCard from "@repo/ui/demographyCard";
import { FaMapMarked, FaMoneyCheck, FaPersonBooth } from "react-icons/fa";
import DonutChart from "../components/DonoughtChart";
import MultiLineChart from "../components/LineChart";
import MapView from "../components/MapWrapper";

export default function DashboardHome() {
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
    <div className="space-y-8 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DemographyCard
          title="State Population"
          subtitle="5,150,630"
          icon={<FaPersonBooth size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Land mass"
          subtitle="38,832"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Political wards"
          subtitle="38,832"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Health Facility"
          subtitle="1979"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Health workers"
          subtitle="730,314"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Health Institutions"
          subtitle="1979"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Political ward"
          subtitle="1979"
          icon={<FaMapMarked size={24} color="#16a34a" />}
        />
        <DemographyCard
          title="Partners mapping"
          subtitle="1979"
          icon={<FaMoneyCheck size={24} color="#16a34a" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  );
}
