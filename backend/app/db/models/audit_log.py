"""
Audit Log ORM model.
"""

from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from app.db.base import Base


class AuditLog(Base):
    """
    Tracks all queries made to the system for audit and security purposes.
    Records which data was accessed, when, and by whom.
    """
    
    __tablename__ = "audit_logs"
    
    log_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)  # FK to users table (created later)
    query_text = Column(String(2000), nullable=False)  # The user's natural language query
    retrieved_record_ids = Column(JSON, nullable=True)  # List of record IDs that were accessed
    response_summary = Column(String(1000), nullable=True)  # Summary of the response generated
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self) -> str:
        return (
            f"<AuditLog(log_id={self.log_id}, user_id={self.user_id}, "
            f"query_text={self.query_text[:50]}..., timestamp={self.timestamp})>"
        )
