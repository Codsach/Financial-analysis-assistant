"use client";

import React from "react";
import { LossProps } from "../types";
import { TrendingDown, AlertTriangle, ShieldAlert } from "lucide-react";

export default function LossCard({ response }: LossProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#ef444440",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-red-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-950 border border-red-700/50 text-red-400">
            <TrendingDown size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Loss & Cost Overrun Breakdown</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-red-950 border border-red-800 text-red-300">
          Loss Drivers
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/30 flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-red-300 block">Senior Staff Recruitment (+₹450,000)</span>
            <span className="text-slate-300">Unplanned hiring surge in Q2 inflated payroll overhead.</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/30 flex items-start gap-3">
          <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-amber-300 block">Delayed Client Billing (₹350,000)</span>
            <span className="text-slate-300">Enterprise receivables delayed to Q3 procurement cycle.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
