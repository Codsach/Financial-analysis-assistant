# backend/app/api/v1/router.py

from fastapi import APIRouter
from app.api.v1.endpoints.financial_summary import router as financial_summary_router
from app.api.v1.endpoints.profit import router as profit_router
from app.api.v1.endpoints.loss import router as loss_router
from app.api.v1.endpoints.branch_analysis import router as branch_analysis_router
from app.api.v1.endpoints.revenue import router as revenue_router
from app.api.v1.endpoints.expense import router as expense_router
from app.api.v1.endpoints.balance_sheet import router as balance_sheet_router
from app.api.v1.endpoints.cash_flow import router as cash_flow_router
from app.api.v1.endpoints.health_score import router as health_score_router
from app.api.v1.endpoints.trend import router as trend_router
from app.api.v1.endpoints.risk import router as risk_router
from app.api.v1.endpoints.report import router as report_router
from app.api.v1.endpoints.recommendations import router as recommendations_router

router = APIRouter()

router.include_router(financial_summary_router, tags=["financial-summary"])
router.include_router(profit_router, tags=["profit"])
router.include_router(loss_router, tags=["loss"])
router.include_router(branch_analysis_router, tags=["branch-analysis"])
router.include_router(revenue_router, tags=["revenue"])
router.include_router(expense_router, tags=["expense"])
router.include_router(balance_sheet_router, tags=["balance-sheet"])
router.include_router(cash_flow_router, tags=["cash-flow"])
router.include_router(health_score_router, tags=["health-score"])
router.include_router(trend_router, tags=["trend"])
router.include_router(risk_router, tags=["risk"])
router.include_router(report_router, tags=["report"])
router.include_router(recommendations_router, tags=["recommendations"])
