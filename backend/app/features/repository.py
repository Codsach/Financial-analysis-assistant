# backend/app/features/repository.py

import re
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, extract

from app.db.models.branch import Branch
from app.db.models.financial_periods import FinancialPeriod
from app.db.models.income_statement import IncomeStatement
from app.db.models.balance_sheet import BalanceSheet
from app.db.models.cash_flow import CashFlow
from app.db.models.expense_breakdown import ExpenseBreakdown


def parse_period(period_str: str) -> tuple[str, int]:
    """
    Parses a period string like "2026-Q2" or "Q2 2026" or "last quarter"
    into a tuple of (quarter, year). Defaults to ("Q2", 2026).
    """
    if not period_str:
        return "Q2", 2026
        
    period_str_lower = period_str.lower()
    
    # Defaults
    quarter = "Q2"
    year = 2026
    
    # Extract quarter
    quarter_match = re.search(r"\b(q[1-4])\b", period_str_lower)
    if quarter_match:
        quarter = quarter_match.group(1).upper()
    elif "first quarter" in period_str_lower:
        quarter = "Q1"
    elif "second quarter" in period_str_lower:
        quarter = "Q2"
    elif "third quarter" in period_str_lower:
        quarter = "Q3"
    elif "fourth quarter" in period_str_lower:
        quarter = "Q4"
        
    # Extract year
    year_match = re.search(r"\b(20\d{2})\b", period_str_lower)
    if year_match:
        year = int(year_match.group(1))
        
    return quarter, year


async def get_branch_by_name(session: AsyncSession, branch_name: str) -> Optional[Branch]:
    """Finds a branch by name case-insensitively."""
    stmt = select(Branch).where(Branch.branch_name.ilike(branch_name))
    result = await session.execute(stmt)
    return result.scalars().first()


async def get_financial_period(
    session: AsyncSession, branch_id: int, period_str: str
) -> Optional[FinancialPeriod]:
    """Finds the FinancialPeriod matching branch_id and parsed period_str."""
    quarter, year = parse_period(period_str)
    
    stmt = (
        select(FinancialPeriod)
        .where(FinancialPeriod.branch_id == branch_id)
        .where(FinancialPeriod.period_type == quarter)
        .where(extract("year", FinancialPeriod.start_date) == year)
    )
    result = await session.execute(stmt)
    return result.scalars().first()


async def get_all_periods_for_branch(
    session: AsyncSession, branch_id: int, year: int = 2026
) -> List[FinancialPeriod]:
    """Finds all periods for a branch in a given year, sorted by date."""
    stmt = (
        select(FinancialPeriod)
        .where(FinancialPeriod.branch_id == branch_id)
        .where(extract("year", FinancialPeriod.start_date) == year)
        .order_by(FinancialPeriod.start_date.asc())
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_financial_data(
    session: AsyncSession, branch_name: Optional[str], period_str: Optional[str]
) -> Optional[Dict[str, Any]]:
    """
    Retrieves all financial statements and records for the specified branch and period.
    Defaults to Bangalore and Q2 2026 if none specified.
    """
    branch_name = branch_name or "Bangalore"
    period_str = period_str or "2026-Q2"
    
    # Resolve Branch
    branch = await get_branch_by_name(session, branch_name)
    if not branch:
        return None
        
    # Resolve Period
    period = await get_financial_period(session, branch.branch_id, period_str)
    if not period:
        return None
        
    # Query statements
    stmt_income = select(IncomeStatement).where(IncomeStatement.period_id == period.period_id)
    res_income = await session.execute(stmt_income)
    income_stmt = res_income.scalars().first()
    
    stmt_balance = select(BalanceSheet).where(BalanceSheet.period_id == period.period_id)
    res_balance = await session.execute(stmt_balance)
    balance_sheet = res_balance.scalars().first()
    
    stmt_cf = select(CashFlow).where(CashFlow.period_id == period.period_id)
    res_cf = await session.execute(stmt_cf)
    cash_flow = res_cf.scalars().first()
    
    stmt_expenses = select(ExpenseBreakdown).where(ExpenseBreakdown.period_id == period.period_id)
    res_expenses = await session.execute(stmt_expenses)
    expenses = list(res_expenses.scalars().all())
    
    # Track retrieved database record IDs for the audit log / response metadata
    record_ids = [branch.branch_id, period.period_id]
    if income_stmt:
        record_ids.append(income_stmt.income_statement_id)
    if balance_sheet:
        record_ids.append(balance_sheet.balance_sheet_id)
    if cash_flow:
        record_ids.append(cash_flow.cash_flow_id)
    for exp in expenses:
        record_ids.append(exp.expense_breakdown_id)
        
    return {
        "branch": branch,
        "period": period,
        "income_statement": income_stmt,
        "balance_sheet": balance_sheet,
        "cash_flow": cash_flow,
        "expenses": expenses,
        "record_ids": record_ids
    }


async def get_all_branches_data_for_period(
    session: AsyncSession, period_type: str, year: int
) -> List[Dict[str, Any]]:
    """Retrieves income statement summary data for all branches for a given period."""
    stmt_branches = select(Branch)
    res_branches = await session.execute(stmt_branches)
    branches = res_branches.scalars().all()
    
    comparisons = []
    for branch in branches:
        stmt_p = (
            select(FinancialPeriod)
            .where(FinancialPeriod.branch_id == branch.branch_id)
            .where(FinancialPeriod.period_type == period_type)
            .where(extract("year", FinancialPeriod.start_date) == year)
        )
        res_p = await session.execute(stmt_p)
        period = res_p.scalars().first()
        if not period:
            continue
            
        stmt_i = select(IncomeStatement).where(IncomeStatement.period_id == period.period_id)
        res_i = await session.execute(stmt_i)
        inc = res_i.scalars().first()
        if inc:
            comparisons.append({
                "branch_name": branch.branch_name,
                "revenue": inc.revenue,
                "operating_expenses": inc.operating_expenses,
                "net_profit": inc.net_profit,
                "period_id": period.period_id,
                "branch_id": branch.branch_id
            })
            
    return comparisons


async def get_trend_data_for_branch(
    session: AsyncSession, branch_id: int, year: int = 2026
) -> List[Dict[str, Any]]:
    """
    Fetches quarterly revenue + net profit for a branch across all periods in a year.
    Returns a list of dicts: {period_type, revenue, net_profit, period_id, income_statement_id}
    """
    periods = await get_all_periods_for_branch(session, branch_id, year)
    trend_rows = []
    all_ids = []
    for p in periods:
        stmt_i = select(IncomeStatement).where(IncomeStatement.period_id == p.period_id)
        res_i = await session.execute(stmt_i)
        inc = res_i.scalars().first()
        if inc:
            trend_rows.append({
                "period_type": p.period_type,
                "revenue": inc.revenue,
                "net_profit": inc.net_profit,
            })
            all_ids.append(p.period_id)
            all_ids.append(inc.income_statement_id)
    return trend_rows, all_ids
