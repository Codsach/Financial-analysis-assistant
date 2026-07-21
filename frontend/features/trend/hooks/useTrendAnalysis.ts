"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useTrendAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runTrendAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "trend",
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
    runTrendAnalysis,
  };
}
