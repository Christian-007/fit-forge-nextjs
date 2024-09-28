import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(inter.className, "antialiased h-full")}>
        {children}
      </body>
    </html>
  );
}
