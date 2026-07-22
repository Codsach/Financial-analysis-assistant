"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useBranchAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runBranchAnalysis = (query: string, branches: string[], period?: string) => {
    const request: AnalysisRequest = {
      type: "branch-analysis",
      query,
      branches,
      period,
    };
    return executeAnalysis(request);
  };

  return {
    data,
    isLoading,
    error,
    runBranchAnalysis,
  };
}
