"""
Financial Periods ORM model.
"""

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from datetime import date
from app.db.base import Base


class FinancialPeriod(Base):
    """
    Represents a financial period (quarter, month, etc.) for a branch.
    """
    
    __tablename__ = "financial_periods"
    
    period_id = Column(Integer, primary_key=True, autoincrement=True)
    branch_id = Column(Integer, ForeignKey("branches.branch_id"), nullable=False)
    period_type = Column(String(50), nullable=False)  # e.g., "Q1", "Q2", "monthly"
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    
    def __repr__(self) -> str:
        return (
            f"<FinancialPeriod(period_id={self.period_id}, branch_id={self.branch_id}, "
            f"period_type={self.period_type}, start_date={self.start_date}, end_date={self.end_date})>"
        )
