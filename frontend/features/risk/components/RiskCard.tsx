"use client";

import React from "react";
import { RiskProps } from "../types";
import { ShieldAlert, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RiskCard({ response }: RiskProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#f9731640",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-950 border border-orange-700/50 text-orange-400">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Financial Risk Assessment Flags</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-orange-950 border border-orange-800 text-orange-300">
          2 Flags Identified
        </span>
      </div>

      <div className="space-y-2 text-xs mb-2">
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-300">Accounts Receivable Concentration</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-900 text-red-100 uppercase">
                High Risk
              </span>
            </div>
            <p className="text-slate-300 mt-1">
              42% of total accounts receivable are concentrated in 2 enterprise clients.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/50 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300">OPEX Outpacing Revenue Growth</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-900 text-amber-100 uppercase">
                Medium Risk
              </span>
            </div>
            <p className="text-slate-300 mt-1">
              Operating expenses grew 11.2% QoQ while revenue grew 8.5%.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 flex items-start gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-300">Debt Service Coverage</span>
            <p className="text-slate-300 mt-0.5">
              Interest coverage ratio is robust at 6.4x (Low Risk).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
