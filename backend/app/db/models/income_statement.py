"""
Income Statement ORM model.
"""

from sqlalchemy import Column, Integer, ForeignKey, Numeric
from decimal import Decimal
from app.db.base import Base


class IncomeStatement(Base):
    """
    Represents financial data from an income statement for a given period.
    All amounts are in the base currency.
    """
    
    __tablename__ = "income_statements"
    
    income_statement_id = Column(Integer, primary_key=True, autoincrement=True)
    period_id = Column(Integer, ForeignKey("financial_periods.period_id"), nullable=False, unique=True)
    revenue = Column(Numeric(18, 2), nullable=False)
    cogs = Column(Numeric(18, 2), nullable=False)  # Cost of Goods Sold
    operating_expenses = Column(Numeric(18, 2), nullable=False)
    net_profit = Column(Numeric(18, 2), nullable=False)
    
    def __repr__(self) -> str:
        return (
            f"<IncomeStatement(period_id={self.period_id}, revenue={self.revenue}, "
            f"cogs={self.cogs}, operating_expenses={self.operating_expenses}, "
            f"net_profit={self.net_profit})>"
        )
