import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { Header } from "@/components/header";

const fixelDisplayFont = localFont({
  src: [
    {
      path: "/../../public/fonts/FixelDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--fixel-display",
});

const fixelTextFont = localFont({
  src: [
    {
      path: "/../../public/fonts/FixelText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/../../public/fonts/FixelText-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/../../public/fonts/FixelText-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--fixel-text",
});

export const metadata: Metadata = {
  title: "Alt+Shift",
  description: "Generate your resume with AI",
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={`${fixelDisplayFont.variable} ${fixelTextFont.variable} max-w-6xl gap-8 flex flex-col p-4 sm:p-8 m-auto font-sans overflow-x-hidden`}
    >
      <Header />
      {children}
    </body>
  </html>
);

export default Layout;
