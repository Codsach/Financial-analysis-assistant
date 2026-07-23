# backend/app/features/schemas.py

from pydantic import BaseModel
from typing import Optional, List


class AnalysisRequest(BaseModel):
    type: str
    query: str
    branch: Optional[str] = None
    period: Optional[str] = None


class AnalysisResponseSources(BaseModel):
    branch: Optional[str] = None
    period: Optional[str] = None
    record_ids: Optional[List[int]] = None


class AnalysisResponse(BaseModel):
    analysis: str
    sources: AnalysisResponseSources
    timestamp: str
