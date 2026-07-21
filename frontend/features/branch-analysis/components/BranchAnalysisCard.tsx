"use client";

import React from "react";
import { BranchAnalysisProps } from "../types";
import { Building2, ArrowUpRight, Scale } from "lucide-react";

export default function BranchAnalysisCard({ response }: BranchAnalysisProps) {
  const sources = response.sources || {};
  const branchLabel = sources.branches
    ? sources.branches.join(" vs ")
    : sources.branch || "Bangalore vs Mysore";

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#f59e0b40",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-950 border border-amber-700/50 text-amber-400">
            <Building2 size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Multi-Branch Performance Comparison</h4>
            <p className="text-[11px] text-slate-400">
              {branchLabel} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-amber-950 border border-amber-800 text-amber-300">
          Branch Comparison
        </span>
      </div>

      <div className="overflow-x-auto mb-3">
        <table className="w-full text-xs text-left text-slate-300">
          <thead className="text-[11px] uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-3 py-2">Metric</th>
              <th className="px-3 py-2">Bangalore</th>
              <th className="px-3 py-2">Mysore</th>
              <th className="px-3 py-2">Variance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="px-3 py-2 font-medium text-slate-200">Gross Revenue</td>
              <td className="px-3 py-2">₹4,200,000</td>
              <td className="px-3 py-2">₹2,800,000</td>
              <td className="px-3 py-2 text-emerald-400">+50.0% (BLR)</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-slate-200">Operating Exp.</td>
              <td className="px-3 py-2 text-red-300">₹3,900,000</td>
              <td className="px-3 py-2 text-emerald-300">₹2,300,000</td>
              <td className="px-3 py-2 text-red-400">+69.5% (BLR)</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-slate-200">Net Margin %</td>
              <td className="px-3 py-2">7.1%</td>
              <td className="px-3 py-2 text-emerald-400 font-bold">17.8%</td>
              <td className="px-3 py-2 text-emerald-400">+10.7% (MYS)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
