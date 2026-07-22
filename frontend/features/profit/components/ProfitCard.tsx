"use client";

import React from "react";
import { ProfitProps } from "../types";
import { TrendingUp, PieChart, CheckCircle2 } from "lucide-react";

export default function ProfitCard({ response }: ProfitProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#10b98140",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-400">
            <TrendingUp size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Profit Driver Analysis</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-950 border border-emerald-800 text-emerald-300">
          Profit Drivers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-emerald-300">
            <PieChart size={14} />
            <span>High Margin Segment</span>
          </div>
          <p className="text-xs text-slate-300">
            Enterprise Consulting yielded <strong className="text-emerald-400">28.5% Gross Margin</strong> (+14% QoQ growth).
          </p>
        </div>

        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-emerald-300">
            <CheckCircle2 size={14} />
            <span>Net Profit Contribution</span>
          </div>
          <p className="text-xs text-slate-300">
            Contributed <strong className="text-emerald-400">₹300,000</strong> net profit to group bottom line.
          </p>
        </div>
      </div>
    </div>
  );
}
