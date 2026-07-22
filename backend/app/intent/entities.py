import re
from datetime import datetime

# Example branch names – could be expanded later.
_BRANCHES = [
    "Bangalore",
    "Mysore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Hyderabad",
]

# Simple patterns for periods (quarter/year)
_QUARTER_PATTERN = re.compile(r"\b(Q[1-4])\s*(\d{4})\b", re.IGNORECASE)
_YEAR_PATTERN = re.compile(r"\b(20\d{2})\b")
_MONTH_YEAR_PATTERN = re.compile(r"\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(20\d{2})\b", re.IGNORECASE)

def _extract_branch(query: str) -> str | None:
    """Return the first branch name found in the query, or None."""
    lowered = query.lower()
    for branch in _BRANCHES:
        if branch.lower() in lowered:
            return branch
    return None

def _extract_period(query: str) -> str | None:
    """Extract a period expression like "Q2 2026" or "January 2026".
    Returns a normalized string such as "Q2 2026" or "2026".
    """
    # Check for quarter patterns
    m = _QUARTER_PATTERN.search(query)
    if m:
        return f"{m.group(1).upper()} {m.group(2)}"
    # Check for month-year patterns
    m = _MONTH_YEAR_PATTERN.search(query)
    if m:
        month = m.group(1).capitalize()
        year = m.group(2)
        return f"{month} {year}"
    # Check for year only
    m = _YEAR_PATTERN.search(query)
    if m:
        return m.group(1)
    # Fallback for relative terms (not exhaustive)
    lowered = query.lower()
    if "last quarter" in lowered:
        return "last quarter"
    if "this year" in lowered:
        return "this year"
    return None

def extract_entities(query: str) -> dict:
    """Extract known entities from the query.

    Currently extracts:
        - ``branch``: branch name if present.
        - ``period``: a date/quarter string if detectable.
    """
    entities = {}
    branch = _extract_branch(query)
    if branch:
        entities["branch"] = branch
    period = _extract_period(query)
    if period:
        entities["period"] = period
    return entities
