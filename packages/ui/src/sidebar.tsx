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
  FaChevronDown,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import ConfirmPrompt from "./confirmPrompt";

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface NavItem {
  href?: string;
  icon: React.ReactNode;
  label: string;
  roles: string[];
  children?: NavItem[]; // ✅ add nested items
}

export const navItem: NavItem[] = [
  {
    label: "Health",
    icon: <FaTachometerAlt />,
    roles: ["user", "acct", "audit", "admin"],
    children: [
      {
        href: "/dashboard/",
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
        href: "/dashboard/health-facilities",
        icon: <FaMoneyCheck />,
        label: "Health Facilities",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/zonal-health-facilities",
        icon: <FaMoneyCheck />,
        label: "Zonal Health Facilities",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/human-resource",
        icon: <FaMoneyCheck />,
        label: "Human Resource",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/health-finance",
        icon: <FaMoneyCheck />,
        label: "Health Finance",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/zonal-health-finance",
        icon: <FaMoneyCheck />,
        label: "Zonal Health Finance",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/score-card",
        icon: <FaMoneyCheck />,
        label: "Score Cards",
        roles: ["user", "acct", "audit", "admin"],
      },
      {
        href: "/dashboard/upload-data",
        icon: <FaMoneyCheck />,
        label: "Data Upload",
        roles: ["h-admin", "s-admin", "user"],
      },
      // {
      //   href: "/dashboard",
      //   icon: <FaMoneyCheck />,
      //   label: "Access & Utilization",
      //   roles: ["user", "acct", "audit", "admin"],
      // },
      // {
      //   href: "/dashboard",
      //   icon: <FaMoneyCheck />,
      //   label: "Health Outcome",
      //   roles: ["user", "acct", "audit", "admin"],
      // },
      // {
      //   href: "/dashboard",
      //   icon: <FaMoneyCheck />,
      //   label: "Partner Mapping",
      //   roles: ["user", "acct", "audit", "admin"],
      // },
      // {
      //   href: "/dashboard",
      //   icon: <FaMoneyCheck />,
      //   label: "Flagship Project",
      //   roles: ["user", "acct", "audit", "admin"],
      // },
    ],
  },
  {
    href: "https://ngf-frontend-agric.vercel.app/",
    icon: <FaUniversity />,
    label: "Agriculture",
    roles: ["user", "acct", "audit", "admin"],
  },
  {
    href: "https://ngf-frontend-agric.vercel.app/",
    icon: <FaUniversity />,
    label: "Education",
    roles: ["user", "acct", "audit", "admin"],
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const pathname = usePathname();

  const normalizePath = (p: string) => {
    if (!p) return "/";
    return p.replace(/\/+$/, "") || "/";
  };

  // const pathnameRaw = usePathname() || "/";
  // const path = normalizePath(pathnameRaw);

  useEffect(() => {
    // Replace with real auth lookup
    const user = sessionStorage.getItem("user");
    const parsedUser = JSON.parse(user ?? "{}");
    console.log("role", parsedUser.role);

    setRole(parsedUser.role);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((o: boolean) => !o);
  }, [setMobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);

  // const filteredNav = navItems.filter((item) =>
  //   role ? item.roles.includes(role) : false
  // );

  const filteredNav = navItems
    .map((item) => {
      if (item.children) {
        // filter children by role
        const allowedChildren = item.children.filter((child) =>
          child.roles.includes(role!)
        );

        // keep parent only if it has visible children
        if (allowedChildren.length > 0) {
          return { ...item, children: allowedChildren };
        }
        return null;
      }

      // normal single item
      return item.roles.includes(role!) ? item : null;
    })
    .filter(Boolean) as NavItem[];

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

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
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

          {filteredNav.map((item) => {
            if (item.children && item.children.length > 0) {
              const isOpen = expanded[item.label];
              return (
                <div key={item.label} className="ui:space-y-1">
                  {/* Parent item */}
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="ui:w-full ui:flex ui:items-center ui:justify-between ui:p-2 ui:rounded ui:hover:bg-[#009B72]"
                  >
                    <div className="ui:flex ui:items-center ui:space-x-2">
                      <span>{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span>
                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                    )}
                  </button>

                  {/* Children */}
                  {isOpen && !collapsed && (
                    <div className="ui:ml-6 ui:flex ui:flex-col ui:space-y-1">
                      {item.children.map((child) => {
                        const isActive =
                          pathname === child.href ||
                          pathname.startsWith(child.href + "/");

                        return (
                          <Link
                            key={child.label}
                            href={child.href!}
                            className={`ui:p-2 ui:rounded ui:flex ui:items-center ui:space-x-2 ui:hover:bg-[#009B72] ${
                              isActive ? "ui:bg-[#009B72] ui:text-white" : ""
                            }`}
                            onClick={closeMobile}
                          >
                            <span>{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal single item
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href!}
                className={`ui:p-2 ui:rounded ui:flex ui:items-center ui:space-x-2 ui:hover:bg-[#009B72] ${
                  isActive ? "ui:bg-[#009B72] ui:text-white" : ""
                }`}
                onClick={closeMobile}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
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
