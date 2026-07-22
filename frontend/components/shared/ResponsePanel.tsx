"use client";

import React, { useState } from "react";
import { AnalysisResponse, AnalysisType } from "@/types/api";
import { Copy, Check, Database, Building2, Calendar, Clock, Sparkles, AlertCircle, FileText } from "lucide-react";

import FinancialSummaryCard from "@/features/financial-summary/components/FinancialSummaryCard";
import ProfitCard from "@/features/profit/components/ProfitCard";
import LossCard from "@/features/loss/components/LossCard";
import BranchAnalysisCard from "@/features/branch-analysis/components/BranchAnalysisCard";
import RevenueCard from "@/features/revenue/components/RevenueCard";
import ExpenseCard from "@/features/expense/components/ExpenseCard";
import BalanceSheetCard from "@/features/balance-sheet/components/BalanceSheetCard";
import CashFlowCard from "@/features/cash-flow/components/CashFlowCard";
import HealthScoreCard from "@/features/health-score/components/HealthScoreCard";
import TrendCard from "@/features/trend/components/TrendCard";
import RiskCard from "@/features/risk/components/RiskCard";
import ExecutiveReportCard from "@/features/report/components/ExecutiveReportCard";
import RecommendationsCard from "@/features/recommendations/components/RecommendationsCard";

interface ResponsePanelProps {
  data: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  analysisType?: AnalysisType;
}

export default function ResponsePanel({ data, isLoading, error, analysisType }: ResponsePanelProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!data?.analysis) return;
    try {
      await navigator.clipboard.writeText(data.analysis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = data.analysis;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderFeatureCard = (response: AnalysisResponse, type?: AnalysisType) => {
    let activeType = type;
    if (!activeType) {
      const text = response.analysis;
      if (text.includes("Health Assessment") || text.includes("Health Score")) activeType = "health-score";
      else if (text.includes("Risk Assessment") || text.includes("Risk Indicators")) activeType = "risk";
      else if (text.includes("Branch Performance")) activeType = "branch-analysis";
      else if (text.includes("Loss Driver")) activeType = "loss";
      else if (text.includes("Profit Analysis")) activeType = "profit";
      else if (text.includes("Strategic Recommendations")) activeType = "recommendations";
      else if (text.includes("EXECUTIVE FINANCIAL REPORT")) activeType = "report";
      else if (text.includes("Revenue Trend")) activeType = "revenue";
      else if (text.includes("Operating Expense Composition") || text.includes("Expense Analysis")) activeType = "expense";
      else if (text.includes("Balance Sheet")) activeType = "balance-sheet";
      else if (text.includes("Cash Flow")) activeType = "cash-flow";
      else if (text.includes("Trend Analysis") || text.includes("Trajectory")) activeType = "trend";
      else activeType = "financial-summary";
    }

    switch (activeType) {
      case "financial-summary": return <FinancialSummaryCard response={response} />;
      case "profit": return <ProfitCard response={response} />;
      case "loss": return <LossCard response={response} />;
      case "branch-analysis": return <BranchAnalysisCard response={response} />;
      case "revenue": return <RevenueCard response={response} />;
      case "expense": return <ExpenseCard response={response} />;
      case "balance-sheet": return <BalanceSheetCard response={response} />;
      case "cash-flow": return <CashFlowCard response={response} />;
      case "health-score": return <HealthScoreCard response={response} />;
      case "trend": return <TrendCard response={response} />;
      case "risk": return <RiskCard response={response} />;
      case "report": return <ExecutiveReportCard response={response} />;
      case "recommendations": return <RecommendationsCard response={response} />;
      default: return <FinancialSummaryCard response={response} />;
    }
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-xl font-extrabold text-white mt-4 mb-2">
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-lg font-bold text-indigo-300 mt-4 mb-2">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-base font-bold text-violet-300 mt-3 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-300 my-1 leading-relaxed">
            {formatBold(line.substring(2))}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-sm text-slate-300 my-1.5 leading-relaxed">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div
        className="rounded-2xl flex flex-col gap-5 p-6 animate-pulse"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid #2d2d4e",
          minHeight: "360px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-900/60" />
            <div className="w-40 h-5 rounded-md bg-slate-800" />
          </div>
          <div className="w-24 h-4 rounded-md bg-slate-800" />
        </div>

        <div className="flex flex-col gap-3 py-4 border-y border-slate-800/60">
          <div className="w-3/4 h-5 rounded bg-slate-800" />
          <div className="w-full h-4 rounded bg-slate-800/80" />
          <div className="w-11/12 h-4 rounded bg-slate-800/80" />
          <div className="w-4/5 h-4 rounded bg-slate-800/80" />
          <div className="w-full h-4 rounded bg-slate-800/80" />
          <div className="w-2/3 h-4 rounded bg-slate-800/80" />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="w-32 h-6 rounded-full bg-slate-800/60" />
          <div className="w-32 h-6 rounded-full bg-slate-800/60" />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div
        className="rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid #ef4444",
          minHeight: "260px",
        }}
      >
        <div className="w-12 h-12 rounded-full bg-red-950/60 flex items-center justify-center text-red-400">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Analysis Request Failed</h3>
        <p className="text-xs text-red-300 max-w-md">{error}</p>
      </div>
    );
  }

  // 3. Empty State (No query executed yet)
  if (!data) {
    return (
      <div
        className="rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px dashed #2d2d4e",
          minHeight: "360px",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
          style={{
            background: "linear-gradient(135deg, #1e1e38 0%, #2d2d4e 100%)",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.15)",
          }}
        >
          <FileText size={26} style={{ color: "#818cf8" }} />
        </div>
        <h3 className="text-base font-semibold text-slate-200">Ready for Financial Analysis</h3>
        <p className="text-xs text-slate-400 max-w-md leading-relaxed">
          Select an engine above, type your financial question, and click Submit to generate AI narrative insights from database records.
        </p>
      </div>
    );
  }

  // 4. Data Response View
  const sources = data.sources || {};
  const formattedTime = new Date(data.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="rounded-2xl flex flex-col justify-between"
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid #3d3d6e",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-6 py-4 rounded-t-2xl"
        style={{
          backgroundColor: "#131326",
          borderBottom: "1px solid #2d2d4e",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-white">AI Financial Analysis</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={13} />
            <span>{formattedTime}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: copied ? "rgba(16, 185, 129, 0.2)" : "#1e1e3a",
              border: `1px solid ${copied ? "#10b981" : "#3d3d6e"}`,
              color: copied ? "#34d399" : "#e2e8f0",
            }}
          >
            {copied ? (
              <>
                <Check size={13} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response content */}
      <div className="p-6 overflow-y-auto max-h-[550px]">
        {/* Render Feature-Specific Component Visualizer */}
        {renderFeatureCard(data, analysisType)}

        {/* Render AI Narrative Text */}
        {renderFormattedText(data.analysis)}
      </div>

      {/* Sources footer */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 rounded-b-2xl text-xs"
        style={{
          backgroundColor: "#131326",
          borderTop: "1px solid #2d2d4e",
        }}
      >
        <div className="flex items-center gap-1.5 font-medium text-slate-400">
          <Database size={13} className="text-indigo-400" />
          <span>Data Sources:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {sources.branch && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
              <Building2 size={11} className="text-violet-400" />
              <span>{sources.branch}</span>
            </span>
          )}

          {sources.period && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
              <Calendar size={11} className="text-emerald-400" />
              <span>{sources.period}</span>
            </span>
          )}

          {sources.record_ids && sources.record_ids.length > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 font-mono text-[11px]">
              Record IDs: #{sources.record_ids.join(", #")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
