"use client";

import React, { useState } from "react";
import { AnalysisType } from "@/types/api";
import { ANALYSIS_TYPE_MAP } from "@/types/domain";
import { Send, Loader2, Sparkles, HelpCircle, ChevronDown, Building2, Calendar } from "lucide-react";

interface QueryBoxProps {
  selectedType: AnalysisType;
  onTypeChange: (type: AnalysisType) => void;
  onSubmit: (params: { query: string; type: AnalysisType; branch?: string; period?: string }) => void;
  isLoading: boolean;
  initialQuery?: string;
  initialBranch?: string;
  initialPeriod?: string;
}

const BRANCH_OPTIONS = ["All Branches", "Bangalore", "Mysore", "Chennai", "Mumbai"];
const PERIOD_OPTIONS = ["2026-Q2", "2026-Q1", "2025-Q4", "2025-Q3", "2025-Full Year"];

export default function QueryBox({
  selectedType,
  onTypeChange,
  onSubmit,
  isLoading,
  initialQuery = "",
  initialBranch = "Bangalore",
  initialPeriod = "2026-Q2",
}: QueryBoxProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [branch, setBranch] = useState<string>(initialBranch);
  const [period, setPeriod] = useState<string>(initialPeriod);
  const [showParams, setShowParams] = useState<boolean>(false);

  const typeInfo = ANALYSIS_TYPE_MAP[selectedType] || ANALYSIS_TYPE_MAP["financial-summary"];

  // Update question when example query is clicked
  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSubmit({
      query: query.trim(),
      type: selectedType,
      branch: branch === "All Branches" ? undefined : branch,
      period,
    });
  };

  return (
    <div
      className="rounded-2xl flex flex-col"
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid #2d2d4e",
        padding: "24px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Header row: Analysis Type Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: "#7c3aed" }} />
            <label htmlFor="analysis-type-select" className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
              Analysis Engine:
            </label>
          </div>

          <div className="relative inline-block min-w-[220px]">
            <select
              id="analysis-type-select"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value as AnalysisType)}
              disabled={isLoading}
              className="w-full appearance-none rounded-xl px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors"
              style={{
                backgroundColor: "#131326",
                border: "1px solid #3d3d6e",
                color: "#818cf8",
                paddingRight: "36px",
              }}
            >
              {Object.values(ANALYSIS_TYPE_MAP).map((info) => (
                <option key={info.slug} value={info.slug} style={{ backgroundColor: "#1a1a2e", color: "#e2e8f0" }}>
                  {info.title} ({info.tag})
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#818cf8" }}
            />
          </div>
        </div>

        {/* Query Input Area */}
        <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid #2d2d4e" }}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder={`Ask a question for ${typeInfo.title}... (e.g. "${typeInfo.exampleQueries[0]}")`}
            rows={4}
            className="w-full p-4 text-sm resize-none outline-none transition-colors"
            style={{
              backgroundColor: "#131326",
              color: "#e2e8f0",
              lineHeight: 1.6,
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                handleSubmit(e);
              }
            }}
          />

          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ backgroundColor: "#101020", borderTop: "1px solid #20203a" }}
          >
            <button
              type="button"
              onClick={() => setShowParams(!showParams)}
              className="flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors"
              style={{ color: showParams ? "#a78bfa" : "#6b7280" }}
            >
              <Building2 size={13} />
              <span>Filters ({branch}, {period})</span>
              <ChevronDown size={12} className={`transition-transform ${showParams ? "rotate-180" : ""}`} />
            </button>

            <span className="text-[11px]" style={{ color: "#4b5563" }}>
              Press Ctrl + Enter to send
            </span>
          </div>
        </div>

        {/* Optional Filter Controls */}
        {showParams && (
          <div
            className="flex flex-wrap items-center gap-4 p-3 rounded-xl text-xs"
            style={{ backgroundColor: "#131326", border: "1px dashed #3d3d6e" }}
          >
            <div className="flex items-center gap-2">
              <Building2 size={14} style={{ color: "#94a3b8" }} />
              <span style={{ color: "#94a3b8" }}>Branch:</span>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="rounded-lg px-2.5 py-1 text-xs outline-none"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e2e8f0" }}
              >
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: "#94a3b8" }} />
              <span style={{ color: "#94a3b8" }}>Period:</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded-lg px-2.5 py-1 text-xs outline-none"
                style={{ backgroundColor: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e2e8f0" }}
              >
                {PERIOD_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Example Queries Section */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <HelpCircle size={13} style={{ color: "#6b7280" }} />
            <span className="text-xs font-medium" style={{ color: "#6b7280" }}>
              Suggested queries for {typeInfo.title}:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {typeInfo.exampleQueries.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(example)}
                disabled={isLoading}
                className="text-left rounded-lg px-3 py-1.5 text-xs transition-all cursor-pointer"
                style={{
                  backgroundColor: "#131326",
                  border: "1px solid #2d2d4e",
                  color: "#94a3b8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#7c3aed";
                  e.currentTarget.style.color = "#c4b5fd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2d2d4e";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                &ldquo;{example}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-white transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isLoading
                ? "#4b5563"
                : "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
              boxShadow: isLoading ? "none" : "0 0 24px rgba(124, 58, 237, 0.4)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Analysing Financial Data...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Submit Query</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
