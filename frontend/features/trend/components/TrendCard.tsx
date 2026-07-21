"use client";

import React from "react";
import { TrendProps } from "../types";
import { LineChart, TrendingUp, Calendar } from "lucide-react";

export default function TrendCard({ response }: TrendProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#6366f140",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-700/50 text-indigo-400">
            <LineChart size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">4-Quarter Trajectory & Forecasting</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; 2025-Q3 to 2026-Q2
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-indigo-950 border border-indigo-800 text-indigo-300">
          Historical Trend
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs mb-2">
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">2025-Q3</span>
          <span className="font-bold text-slate-200 block mt-0.5">₹3.40M</span>
          <span className="text-[9px] text-slate-400">Margin 8.2%</span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">2025-Q4</span>
          <span className="font-bold text-slate-200 block mt-0.5">₹3.90M</span>
          <span className="text-[9px] text-slate-400">Margin 9.1%</span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">2026-Q1</span>
          <span className="font-bold text-slate-200 block mt-0.5">₹3.87M</span>
          <span className="text-[9px] text-slate-400">Margin 7.8%</span>
        </div>
        <div className="p-2 rounded bg-indigo-950/40 border border-indigo-700/50">
          <span className="text-[10px] text-indigo-300 font-semibold block">2026-Q2</span>
          <span className="font-bold text-emerald-400 block mt-0.5">₹4.20M</span>
          <span className="text-[9px] text-indigo-300">Margin 7.1%</span>
        </div>
      </div>
    </div>
  );
}
