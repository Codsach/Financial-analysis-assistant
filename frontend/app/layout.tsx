import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import TopNav from "@/components/shared/TopNav";

export const metadata: Metadata = {
  title: "Financial Analysis Assistant",
  description:
    "AI-powered financial intelligence — analyse profits, losses, cash flow, and more across all your branches.",
  keywords: ["financial analysis", "AI", "dashboard", "profit", "loss", "cash flow"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex overflow-hidden" style={{ backgroundColor: "#0f0f1a" }}>
        {/* ── Sidebar ── */}
        <Sidebar />

        {/* ── Main content area ── */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Top navigation bar */}
          <TopNav />

          {/* Page content — scrollable */}
          <main
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: "#0f0f1a" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
