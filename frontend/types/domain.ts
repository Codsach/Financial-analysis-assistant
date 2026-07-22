import { AnalysisType, AnalysisResponse } from "./api";

export interface Branch {
  id: string;
  name: string;
  region: string;
}

export interface Period {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

export interface HistoryItem {
  id: string;
  type: AnalysisType;
  query: string;
  branch?: string;
  period?: string;
  response: AnalysisResponse;
  createdAt: string;
}

export interface AnalysisTypeInfo {
  slug: AnalysisType;
  title: string;
  description: string;
  tag: string;
  exampleQueries: string[];
}

export const ANALYSIS_TYPE_MAP: Record<AnalysisType, AnalysisTypeInfo> = {
  "financial-summary": {
    slug: "financial-summary",
    title: "Financial Summary",
    description: "Get a comprehensive overview of your organisation's overall financial health at a glance.",
    tag: "Overview",
    exampleQueries: [
      "Provide a full financial summary for Q2 2026.",
      "Summarise key performance indicators across all branches.",
      "How is our overall revenue and net margin performing this year?",
    ],
  },
  profit: {
    slug: "profit",
    title: "Profit Analysis",
    description: "Drill into revenue versus cost breakdowns to understand where profits are being generated.",
    tag: "P&L",
    exampleQueries: [
      "What contributed most to our net profit in Q2 2026?",
      "Analyse profit margins for the Bangalore branch.",
      "Which business line has the highest profit margin?",
    ],
  },
  loss: {
    slug: "loss",
    title: "Loss Analysis",
    description: "Identify loss-making segments, cost overruns, and patterns that erode your bottom line.",
    tag: "P&L",
    exampleQueries: [
      "Why is Bangalore branch making a loss in Q2?",
      "Identify the primary drivers behind cost overruns.",
      "Which branch had the highest operating loss last month?",
    ],
  },
  "branch-analysis": {
    slug: "branch-analysis",
    title: "Branch Performance",
    description: "Compare performance metrics side-by-side across all your branches and regions.",
    tag: "Operations",
    exampleQueries: [
      "Compare Bangalore and Mysore branches for Q2 2026.",
      "Which branch is generating the highest revenue per employee?",
      "Rank all branches by operating margin efficiency.",
    ],
  },
  revenue: {
    slug: "revenue",
    title: "Revenue Analysis",
    description: "Uncover revenue streams, seasonal trends, and growth drivers across products and channels.",
    tag: "Revenue",
    exampleQueries: [
      "Break down revenue growth by region over the past 4 quarters.",
      "What are our top performing revenue channels?",
      "How does Q2 revenue compare to Q1 2026?",
    ],
  },
  expense: {
    slug: "expense",
    title: "Expense Analysis",
    description: "Track spending categories, detect anomalies, and find opportunities for cost reduction.",
    tag: "Expenses",
    exampleQueries: [
      "Explain the increase in operating expenses in Q2.",
      "What are the top 3 expense categories for Bangalore branch?",
      "Are marketing expenses aligned with quarterly budget targets?",
    ],
  },
  "balance-sheet": {
    slug: "balance-sheet",
    title: "Balance Sheet Analysis",
    description: "View assets, liabilities, and equity with full breakdowns to assess solvency.",
    tag: "Accounting",
    exampleQueries: [
      "Analyse current balance sheet assets vs total liabilities.",
      "What is our working capital ratio for Q2 2026?",
      "Summarise total debt vs equity position.",
    ],
  },
  "cash-flow": {
    slug: "cash-flow",
    title: "Cash Flow Analysis",
    description: "Analyse operating, investing, and financing cash flows to understand liquidity.",
    tag: "Liquidity",
    exampleQueries: [
      "Explain operating vs investing cash flows for Q2.",
      "Is our cash balance sufficient to cover short-term liabilities?",
      "What was the free cash flow generated last quarter?",
    ],
  },
  "health-score": {
    slug: "health-score",
    title: "Financial Health Score",
    description: "A composite AI-driven wellness score combining key financial ratios and indicators.",
    tag: "AI Insight",
    exampleQueries: [
      "Calculate the overall financial health score for the company.",
      "What is Bangalore branch's financial health score?",
      "Show breakdown of health score components (liquidity, debt, profit).",
    ],
  },
  trend: {
    slug: "trend",
    title: "Trend Analysis",
    description: "Surface historical patterns, seasonality, and forward-looking forecasts from your data.",
    tag: "Forecasting",
    exampleQueries: [
      "What is the 4-quarter trend for gross profit margins?",
      "Show seasonality pattern in Q2 operating expenses.",
      "Forecast revenue trajectory for Q3 based on current trends.",
    ],
  },
  risk: {
    slug: "risk",
    title: "Risk Assessment",
    description: "Identify financial risk factors, concentration risks, and mitigation strategies.",
    tag: "Risk",
    exampleQueries: [
      "What are the top financial risk factors for Bangalore branch?",
      "Evaluate liquidity risk based on current cash reserves.",
      "Are there debt service coverage concerns for 2026?",
    ],
  },
  report: {
    slug: "report",
    title: "Executive Report",
    description: "Auto-generate polished executive-ready reports in PDF or Markdown from any analysis.",
    tag: "Reporting",
    exampleQueries: [
      "Generate an executive financial summary for the Board of Directors.",
      "Draft a Q2 performance briefing report.",
      "Summarise branch operations and financial highlights into an executive report.",
    ],
  },
  recommendations: {
    slug: "recommendations",
    title: "Recommendations",
    description: "Get AI-powered strategic suggestions tailored to your financial position and goals.",
    tag: "AI Strategy",
    exampleQueries: [
      "Give strategic recommendations to reduce operating loss in Bangalore.",
      "What actions should we take to optimize cash flow efficiency?",
      "Suggest 3 cost-cutting measures for underperforming branches.",
    ],
  },
};
