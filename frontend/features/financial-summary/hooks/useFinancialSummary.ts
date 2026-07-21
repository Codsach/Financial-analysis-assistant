"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useFinancialSummary() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runFinancialSummary = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "financial-summary",
      query,
      branch,
      period,
    };
    return executeAnalysis(request);
  };

  return {
    data,
    isLoading,
    error,
    runFinancialSummary,
  };
}
