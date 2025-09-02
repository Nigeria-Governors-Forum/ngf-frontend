import type { NextConfig } from "next";
// import withTM from "next-transpile-modules";

// const withTranspile = withTM(["@repo/ui"]);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Find the existing rule that handles SVGs (as images) and exclude SVGs from it
    const fileLoaderRule = config.module.rules.find(
      (rule) =>
        typeof rule === "object" &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add SVGR loader for SVGs
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    console.log(
      "SVG loader rule:",
      config.module.rules.find((rule) => rule.test && rule.test.test && rule.test.test('.svg'))
    );

    return config;
  },
};

// export default withTranspile(nextConfig);
export default nextConfig;
