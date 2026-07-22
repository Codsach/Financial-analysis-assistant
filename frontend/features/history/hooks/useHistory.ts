"use client";

import { useCallback, useSyncExternalStore } from "react";
import { AnalysisRequest, AnalysisResponse } from "@/types/api";
import { HistoryItem } from "@/types/domain";

export const HISTORY_STORAGE_KEY = "financial_assistant_history";
const MAX_HISTORY_ITEMS = 50;
const listeners = new Set<() => void>();
const EMPTY_HISTORY: HistoryItem[] = [];
let cachedRawHistory: string | null | undefined;
let cachedHistory: HistoryItem[] = EMPTY_HISTORY;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function readHistory(): HistoryItem[] {
  try {
    const rawHistory = window.sessionStorage.getItem(HISTORY_STORAGE_KEY);
    if (rawHistory === cachedRawHistory) return cachedHistory;

    const parsedHistory: unknown = rawHistory ? JSON.parse(rawHistory) : [];
    cachedRawHistory = rawHistory;
    cachedHistory = Array.isArray(parsedHistory) ? parsedHistory : EMPTY_HISTORY;
    return cachedHistory;
  } catch {
    return cachedHistory;
  }
}

function persistHistory(history: HistoryItem[]) {
  try {
    const rawHistory = JSON.stringify(history);
    window.sessionStorage.setItem(HISTORY_STORAGE_KEY, rawHistory);
    cachedRawHistory = rawHistory;
    cachedHistory = history;
  } catch {
    // Session storage may be unavailable (for example, private browsing modes).
  }
}

export function useHistory() {
  const history = useSyncExternalStore(subscribe, readHistory, () => EMPTY_HISTORY);
  const isHydrated = useSyncExternalStore(subscribe, () => true, () => false);

  const addHistoryItem = useCallback((request: AnalysisRequest, response: AnalysisResponse) => {
    const newItem: HistoryItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: request.type,
      query: request.query,
      branch: request.branch,
      period: request.period,
      response,
      createdAt: new Date().toISOString(),
    };

    // Read storage here as well as during hydration. This prevents a replay that
    // starts immediately after navigation from overwriting the earlier session.
    const updatedHistory = [newItem, ...readHistory()].slice(0, MAX_HISTORY_ITEMS);
    persistHistory(updatedHistory);
    emitChange();
  }, []);

  const clearHistory = useCallback(() => {
    try {
      window.sessionStorage.removeItem(HISTORY_STORAGE_KEY);
      cachedRawHistory = null;
      cachedHistory = EMPTY_HISTORY;
    } catch {
      // Ignore storage errors so the in-memory history can still be cleared.
    }
    emitChange();
  }, []);

  return { history, isHydrated, addHistoryItem, clearHistory };
}
