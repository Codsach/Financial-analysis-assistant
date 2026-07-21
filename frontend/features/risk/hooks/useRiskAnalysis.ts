"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useRiskAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runRiskAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "risk",
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
    runRiskAnalysis,
  };
}
