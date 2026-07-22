"""
Cash Flow ORM model.
"""

from sqlalchemy import Column, Integer, ForeignKey, Numeric
from decimal import Decimal
from app.db.base import Base


class CashFlow(Base):
    """
    Represents cash flow data for a given period.
    All amounts are in the base currency.
    """
    
    __tablename__ = "cash_flows"
    
    cash_flow_id = Column(Integer, primary_key=True, autoincrement=True)
    period_id = Column(Integer, ForeignKey("financial_periods.period_id"), nullable=False, unique=True)
    operating_cf = Column(Numeric(18, 2), nullable=False)  # Operating cash flow
    investing_cf = Column(Numeric(18, 2), nullable=False)  # Investing cash flow
    financing_cf = Column(Numeric(18, 2), nullable=False)  # Financing cash flow
    
    def __repr__(self) -> str:
        return (
            f"<CashFlow(period_id={self.period_id}, operating_cf={self.operating_cf}, "
            f"investing_cf={self.investing_cf}, financing_cf={self.financing_cf})>"
        )
