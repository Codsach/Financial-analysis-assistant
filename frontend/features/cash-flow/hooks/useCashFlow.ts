"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useCashFlow() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runCashFlow = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "cash-flow",
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
    runCashFlow,
  };
}
