import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";

import localFont from "next/font/local";

const aptos = localFont({
  src: './fonts/Aptos.woff2'
});


export const metadata: Metadata = {
  title: "NGF Health Desk",
  description: "Created by Opemipo Alomaja",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={aptos.className}>{children}</body>
    </html>
  );
}
