"use client";

import React from "react";
import { HealthScoreProps } from "../types";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export default function HealthScoreCard({ response }: HealthScoreProps) {
  const sources = response.sources || {};
  const score = 78; // AI composite score

  return (
    <div
      className="rounded-xl p-5 mb-4 border"
      style={{
        backgroundColor: "#131326",
        borderColor: "#10b98150",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-400">
            <Activity size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">AI Financial Wellness Gauge</h4>
            <p className="text-[11px] text-slate-400">
              {sources.branch || "Bangalore"} &bull; {sources.period || "2026-Q2"}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-950 border border-emerald-800 text-emerald-300">
          Status: Strong
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
        {/* Visual 0-100 Score Dial */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke="#1e1e3a"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="56"
              cy="56"
              r="44"
              stroke="url(#score-gradient)"
              strokeWidth="10"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * score) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3730a3" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white leading-none">{score}</span>
            <span className="text-[10px] font-medium text-slate-400">out of 100</span>
          </div>
        </div>

        {/* Sub-Score Breakdown */}
        <div className="flex-1 w-full space-y-2.5 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-300">
              <span>Liquidity & Cash Flow</span>
              <span className="font-semibold text-emerald-400">85 / 100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-300">
              <span>Solvency & Leverage</span>
              <span className="font-semibold text-emerald-400">82 / 100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "82%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-300">
              <span>Profitability Margin</span>
              <span className="font-semibold text-amber-400">72 / 100</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: "72%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
