"use client";

import React, { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ConfirmPrompt from "./confirmPrompt";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

// import { useTopbarFilters } from "../../../apps/health/app/dashboard/hooks/TopbarFiltersContext";
import { useTopbarFilters } from "./hooks/TopbarFiltersContext";

export interface TopbarProps {
  collapsed?: boolean;
  userName?: string | null;
  onLogout?: () => void;
  title?: string;
  headerHeight?: string;
  logos?: Record<string, string | React.FC<React.SVGProps<SVGSVGElement>>>;
  state?: string[];
  onToggleSidebar?: () => void; // new
  showLogout?: boolean;
  onStateChange?: (state: string) => void;
  onYearChange?: (year: number) => void;
}

const Topbar: React.FC<TopbarProps> = ({
  collapsed,
  userName,
  onLogout,
  title = "Health Desk Dashboard",
  headerHeight = "h-16",
  logos = {},
  state = [],
  onToggleSidebar,
  showLogout = false,
  onStateChange,
  onYearChange,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [topBarTitle, setTopBarTitle] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const { selectedState, selectedYear, setSelectedYear, setSelectedState } =
    useTopbarFilters();

  useEffect(() => {
    if (!selectedYear) return;
    setTopBarTitle(
      pathname === "/dashboard"
        ? `Dashboard ${onYearChange ? ` - ${selectedYear}` : ""}`
        : pathname === "/dashboard/demography"
          ? `Demography ${onYearChange ? ` - ${selectedYear}` : ""}`
          : pathname === "/dashboard/health-facilities"
            ? `Health Facilities ${onYearChange ? ` - ${selectedYear}` : ""}`
            : pathname === "/dashboard/zonal-health-facilities"
              ? `Zonal and National View of Health Facilities per Capita`
              : pathname === "/dashboard/human-resource"
                ? `${selectedState} State Human Resource for Health Overview`
                : pathname ==="/dashboard/score-card"
                ? `NFG Scorecard`
                : title
    );
  }, [selectedYear, pathname, title, onYearChange]);

  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

  const handleLogout = () => setShowConfirm(true);

  const confirmLogout = () => {
    setShowConfirm(false);
    if (onLogout) onLogout();
  };

  const cancelPrompt = () => setShowConfirm(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const StateLogo = selectedState ? logos[selectedState] : null;

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setSelectedState(parsed?.state || "");
      }
    } catch (err) {
      console.warn("Invalid session user data:", err);
      setSelectedState("");
    }
  }, [setSelectedState]);

  return (
    <>
      <div
        className={`ui:${headerHeight} ui:bg-white ui:border-b ui:shadow ui:flex-col sm:ui:flex-row ui:items-start md:ui:items-center ui:px-4 ui:gap-4 ui:transition-all ui:duration-300`}
      >
        {onToggleSidebar && (
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="ui:md:hidden ui:mr-2 ui:p-2 ui:rounded ui:bg-[#06923E] ui:text-white ui:z-30 ui:mt-4"
          >
            <FaBars size={24} />
          </button>
        )}
        {/* Left: Greeting + Date */}
        <div className="ui:-col ui:sm:flex ui:justify-around">
          <div className="ui:flex ui:flex-col ui:items-center ui:sm:items-start ui:sm:p-4 ui:flex-1 ui:min-w-[160px] ">
            <h2 className="ui:text-lg ui:font-semibold ui:text-black ui:capitalize">
              {userName ? `Hi, ${userName} 👋🏽` : "Welcome 👋🏽"}
            </h2>
            <p className="ui:text-sm ui:font-medium ui:text-gray-600">
              {currentDate}
            </p>
          </div>

          {/* Center: Title + selectors */}
          <div className="ui:flex ui:flex-col ui:items-center ui:flex-1 ui:gap-2">
            <h2 className="ui:text-center ui:text-lg ui:font-bold ui:text-green-600">
              {topBarTitle}
            </h2>
            <div className="ui:flex ui:flex-wrap ui:gap-2">
              {/* State Select */}
              <select
                value={selectedState}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedState(value);
                  onStateChange?.(value);
                }}
                className="ui:px-3 ui:py-1 ui:border ui:rounded-md ui:border-green-400 ui:bg-white ui:text-green-700"
              >
                <option value="">Select State</option>
                {state.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Year Select */}
              <select
                value={selectedYear}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSelectedYear(value);
                  onYearChange?.(value);
                }}
                className="ui:px-3 ui:py-1 ui:border ui:rounded-md ui:border-green-400 ui:bg-white ui:text-green-700"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: State logo + logout */}
          <div className="ui:flex ui:items-center ui:justify-center ui:sm:justify-end  ui:gap-4 ui:flex-1 ui:min-w-[160px]">
            <div className="ui:flex ui:flex-col ui:items-end">
              <div className="ui:text-sm ui:font-medium ui:text-amber-950">
                {selectedState}
              </div>
            </div>
            {StateLogo && (
              <div className="ui:w-12 ui:h-12 ui:relative ui:bg-[#07923e] ui:rounded-2xl ui:my-4">
                <Image
                  src={(StateLogo as any).src ?? StateLogo}
                  alt={selectedState}
                  fill
                  className="ui:object-contain"
                />
              </div>
            )}
            {showLogout && (
              <button
                aria-label="Logout"
                className="ui:text-red-500 ui:border ui:border-red-200 ui:px-3 ui:py-1 ui:rounded ui:text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmPrompt
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onClose={cancelPrompt}
        />
      )}
    </>
  );
};

export default Topbar;
