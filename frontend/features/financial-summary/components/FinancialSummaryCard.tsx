"use client";

import React from "react";
import { FinancialSummaryProps } from "../types";
import { LayoutDashboard, TrendingUp, DollarSign, Scale, ArrowUpRight } from "lucide-react";

export default function FinancialSummaryCard({ response }: FinancialSummaryProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#2d2d4e",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-700/50 text-indigo-400">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Financial Performance Overview</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "All Branches"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-indigo-950 border border-indigo-800 text-indigo-300">
          Executive Overview
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Gross Revenue</span>
          <span className="text-base font-bold text-slate-100">₹4,200,000</span>
          <span className="flex items-center text-[10px] text-emerald-400 mt-0.5">
            <ArrowUpRight size={10} /> +8.5% QoQ
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Operating Exp.</span>
          <span className="text-base font-bold text-slate-100">₹3,900,000</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">56.4% Payroll</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Net Profit</span>
          <span className="text-base font-bold text-emerald-400">₹300,000</span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">7.1% Net Margin</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Working Capital</span>
          <span className="text-base font-bold text-indigo-300">1.42 Ratio</span>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">Healthy Solvency</span>
        </div>
      </div>
    </div>
  );
}
