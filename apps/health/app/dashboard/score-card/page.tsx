"use client";

import ScorecardTable, { ScorecardRow } from "@repo/ui/scoreCard";
import { useState } from "react";

interface ScoreCardProps {
  state: string;
}
const ScoreCard: React.FC<ScoreCardProps> = ({ state = "Akwa Ibom" }) => {
  const categories = [
    { value: "dma", label: "DMA" },
    { value: "health_info", label: "Health Information" },
    { value: "health_insurance", label: "Health Insurance" },
    { value: "health_security", label: "Health Security" },
    { value: "immunization", label: "Immunization" },
    { value: "phccl", label: "PHCCL" },
  ];

  const columnTwo: ScorecardRow[] = [
    { indicator: "60% Ward PHCs Capitalized", status: "no" },
    { indicator: "DMA Established", status: "no" },
    { indicator: "DMA Fully Capitalized", status: "no" },
    { indicator: "Functional Warehousing System", status: "no" },
    { indicator: "Single Supply Chain", status: "no" },
    { indicator: "State owns Last Mile", status: "no" },
  ];

  const columns = [
    { key: "state", label: "State" },
    { key: "ward_phcs", label: "60% Ward PHCs Capitalized" },
    { key: "dma_established", label: "DMA Established" },
    { key: "dma_fully", label: "DMA Fully Capitalized" },
    { key: "warehousing", label: "Functional Warehousing System" },
    { key: "single_supply", label: "Single Supply Chain" },
    { key: "last_mile", label: "State owns Last Mile" },
  ];

  const sampleData = [
    {
      state: "Akwa Ibom",
      phc: "no",
      dma: "no",
      dmaCapita: "no",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "no",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    {
      state: "Bauchi",
      phc: "yes",
      dma: "yes",
      dmaCapita: "yes",
      warehouse: "no",
      supplyChain: "no",
      stateOwn: "yes",
    },
    // ... more rows
  ];

  const singleStateData: Record<string, ScorecardRow[]> = {
    dma: [
      { indicator: "60% Ward PHCs Capitalized", status: "no" },
      { indicator: "DMA Established", status: "no" },
      { indicator: "DMA Fully Capitalized", status: "no" },
    ],
    health_info: [
      { indicator: "Data Reporting Complete", status: "yes" },
      { indicator: "Electronic Health Records", status: "no" },
    ],
    health_insurance: [
      { indicator: "State Health Insurance Agency", status: "yes" },
      { indicator: "Coverage Above 50%", status: "no" },
    ],
    health_security: [{ indicator: "Emergency Response Unit", status: "no" }],
    immunization: [
      { indicator: "Routine Immunization Coverage", status: "yes" },
    ],
    phccl: [{ indicator: "Primary Health Care Centers Linked", status: "no" }],
  };
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.value
  );

  return (
    <>
      <div className="flex justify-around text-black">
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Scorecard Dashboard
          </h1>
        </div>

        <div className="mb-6 text-black">
          <label htmlFor="category" className="mr-2 font-medium">
            Select Category:
          </label>
          <select
            id="category"
            className="border rounded px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single State View */}
        <ScorecardTable
          mode="single"
          title={`${state} Scorecard`}
          data={columnTwo}
        />
        {/* Multi State View */}
        <ScorecardTable mode="multi" title="National View" data={sampleData} />
      </div>
    </>
  );
};

export default ScoreCard;
