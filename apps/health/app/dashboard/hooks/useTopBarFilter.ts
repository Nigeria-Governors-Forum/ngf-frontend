import { useState } from "react";

export function useTopbarFilters() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


//   console.log('state',selectedState, 'year', selectedYear, "form hooks");

  return {
    selectedState,
    setSelectedState,
    selectedYear,
    setSelectedYear,
  };
}
