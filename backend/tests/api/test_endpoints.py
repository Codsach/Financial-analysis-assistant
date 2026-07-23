# backend/tests/api/test_endpoints.py
"""
Integration tests for the Financial Analysis Assistant API endpoints.
These tests mock the database layer so they run without a live PostgreSQL server.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

import pytest
from datetime import date
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


# ---------------------------------------------------------------------------
# Shared mock objects
# ---------------------------------------------------------------------------

def make_mock_branch():
    b = MagicMock()
    b.branch_id = 1
    b.branch_name = "Bangalore"
    b.region = "South India"
    return b


def make_mock_period():
    p = MagicMock()
    p.period_id = 2
    p.branch_id = 1
    p.period_type = "Q2"
    p.start_date = date(2026, 4, 1)
    return p


def make_mock_income():
    i = MagicMock()
    i.income_statement_id = 3
    i.period_id = 2
    i.revenue = 5_000_000
    i.cogs = 2_250_000
    i.operating_expenses = 1_250_000
    i.net_profit = 1_500_000
    return i


def make_mock_balance():
    b = MagicMock()
    b.balance_sheet_id = 4
    b.period_id = 2
    b.total_assets = 17_500_000
    b.total_liabilities = 6_000_000
    b.total_equity = 11_500_000
    b.current_assets = 7_000_000
    b.current_liabilities = 5_000_000
    return b


def make_mock_cashflow():
    c = MagicMock()
    c.cash_flow_id = 5
    c.period_id = 2
    c.operating_cf = 1_800_000
    c.investing_cf = -450_000
    c.financing_cf = 0
    return c


def make_mock_expense():
    e = MagicMock()
    e.expense_breakdown_id = 6
    e.period_id = 2
    e.category = "Salaries"
    e.amount = 700_000
    return e


def make_financial_data():
    return {
        "branch": make_mock_branch(),
        "period": make_mock_period(),
        "income_statement": make_mock_income(),
        "balance_sheet": make_mock_balance(),
        "cash_flow": make_mock_cashflow(),
        "expenses": [make_mock_expense()],
        "record_ids": [1, 2, 3, 4, 5, 6],
    }


def get_token():
    resp = client.post("/auth/login", data={"username": "admin", "password": "admin"})
    return resp.json()["access_token"]


# ---------------------------------------------------------------------------
# Health & Auth
# ---------------------------------------------------------------------------

def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_login_success():
    resp = client.post("/auth/login", data={"username": "admin", "password": "admin"})
    assert resp.status_code == 200
    assert "access_token" in resp.json()
    assert resp.json()["token_type"] == "bearer"


def test_login_invalid():
    resp = client.post("/auth/login", data={"username": "admin", "password": "wrong"})
    assert resp.status_code == 401
    assert resp.json()["detail"] == "Invalid credentials"


def test_auth_me_unauthorized():
    resp = client.get("/auth/me")
    assert resp.status_code == 401


def test_auth_me_ok():
    token = get_token()
    resp = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["username"] == "admin"


def test_endpoint_without_token():
    """All /api/v1 endpoints must reject requests without a Bearer token."""
    resp = client.post("/api/v1/profit", json={"type": "profit", "query": "profit"})
    assert resp.status_code == 401


# ---------------------------------------------------------------------------
# Feature endpoint tests (one per endpoint)
# ---------------------------------------------------------------------------

ENDPOINT_SERVICE_MAP = {
    "financial-summary": "app.api.v1.endpoints.financial_summary",
    "profit":            "app.api.v1.endpoints.profit",
    "loss":              "app.api.v1.endpoints.loss",
    "revenue":           "app.api.v1.endpoints.revenue",
    "expense":           "app.api.v1.endpoints.expense",
    "balance-sheet":     "app.api.v1.endpoints.balance_sheet",
    "cash-flow":         "app.api.v1.endpoints.cash_flow",
    "health-score":      "app.api.v1.endpoints.health_score",
    "risk":              "app.api.v1.endpoints.risk",
    "report":            "app.api.v1.endpoints.report",
    "recommendations":   "app.api.v1.endpoints.recommendations",
}


@pytest.mark.parametrize("endpoint,module", ENDPOINT_SERVICE_MAP.items())
def test_standard_endpoint(endpoint, module):
    """Each standard endpoint returns 200 with analysis, sources, timestamp."""
    token = get_token()
    with patch(f"{module}.get_financial_data", new_callable=AsyncMock) as mock_gfd:
        mock_gfd.return_value = make_financial_data()
        resp = client.post(
            f"/api/v1/{endpoint}",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "type": endpoint,
                "query": "What is the financial status for Bangalore in Q2 2026?",
                "branch": "Bangalore",
                "period": "2026-Q2",
            },
        )
    assert resp.status_code == 200, f"Endpoint /api/v1/{endpoint} returned {resp.status_code}: {resp.text}"
    body = resp.json()
    assert "analysis" in body
    assert len(body["analysis"]) > 20, "Analysis text is too short"
    assert body["sources"]["branch"] == "Bangalore"
    assert body["sources"]["period"] == "Q2 2026"
    assert isinstance(body["sources"]["record_ids"], list)
    assert "timestamp" in body


def test_endpoint_returns_404_when_not_found():
    """Endpoints return 404 when no DB records exist for the requested branch/period."""
    token = get_token()
    with patch("app.api.v1.endpoints.profit.get_financial_data", new_callable=AsyncMock) as mock_gfd:
        mock_gfd.return_value = None
        resp = client.post(
            "/api/v1/profit",
            headers={"Authorization": f"Bearer {token}"},
            json={"type": "profit", "query": "profit for Unknown in Q9", "branch": "Unknown", "period": "2026-Q9"},
        )
    assert resp.status_code == 404


def test_branch_analysis_endpoint():
    """Branch analysis endpoint compares across all branches."""
    token = get_token()
    all_branches_data = [
        {"branch_name": "Bangalore", "revenue": 5_000_000, "operating_expenses": 1_250_000,
         "net_profit": 1_500_000, "period_id": 2, "branch_id": 1},
        {"branch_name": "Mumbai", "revenue": 7_500_000, "operating_expenses": 1_875_000,
         "net_profit": 2_250_000, "period_id": 5, "branch_id": 2},
        {"branch_name": "Delhi", "revenue": 6_000_000, "operating_expenses": 1_500_000,
         "net_profit": 1_800_000, "period_id": 8, "branch_id": 3},
    ]
    with patch("app.api.v1.endpoints.branch_analysis.get_financial_data", new_callable=AsyncMock) as mock_gfd, \
         patch("app.api.v1.endpoints.branch_analysis.get_all_branches_data_for_period", new_callable=AsyncMock) as mock_all:
        mock_gfd.return_value = make_financial_data()
        mock_all.return_value = all_branches_data
        resp = client.post(
            "/api/v1/branch-analysis",
            headers={"Authorization": f"Bearer {token}"},
            json={"type": "branch-analysis", "query": "Compare branches Q2", "branch": "Bangalore", "period": "2026-Q2"},
        )
    assert resp.status_code == 200
    body = resp.json()
    assert "analysis" in body
    assert "Bangalore" in body["analysis"]
    assert "Mumbai" in body["analysis"]
    assert "Delhi" in body["analysis"]


def test_trend_endpoint():
    """Trend endpoint returns quarterly trajectory for the branch."""
    token = get_token()

    trend_rows = [
        {"period_type": "Q1", "revenue": 4_000_000, "net_profit": 1_200_000},
        {"period_type": "Q2", "revenue": 5_000_000, "net_profit": 1_500_000},
    ]
    trend_ids = [10, 3, 11, 7]

    with patch("app.api.v1.endpoints.trend.get_financial_data", new_callable=AsyncMock) as mock_gfd, \
         patch("app.api.v1.endpoints.trend.get_trend_data_for_branch", new_callable=AsyncMock) as mock_trend:
        mock_gfd.return_value = make_financial_data()
        mock_trend.return_value = (trend_rows, trend_ids)
        resp = client.post(
            "/api/v1/trend",
            headers={"Authorization": f"Bearer {token}"},
            json={"type": "trend", "query": "trend for Bangalore", "branch": "Bangalore", "period": "2026-Q2"},
        )
    assert resp.status_code == 200
    body = resp.json()
    assert "analysis" in body
    assert "Q1" in body["analysis"] or "Q2" in body["analysis"]

