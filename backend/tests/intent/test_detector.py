import pytest

from app.intent.detector import detect_intent

# Sample queries covering various intents and entity extraction
TEST_CASES = [
    ("What is the profit for Bangalore in Q2 2026?", "profit_analysis", {"branch": "Bangalore", "period": "Q2 2026"}),
    ("Show me the loss figures for Mysore last quarter.", "loss_analysis", {"branch": "Mysore", "period": "last quarter"}),
    ("Give the balance sheet assets for Delhi 2025.", "balance_sheet", {"branch": "Delhi", "period": "2025"}),
    ("I need the cash flow report for Mumbai.", "cash_flow", {"branch": "Mumbai"}),
    ("Revenue trends for Chennai in January 2026.", "revenue_analysis", {"branch": "Chennai", "period": "January 2026"}),
    ("What are the expenses in Hyderabad this year?", "expense_analysis", {"branch": "Hyderabad", "period": "this year"}),
    ("Show me the ratio margin for Bangalore.", "ratio_analysis", {"branch": "Bangalore"}),
    ("Forecast the sales for Mysore for Q3 2026.", "forecast_analysis", {"branch": "Mysore", "period": "Q3 2026"}),
    ("Trend analysis on expenses for Delhi.", "trend_analysis", {"branch": "Delhi"}),
    ("Variance between Q1 2026 and Q2 2026 for Mumbai.", "variance_analysis", {"branch": "Mumbai", "period": "Q1 2026"}),
    ("Compliance report for Chennai.", "compliance_analysis", {"branch": "Chennai"}),
    ("Tax summary for Hyderabad 2024.", "tax_analysis", {"branch": "Hyderabad", "period": "2024"}),
    ("Audit findings for Bangalore.", "audit_analysis", {"branch": "Bangalore"}),
]

@pytest.mark.parametrize("query,expected_intent,expected_entities", TEST_CASES)
def test_detect_intent(query, expected_intent, expected_entities):
    intent, entities = detect_intent(query)
    assert intent == expected_intent
    for key, value in expected_entities.items():
        assert entities.get(key) == value
