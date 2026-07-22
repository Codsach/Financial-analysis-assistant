import re
from .entities import extract_entities

# Mapping of keywords to intents
_INTENT_KEYWORDS = {
    "profit_analysis": ["profit", "earning", "earnings"],
    "loss_analysis": ["loss", "losing", "deficit"],
    "balance_sheet": ["balance sheet", "assets", "liabilities"],
    "cash_flow": ["cash flow", "cashflow"],
    "revenue_analysis": ["revenue", "sales"],
    "expense_analysis": ["expense", "cost"],
    "ratio_analysis": ["ratio", "margin", "return on"],
    "forecast_analysis": ["forecast", "projection", "predict"],
    "trend_analysis": ["trend", "trend of"],
    "variance_analysis": ["variance", "difference"],
    "compliance_analysis": ["compliance", "regulation"],
    "tax_analysis": ["tax", "taxes"],
    "audit_analysis": ["audit", "audit report"]
}

def _detect_intent_keyword(query: str) -> str:
    """Return the first matching intent based on keyword presence.
    The check is case‑insensitive and looks for whole‑word matches.
    """
    lowered = query.lower()
    for intent, keywords in _INTENT_KEYWORDS.items():
        for kw in keywords:
            if re.search(r"\b" + re.escape(kw) + r"\b", lowered):
                return intent
    return "unknown"

def detect_intent(query: str) -> tuple[str, dict]:
    """Detect intent and extract entities from a natural language query.

    Args:
        query: User supplied question.

    Returns:
        A tuple of (intent_name, entities_dict). ``entities_dict`` contains
        optional keys ``branch`` and ``period`` when they can be extracted.
    """
    intent = _detect_intent_keyword(query)
    entities = extract_entities(query)
    return intent, entities
