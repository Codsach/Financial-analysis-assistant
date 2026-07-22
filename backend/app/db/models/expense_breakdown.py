"""
Expense Breakdown ORM model.
"""

from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from decimal import Decimal
from app.db.base import Base


class ExpenseBreakdown(Base):
    """
    Represents a breakdown of expenses by category for a given period.
    Allows tracking different expense categories separately.
    """
    
    __tablename__ = "expense_breakdowns"
    
    expense_breakdown_id = Column(Integer, primary_key=True, autoincrement=True)
    period_id = Column(Integer, ForeignKey("financial_periods.period_id"), nullable=False)
    category = Column(String(255), nullable=False)  # e.g., "Salaries", "Rent", "Utilities"
    amount = Column(Numeric(18, 2), nullable=False)
    
    def __repr__(self) -> str:
        return (
            f"<ExpenseBreakdown(period_id={self.period_id}, category={self.category}, "
            f"amount={self.amount})>"
        )
