"use client";

import React from "react";

interface DemographyCardProps {
  title: string;
  subtitle: string;
  icon?: any;
}

const DemographyCard: React.FC<DemographyCardProps> = ({
  title,
  subtitle,
  icon,
}) => {
  return (
    <div className="ui:bg-white ui:rounded-xl ui:shadow-md ui:p-4 ui:border-2 ui:border-b-green-500 ui:flex ui:flex-col ui:gap-1 ui:transition ui:duration-150 hover:ui:shadow-lg hover:ui:-translate-y-0.5">
      <div className="ui:flex ui:justify-between ui:items-start">
        <div className="">
          <h3 className="ui:text-lg ui:font-bold ui:text-green-600">{title}</h3>
          <p className="ui:text-gray-600 ui:text-2xl">{subtitle}</p>
        </div>
        {icon && (
          <div className="ui:flex ui:items-center ui:justify-center ui:flex-none">
            <div className="ui:bg-green-50 ui:rounded-full ui:p-2">
              {/* {React.cloneElement(icon, {
                className: "ui:text-green-600",
                size: 20,
                "aria-hidden": true,
              })} */}
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemographyCard;
