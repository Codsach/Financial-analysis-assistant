"use client";

import React from "react";
import { CashFlowProps } from "../types";
import { Waves, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function CashFlowCard({ response }: CashFlowProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#14b8a640",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-teal-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-950 border border-teal-700/50 text-teal-400">
            <Waves size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Cash Flow Movements & Liquidity</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-teal-950 border border-teal-800 text-teal-300">
          Net: +₹280,000
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-800/30">
          <span className="text-[11px] text-slate-400 block">Operating (OCF)</span>
          <span className="font-bold text-emerald-400 block mt-0.5">+₹850,000</span>
        </div>

        <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-800/30">
          <span className="text-[11px] text-slate-400 block">Investing (ICF)</span>
          <span className="font-bold text-red-300 block mt-0.5">-₹420,000</span>
        </div>

        <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-800/30">
          <span className="text-[11px] text-slate-400 block">Financing (FCF)</span>
          <span className="font-bold text-amber-300 block mt-0.5">-₹150,000</span>
        </div>
      </div>
    </div>
  );
}
