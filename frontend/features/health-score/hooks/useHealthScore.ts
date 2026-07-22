"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useHealthScore() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runHealthScore = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "health-score",
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
    runHealthScore,
  };
}
