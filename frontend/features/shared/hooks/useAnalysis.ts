"use client";

import { useState, useCallback } from "react";
import { AnalysisRequest, AnalysisResponse } from "@/types/api";
import { runAnalysis } from "@/lib/client";
import { useHistory } from "@/features/history/hooks/useHistory";

export function useAnalysis() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addHistoryItem } = useHistory();

  const executeAnalysis = useCallback(
    async (request: AnalysisRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await runAnalysis(request);
        setData(result);
        addHistoryItem(request, result);
        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred during analysis.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addHistoryItem]
  );

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    executeAnalysis,
    clearData,
  };
}
