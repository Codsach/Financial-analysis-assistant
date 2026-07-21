"use client";

import React from "react";
import { RecommendationsProps } from "../types";
import { Lightbulb, CheckSquare, ArrowUpRight } from "lucide-react";

export default function RecommendationsCard({ response }: RecommendationsProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#fbbf2440",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-950 border border-amber-700/50 text-amber-400">
            <Lightbulb size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">AI Strategic Action Plan</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-amber-950 border border-amber-800 text-amber-300">
          3 Action Items
        </span>
      </div>

      <div className="space-y-2.5 text-xs mb-1">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
          <CheckSquare size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100">1. Optimize Operating Cost Structure</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-950 text-red-300 border border-red-800">
                High Priority
              </span>
            </div>
            <p className="text-slate-300 mt-1">
              Audit non-payroll OPEX to cut admin overhead by 5–8% in Q3.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
          <CheckSquare size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100">2. Accelerate Receivables Collection</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-950 text-red-300 border border-red-800">
                High Priority
              </span>
            </div>
            <p className="text-slate-300 mt-1">
              Offer 2% early-payment discounts for invoice settlement within 10 days.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
          <CheckSquare size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100">3. Reallocate Capital to High-Margin Lines</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                Medium Priority
              </span>
            </div>
            <p className="text-slate-300 mt-1">
              Expand consulting services capacity in Bangalore (28% gross margin).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
