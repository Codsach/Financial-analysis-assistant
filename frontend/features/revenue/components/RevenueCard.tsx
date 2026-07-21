"use client";

import React from "react";
import { RevenueProps } from "../types";
import { DollarSign, Layers, ArrowUpRight } from "lucide-react";

export default function RevenueCard({ response }: RevenueProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#7c3aed40",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-violet-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-950 border border-violet-700/50 text-violet-400">
            <DollarSign size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Revenue Drivers & Segment Growth</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-violet-950 border border-violet-800 text-violet-300">
          Revenue Breakdown
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Enterprise</span>
          <span className="font-bold text-slate-100 block mt-0.5">₹2.10M (50%)</span>
          <span className="text-[10px] text-emerald-400 flex items-center mt-0.5">
            <ArrowUpRight size={10} /> +12% YoY
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Consulting</span>
          <span className="font-bold text-slate-100 block mt-0.5">₹1.40M (33%)</span>
          <span className="text-[10px] text-emerald-400 flex items-center mt-0.5">
            <ArrowUpRight size={10} /> +14% QoQ
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Retail</span>
          <span className="font-bold text-slate-100 block mt-0.5">₹0.70M (17%)</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Seasonal</span>
        </div>
      </div>
    </div>
  );
}
