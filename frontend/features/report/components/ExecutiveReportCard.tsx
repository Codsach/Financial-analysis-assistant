"use client";

import React from "react";
import { ReportProps } from "../types";
import { FileText, Download, Printer } from "lucide-react";

export default function ExecutiveReportCard({ response }: ReportProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#8b5cf640",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-violet-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-950 border border-violet-700/50 text-violet-400">
            <FileText size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Board-Ready Executive Briefing</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-violet-950 border border-violet-800 text-violet-300 hover:bg-violet-900 transition-colors"
          >
            <Printer size={12} />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
