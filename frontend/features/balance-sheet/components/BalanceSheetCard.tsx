"use client";

import React from "react";
import { BalanceSheetProps } from "../types";
import { Scale, CheckCircle2 } from "lucide-react";

export default function BalanceSheetCard({ response }: BalanceSheetProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#0ea5e940",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-sky-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-950 border border-sky-700/50 text-sky-400">
            <Scale size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Balance Sheet Solvency</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-sky-950 border border-sky-800 text-sky-300">
          Accounting View
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs text-center mb-2">
        <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-800/30">
          <span className="text-[11px] text-slate-400 block">Total Assets</span>
          <span className="font-bold text-sky-300 text-sm mt-0.5 block">₹12.50M</span>
        </div>

        <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-800/30">
          <span className="text-[11px] text-slate-400 block">Liabilities</span>
          <span className="font-bold text-amber-300 text-sm mt-0.5 block">₹4.80M</span>
        </div>

        <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-800/30">
          <span className="text-[11px] text-slate-400 block">Total Equity</span>
          <span className="font-bold text-emerald-400 text-sm mt-0.5 block">₹7.70M</span>
        </div>
      </div>
    </div>
  );
}
