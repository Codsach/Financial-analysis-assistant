"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useBalanceSheet() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runBalanceSheet = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "balance-sheet",
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
    runBalanceSheet,
  };
}
