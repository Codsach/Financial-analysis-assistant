"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QueryBox from "@/components/shared/QueryBox";
import ResponsePanel from "@/components/shared/ResponsePanel";
import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisType } from "@/types/api";
import { ANALYSIS_TYPE_MAP } from "@/types/domain";
import { MessageSquare, Sparkles } from "lucide-react";

// Type guard helper to validate query param string
function isValidAnalysisType(type: string | null): type is AnalysisType {
  return type !== null && type in ANALYSIS_TYPE_MAP;
}

function QueryConsoleContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const initialType: AnalysisType = isValidAnalysisType(typeParam) ? typeParam : "financial-summary";

  const [selectedType, setSelectedType] = useState<AnalysisType>(initialType);

  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const handleSubmitQuery = (params: {
    query: string;
    type: AnalysisType;
    branch?: string;
    period?: string;
  }) => {
    executeAnalysis({
      type: params.type,
      query: params.query,
      branch: params.branch,
      period: params.period,
    }).catch(() => {
      // Error state managed by useAnalysis hook state
    });
  };

  const currentTypeInfo = ANALYSIS_TYPE_MAP[selectedType];

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1300px",
        margin: "0 auto",
        minHeight: "100%",
      }}
      className="flex flex-col gap-6"
    >
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
                boxShadow: "0 0 16px rgba(124, 58, 237, 0.4)",
              }}
            >
              <MessageSquare size={18} color="#fff" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Query Console</h1>
          </div>
          <p className="text-xs text-slate-400">
            Ask any financial question in plain English. The AI engine retrieves relational DB context to construct clear narrative analysis.
          </p>
        </div>

        {/* Selected Engine Badge */}
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "#1e1e3a",
            border: "1px solid #3d3d6e",
            color: "#c4b5fd",
          }}
        >
          <Sparkles size={13} style={{ color: "#7c3aed" }} />
          <span>Active Engine: <strong>{currentTypeInfo.title}</strong></span>
        </div>
      </div>

      {/* ── Main 2-column/stacked Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Query Box */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <QueryBox
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            onSubmit={handleSubmitQuery}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column: Response Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <ResponsePanel data={data} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}

function QueryConsoleWithKey() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  return <QueryConsoleContent key={typeParam ?? "default"} />;
}

export default function QueryConsolePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 text-slate-400 text-sm">
          Loading Query Console...
        </div>
      }
    >
      <QueryConsoleWithKey />
    </Suspense>
  );
}


