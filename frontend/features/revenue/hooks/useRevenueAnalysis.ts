"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useRevenueAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runRevenueAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "revenue",
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
    runRevenueAnalysis,
  };
}
