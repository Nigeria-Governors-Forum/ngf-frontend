"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TopbarFiltersContextType {
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const TopbarFiltersContext = createContext<TopbarFiltersContextType | undefined>(undefined);

export function TopbarFiltersProvider({ children }: { children: ReactNode }) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const router = useRouter();

  useEffect(() => {
    const userProfile = sessionStorage.getItem("user");
    if (!userProfile) {
      router.push("/login");
      return;
    }

    try {
      const parsedUserProfile = JSON.parse(userProfile);
      if (Object.keys(parsedUserProfile).length === 0) {
        router.push("/login");
      }
      setSelectedState(parsedUserProfile.state || "");
    } catch {
      router.push("/login");
    }
  }, [router]);

  return (
    <TopbarFiltersContext.Provider
      value={{ selectedState, setSelectedState, selectedYear, setSelectedYear }}
    >
      {children}
    </TopbarFiltersContext.Provider>
  );
}

export function useTopbarFilters() {
  const ctx = useContext(TopbarFiltersContext);
  if (!ctx) {
    throw new Error("useTopbarFilters must be used inside TopbarFiltersProvider");
  }
  return ctx;
}
