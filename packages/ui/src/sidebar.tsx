"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUniversity,
  FaWallet,
  FaMoneyBillWave,
  FaListAlt,
  FaClipboardCheck,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyCheck,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import ConfirmPrompt from "./confirmPrompt";

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  roles: string[];
}

export const navItem: NavItem[] = [
  {
    href: "/dashboard",
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard/demography",
    icon: <FaMoneyCheck />,
    label: "Demography",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Health Facilities",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Human Resource",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "dashboard/health-finance",
    icon: <FaMoneyCheck />,
    label: "Health Finance",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard/score-card",
    icon: <FaMoneyCheck />,
    label: "Score Cards",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Access & Utilization",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Health Outcome",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Partner Mapping",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard",
    icon: <FaMoneyCheck />,
    label: "Flagship Project",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "/dashboard/bank",
    icon: <FaUniversity />,
    label: "Banks",
    roles: ["acct", "audit", "admin"],
  },
  {
    href: "/dashboard/account",
    icon: <FaWallet />,
    label: "Accounts",
    roles: ["acct"],
  },
  {
    href: "/dashboard/currency",
    icon: <FaMoneyBillWave />,
    label: "Currencies",
    roles: ["acct"],
  },
  {
    href: "/dashboard/category",
    icon: <FaListAlt />,
    label: "Categories",
    roles: ["acct"],
  },
  {
    href: "/dashboard/transaction",
    icon: <FaClipboardCheck />,
    label: "Transaction",
    roles: ["acct", "audit", "admin"],
  },
  {
    href: "/dashboard/audit",
    icon: <FaClipboardCheck />,
    label: "Audit",
    roles: ["audit", "admin"],
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  navItems = navItem,
}) => {
  const [role, setRole] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const pathname = usePathname();

  const normalizePath = (p: string) => {
    if (!p) return "/";
    return p.replace(/\/+$/, "") || "/";
  };

  // const pathnameRaw = usePathname() || "/";
  // const path = normalizePath(pathnameRaw);

  useEffect(() => {
    // Replace with real auth lookup
    setRole("user");
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((o: boolean) => !o);
  }, [setMobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);

  const filteredNav = navItems.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  const isActive = useCallback(
    (href: string) => {
      if (href === "/dashboard") return pathname === href;
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleLogout = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const confirmLogout = () => {
    setShowConfirm(false);
  };
  const cancelPrompt = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        aria-label="Toggle sidebar"
        onClick={toggleMobile}
        className="ui:md:hidden ui:fixed ui:top-4 ui:right-4 ui:z-50 ui:bg-white ui:text-[#06923E] ui:p-2 ui:rounded"
      >
        <FaTimes size={24} />
      </button>

      {/* Sidebar container */}
      <div
        aria-label="Sidebar"
        className={cn(
          "ui:fixed ui:top-0 ui:left-0 ui:h-screen ui:bg-[#06923E] ui:text-white ui:p-4 ui:z-40 ui:flex ui:flex-col ui:justify-between ui:transition-all ui:duration-300",
          collapsed ? "ui:w-20" : "ui:w-64",
          mobileOpen ? "ui:translate-x-0" : "ui:-translate-x-full",
          "ui:md:translate-x-0"
        )}
      >
        <div>
          {/* Collapse toggle (desktop) */}
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed(!collapsed)}
            className="ui:hidden ui:md:flex ui:items-center ui:justify-center ui:absolute ui:top-4 ui:right-[-16px] ui:bg-[#06923E] ui:border ui:border-white ui:rounded-full ui:w-8 ui:h-8 ui:z-50 ui:shadow"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* Logo */}
          <div className={cn("ui:flex", collapsed ? "ui:py-2" : "ui:py-5")}>
            <Image
              src="/logo.png"
              alt="NGF Logo"
              width={collapsed ? 50 : 180}
              height={collapsed ? 50 : 60}
              priority
              className={cn(
                "ui:object-contain ui:transition-all ui:duration-300 ui:h-auto",
                collapsed ? "ui:w-10" : "ui:w-36"
              )}
            />
          </div>

          {/* Navigation */}
          <nav
            className="ui:flex ui:flex-col ui:space-y-2 ui:mt-2"
            aria-label="Main navigation"
          >
            {role &&
              navItems
                .filter((item) => item.roles.includes(role))
                .map((item) => {
                  // Normalize href too (strip leading slash for comparison)
                  const rawHref = item.href.startsWith("/")
                    ? item.href
                    : `/${item.href}`;
                  const normalizedHref = normalizePath(rawHref);

                  // Active if exact match or deeper under that route (except root dashboard)
                  const isActive =
                    normalizedHref === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname === normalizedHref ||
                        pathname.startsWith(normalizedHref + "/");

                  return (
                    <Link
                      key={item.label}
                      href={isActive ? "#" : rawHref}
                      onClick={(e) => {
                        if (isActive) {
                          e.preventDefault();
                          return;
                        }
                        closeMobile();
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`ui:p-2 ui:rounded ui:flex ui:items-center ui:space-x-2 ui:transition-all ui:duration-200 ui:hover:bg-[#009B72] ${
                        isActive ? "ui:bg-[#009B72] ui:text-white" : ""
                      }`}
                    >
                      <span className="ui:text-lg">{item.icon}</span>
                      {!collapsed && (
                        <span className="ui:ml-2 ui:truncate">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
          </nav>
        </div>

        {/* Footer with logout */}
        <div className="ui:mt-4 ui:border-t ui:border-white/30 ui:pt-4">
          <button
            onClick={handleLogout}
            className="ui:w-full ui:flex ui:items-center ui:gap-2 ui:px-2 ui:py-2 ui:rounded ui:transition-colors ui:duration-200 ui:hover:bg-white/10 ui:outline-none"
            aria-label="Logout"
          >
            <FaSignOutAlt className="ui:text-xl" />
            {!collapsed && (
              <span className="ui:ml-2 ui:text-sm ui:font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className="ui:fixed ui:inset-0 ui:bg-black ui:bg-opacity-40 ui:z-30 ui:md:hidden"
        />
      )}

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

export default Sidebar;
