# backend/app/api/v1/endpoints/health_score.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone

from app.db.session import get_async_session
from app.auth.router import get_current_user
from app.features.schemas import AnalysisRequest, AnalysisResponse, AnalysisResponseSources
from app.features.repository import get_financial_data
from app.features.services import format_health_score
from app.intent.detector import detect_intent

router = APIRouter()

@router.post("/health-score", response_model=AnalysisResponse)
async def health_score_analysis(
    request: AnalysisRequest,
    db: AsyncSession = Depends(get_async_session),
    current_user: str = Depends(get_current_user)
):
    branch = request.branch
    period = request.period
    
    if not branch or not period:
        intent, entities = detect_intent(request.query)
        if not branch:
            branch = entities.get("branch")
        if not period:
            period = entities.get("period")
            
    data = await get_financial_data(db, branch, period)
    if not data:
        raise HTTPException(
            status_code=404,
            detail=f"Financial data not found for branch '{branch or 'Bangalore'}' and period '{period or '2026-Q2'}'."
        )
        
    analysis_text = format_health_score(data)
    
    return AnalysisResponse(
        analysis=analysis_text,
        sources=AnalysisResponseSources(
            branch=data["branch"].branch_name,
            period=data["period"].period_type + " " + str(data["period"].start_date.year),
            record_ids=data["record_ids"]
        ),
        timestamp=datetime.now(timezone.utc).isoformat()
    )
