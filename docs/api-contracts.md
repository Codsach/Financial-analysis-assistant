# API Contracts

This document defines the shared request and response shapes for the Financial Analysis Assistant.

## Conventions
- All endpoints are prefixed with `/api/v1`.
- Authentication is expected via `Authorization: Bearer <token>`.
- The frontend sends a request object with the relevant branch and period context.
- The backend returns a structured analysis response with `analysis`, `sources`, and `timestamp`.

## 1) Financial Summary
- URL: `POST /api/v1/financial-summary`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Branch Bangalore generated a healthy operating margin in Q2 2026.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 2) Profit Analysis
- URL: `POST /api/v1/profit`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Profit improved by 12% compared to the previous quarter.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 3) Loss Analysis
- URL: `POST /api/v1/loss`
- Request:
  ```json
  {
    "branch": "Mysore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "The branch recorded a loss because operating expenses exceeded revenue.",
    "sources": {
      "branch": "Mysore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 4) Branch Analysis
- URL: `POST /api/v1/branch-analysis`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Bangalore outperformed the regional average on both revenue and margin.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 5) Revenue Analysis
- URL: `POST /api/v1/revenue`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Revenue grew steadily due to higher enterprise contracts.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 6) Expense Analysis
- URL: `POST /api/v1/expense`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Expense growth was driven mainly by payroll and logistics.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 7) Balance Sheet
- URL: `POST /api/v1/balance-sheet`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Assets remain strong and liabilities are well controlled.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 8) Cash Flow
- URL: `POST /api/v1/cash-flow`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Cash flow remains positive, supported by strong collections.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 9) Health Score
- URL: `POST /api/v1/health-score`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "The branch health score is 84 out of 100.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 10) Trend Analysis
- URL: `POST /api/v1/trend`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Revenue and profit have trended upward across the last three periods.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 11) Risk Analysis
- URL: `POST /api/v1/risk`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "The main risks are rising operating expenses and delayed collections.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 12) Executive Report
- URL: `POST /api/v1/report`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Executive summary: revenue improved, margins remained stable, and cash conversion stayed healthy.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```

## 13) Recommendations
- URL: `POST /api/v1/recommendations`
- Request:
  ```json
  {
    "branch": "Bangalore",
    "period": "2026-Q2"
  }
  ```
- Response:
  ```json
  {
    "analysis": "Recommended actions: tighten vendor controls, prioritize collections, and increase cross-sell opportunities.",
    "sources": {
      "branch": "Bangalore",
      "period": "2026-Q2"
    },
    "timestamp": "2026-07-21T12:00:00Z"
  }
  ```
