import HorizontalStateBarChart from "@repo/ui/amountBar";
import ComparisonBarChart from "@repo/ui/barchart";
import RechartMetricCard from "@repo/ui/rechartMetricCard";

const HealthFinance = () => {
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

  return (
    <div className="space-y-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <RechartMetricCard
          variant="budget"
          title="Total State Budget"
          amount={0.53}
          currencySymbol="₦"
          breakdown={[
            { label: "Capital", percentage: 58, color: "#3B82F6" },
            { label: "Overhead", percentage: 24, color: "#1E3A8A" },
            { label: "Personnel", percentage: 18, color: "#C9672A" },
          ]}
        />

        <RechartMetricCard
          variant="budget"
          title="Total Health Budget"
          amount={0.53}
          currencySymbol="₦"
           breakdown={[
          { label: "Marketing", percentage: 40, color: "#3b82f6" }, // blue
          { label: "Operations", percentage: 30, color: "#10b981" }, // green
          { label: "R&D", percentage: 20, color: "#f59e0b" }, // amber
          { label: "Other", percentage: 10, color: "#ef4444" }, // red
        ]}
        />

        <RechartMetricCard
          variant="gauge"
          title="Health Allocation"
          valuePct={12.3}
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
  );
}

export default HealthFinance;
