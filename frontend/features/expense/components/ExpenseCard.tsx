"use client";

import React from "react";
import { ExpenseProps } from "../types";
import { Receipt, AlertCircle } from "lucide-react";

export default function ExpenseCard({ response }: ExpenseProps) {
  const sources = response.sources || {};

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#ec489940",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-pink-950 border border-pink-700/50 text-pink-400">
            <Receipt size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Operating Expense Composition</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-pink-950 border border-pink-800 text-pink-300">
          Total: ₹3,900,000
        </span>
      </div>

      <div className="space-y-2 mb-2 text-xs">
        <div>
          <div className="flex justify-between mb-1 text-slate-300">
            <span>Payroll & Benefits</span>
            <span className="font-semibold text-slate-100">₹2,200,000 (56.4%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-pink-500 rounded-full" style={{ width: "56.4%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-slate-300">
            <span>Facilities & Rent</span>
            <span className="font-semibold text-slate-100">₹750,000 (19.2%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: "19.2%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
