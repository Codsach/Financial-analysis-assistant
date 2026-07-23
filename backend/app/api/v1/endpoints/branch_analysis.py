# backend/app/api/v1/endpoints/branch_analysis.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone

from app.db.session import get_async_session
from app.auth.router import get_current_user
from app.features.schemas import AnalysisRequest, AnalysisResponse, AnalysisResponseSources
from app.features.repository import get_financial_data, get_all_branches_data_for_period
from app.features.services import format_branch_analysis
from app.intent.detector import detect_intent

router = APIRouter()

@router.post("/branch-analysis", response_model=AnalysisResponse)
async def branch_analysis(
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
        
    comparisons = await get_all_branches_data_for_period(
        db, data["period"].period_type, data["period"].start_date.year
    )
    
    # Collect record IDs from all compared branches too
    all_record_ids = list(data["record_ids"])
    for item in comparisons:
        if item["period_id"] not in all_record_ids:
            all_record_ids.append(item["period_id"])
        if item["branch_id"] not in all_record_ids:
            all_record_ids.append(item["branch_id"])
            
    analysis_text = format_branch_analysis(data, comparisons)
    
    return AnalysisResponse(
        analysis=analysis_text,
        sources=AnalysisResponseSources(
            branch=data["branch"].branch_name,
            period=data["period"].period_type + " " + str(data["period"].start_date.year),
            record_ids=all_record_ids
        ),
        timestamp=datetime.now(timezone.utc).isoformat()
    )
