"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useExecutiveReport() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runExecutiveReport = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "report",
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
    runExecutiveReport,
  };
}
