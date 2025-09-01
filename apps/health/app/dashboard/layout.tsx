"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import State from "naija-state-local-government";
import "leaflet/dist/leaflet.css";

import LagosSVG from "../assets/map/lag.svg";
import KanoSVG from "../assets/map/lag.svg";
import AbujaSVG from "../assets/map/lag.svg";
import AbiaSVG from "../assets/map/NGAB.svg";
import Topbar from "@repo/ui/topbar";
import Sidebar from "@repo/ui/sidebar";
import { useTopbarFilters } from "./hooks/useTopBarFilter";

const stateLogos: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Lagos: LagosSVG,
  Abuja: AbujaSVG,
  Kano: KanoSVG,
  Abia: AbiaSVG,
};

const metadata: Metadata = {
  title: "NGF Health Desk",
  description: "Created by Opemipo Alomaja",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      // router.replace("/");
    }
  }, [router]);

  const sidebarWidth = collapsed ? 80 : 256;

  const { setSelectedState, setSelectedYear } = useTopbarFilters();

  return (
    <>
      <Toaster position="top-right" />
      <div
        className="flex min-h-screen bg-ngfGreen transition-all duration-300 ease-in-out"
        style={{ "--sidebar-width": `${sidebarWidth}px` } as any}
      >
        {/* Sidebar */}
        <div
          aria-label="sidebar-wrapper"
          className={`
            fixed left-0 top-0 h-full z-10 transition-all duration-300 bg-white shadow
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          `}
          style={{ width: sidebarWidth }}
        >
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </div>

        {/* Main area */}
        <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out md:ml-[var(--sidebar-width)]">
          <Topbar
            collapsed={collapsed}
            headerHeight="h-28"
            logos={stateLogos}
            state={State.states()}
            onToggleSidebar={() => setMobileOpen((o) => !o)}
            onStateChange={setSelectedState}
            onYearChange={setSelectedYear}
            showLogout={false}
          />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
