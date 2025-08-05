"use client";

import Image from "next/image";
import React from "react";

interface LoadingScreenProps {
  text?: string;
  fullscreen?: boolean;
  logoSrc?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  text = "Loading...",
  fullscreen = true,
  logoSrc = "/logo.png",
}) => {
  const containerClass = fullscreen
    ? "ui:fixed ui:inset-0 ui:bg-black/30 ui:z-50"
    : "ui:py-10";

  return (
    <div
      className={`ui:w-full ui:flex ui:items-center ui:justify-center ${containerClass}`}
    >
      <div className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:animate-pulse ui:space-y-4">
        <Image
          src={logoSrc}
          alt="Loading logo"
          width={180}
          height={60}
          className="ui:mx-auto"
          priority
        />
        {text && (
          <span className="ui:text-base ui:sm:text-lg ui:font-semibold ui:text-textRed ui:text-center ui:capitalize">
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
