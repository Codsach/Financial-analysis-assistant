import { AnalysisRequest, AnalysisResponse } from "@/types/api";

export interface FinancialSummaryData {
  revenue: string;
  expenses: string;
  netProfit: string;
  margin: string;
  workingCapitalRatio: string;
  narrative: string;
}

export interface FinancialSummaryProps {
  response: AnalysisResponse;
}
