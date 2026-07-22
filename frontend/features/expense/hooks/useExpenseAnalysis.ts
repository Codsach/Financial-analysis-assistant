"use client";

import { useAnalysis } from "@/features/shared/hooks/useAnalysis";
import { AnalysisRequest } from "@/types/api";

export function useExpenseAnalysis() {
  const { data, isLoading, error, executeAnalysis } = useAnalysis();

  const runExpenseAnalysis = (query: string, branch?: string, period?: string) => {
    const request: AnalysisRequest = {
      type: "expense",
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
    runExpenseAnalysis,
  };
}
