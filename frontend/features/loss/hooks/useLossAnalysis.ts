"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useLossAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runLossAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "loss",
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
    runLossAnalysis,
  };
}
