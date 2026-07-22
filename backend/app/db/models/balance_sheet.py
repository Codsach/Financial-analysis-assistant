"""
Balance Sheet ORM model.
"""

from sqlalchemy import Column, Integer, ForeignKey, Numeric
from decimal import Decimal
from app.db.base import Base


class BalanceSheet(Base):
    """
    Represents financial data from a balance sheet for a given period.
    All amounts are in the base currency.
    """
    
    __tablename__ = "balance_sheets"
    
    balance_sheet_id = Column(Integer, primary_key=True, autoincrement=True)
    period_id = Column(Integer, ForeignKey("financial_periods.period_id"), nullable=False, unique=True)
    total_assets = Column(Numeric(18, 2), nullable=False)
    total_liabilities = Column(Numeric(18, 2), nullable=False)
    total_equity = Column(Numeric(18, 2), nullable=False)
    current_assets = Column(Numeric(18, 2), nullable=False)
    current_liabilities = Column(Numeric(18, 2), nullable=False)
    
    def __repr__(self) -> str:
        return (
            f"<BalanceSheet(period_id={self.period_id}, total_assets={self.total_assets}, "
            f"total_liabilities={self.total_liabilities}, total_equity={self.total_equity}, "
            f"current_assets={self.current_assets}, current_liabilities={self.current_liabilities})>"
        )
