"""
Branch ORM model.
"""

from sqlalchemy import Column, Integer, String, UniqueConstraint
from app.db.base import Base


class Branch(Base):
    """
    Represents a financial branch/location.
    """
    
    __tablename__ = "branches"
    
    branch_id = Column(Integer, primary_key=True, autoincrement=True)
    branch_name = Column(String(255), nullable=False, unique=True)
    region = Column(String(255), nullable=False)
    
    def __repr__(self) -> str:
        return f"<Branch(branch_id={self.branch_id}, branch_name={self.branch_name}, region={self.region})>"
