"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useRecommendations() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runRecommendations = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "recommendations",
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
    runRecommendations,
  };
}
