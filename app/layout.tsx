import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import { Topbar } from "@/app/shared/components";

const figtree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitForge",
  description: "An app for all of your daily fitness needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={clsx(
          figtree.className,
          "antialiased flex justify-center items-start min-h-screen bg-[#1D2029] dark:text-white"
        )}
      >
        <div className="w-[480px] h-full dark flex flex-col overflow-hidden">
          <Topbar />
          <div className="pt-14 bg-[#152119] min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
