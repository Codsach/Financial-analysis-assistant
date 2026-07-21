export type AnalysisType =
  | "financial-summary"
  | "profit"
  | "loss"
  | "branch-analysis"
  | "revenue"
  | "expense"
  | "balance-sheet"
  | "cash-flow"
  | "health-score"
  | "trend"
  | "risk"
  | "report"
  | "recommendations";

export interface AnalysisRequest {
  type: AnalysisType;
  query: string;
  branch?: string;
  branches?: string[];
  period?: string;
}

export interface AnalysisResponseSources {
  branch?: string;
  branches?: string[];
  period?: string;
  record_ids?: number[];
  [key: string]: unknown;
}

export interface AnalysisResponse {
  analysis: string;
  sources: AnalysisResponseSources;
  timestamp: string;
}
