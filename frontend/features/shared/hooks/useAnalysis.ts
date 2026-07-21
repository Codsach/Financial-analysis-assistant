"use client";

import { useState, useCallback } from "react";
import { AnalysisRequest, AnalysisResponse } from "@/types/api";
import { HistoryItem } from "@/types/domain";
import { runAnalysis } from "@/lib/client";

const HISTORY_STORAGE_KEY = "financial_assistant_history";

export function useAnalysis() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveToHistory = useCallback((request: AnalysisRequest, response: AnalysisResponse) => {
    try {
      const existingRaw = sessionStorage.getItem(HISTORY_STORAGE_KEY);
      const history: HistoryItem[] = existingRaw ? JSON.parse(existingRaw) : [];

      const newItem: HistoryItem = {
        id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        type: request.type,
        query: request.query,
        response,
        createdAt: new Date().toISOString(),
      };

      const updated = [newItem, ...history].slice(0, 50); // Keep last 50 items
      sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore session storage errors
    }
  }, []);

  const executeAnalysis = useCallback(
    async (request: AnalysisRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await runAnalysis(request);
        setData(result);
        saveToHistory(request, result);
        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred during analysis.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [saveToHistory]
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
