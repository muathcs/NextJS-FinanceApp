"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

import FinanceContextProvider from "@/lib/store/finance-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceContextProvider>
          <Navigation />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
