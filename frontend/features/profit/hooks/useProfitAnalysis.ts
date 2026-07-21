"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useProfitAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runProfitAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "profit",
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
    runProfitAnalysis,
  };
}
