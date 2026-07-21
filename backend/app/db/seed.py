"""
Seed script to populate the database with sample financial data.
Run with: python -m app.db.seed
"""

import asyncio
from datetime import datetime, timedelta
from decimal import Decimal
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from sqlalchemy import select
from app.db.base import Base
from app.db.session import engine, AsyncSessionLocal
from app.db.models.branch import Branch
from app.db.models.financial_periods import FinancialPeriod
from app.db.models.income_statement import IncomeStatement
from app.db.models.balance_sheet import BalanceSheet
from app.db.models.cash_flow import CashFlow
from app.db.models.expense_breakdown import ExpenseBreakdown


async def seed_database():
    """Populate database with sample financial data."""
    
    async with AsyncSessionLocal() as session:
        try:
            # Check if data already exists
            result = await session.execute(select(Branch))
            existing_branches = result.scalars().all()
            
            if existing_branches:
                print("✓ Database already seeded. Skipping...")
                return
            
            print("🌱 Seeding database with sample financial data...")
            
            # Create branches
            branches = [
                Branch(branch_name="Bangalore", region="South India"),
                Branch(branch_name="Mumbai", region="West India"),
                Branch(branch_name="Delhi", region="North India"),
            ]
            session.add_all(branches)
            await session.flush()  # Flush to get IDs
            
            print(f"✓ Created {len(branches)} branches")
            
            # Create financial periods and associated data for each branch
            quarter_configs = [
                {"type": "Q1", "start": "2026-01-01", "end": "2026-03-31"},
                {"type": "Q2", "start": "2026-04-01", "end": "2026-06-30"},
                {"type": "Q3", "start": "2026-07-01", "end": "2026-09-30"},
                {"type": "Q4", "start": "2026-10-01", "end": "2026-12-31"},
            ]
            
            periods_created = 0
            statements_created = 0
            
            for branch in branches:
                for idx, quarter_config in enumerate(quarter_configs):
                    # Create financial period
                    period = FinancialPeriod(
                        branch_id=branch.branch_id,
                        period_type=quarter_config["type"],
                        start_date=datetime.strptime(quarter_config["start"], "%Y-%m-%d").date(),
                        end_date=datetime.strptime(quarter_config["end"], "%Y-%m-%d").date(),
                    )
                    session.add(period)
                    await session.flush()
                    periods_created += 1
                    
                    # Generate realistic financial data (varying by branch and quarter)
                    base_revenue = Decimal("5000000")  # 50 lakhs
                    if branch.branch_name == "Mumbai":
                        base_revenue = Decimal("7500000")  # 75 lakhs
                    elif branch.branch_name == "Delhi":
                        base_revenue = Decimal("6000000")  # 60 lakhs
                    
                    # Add quarterly variation
                    quarterly_multiplier = Decimal(str(0.8 + (idx * 0.1)))
                    revenue = base_revenue * quarterly_multiplier
                    
                    # Create income statement
                    income_stmt = IncomeStatement(
                        period_id=period.period_id,
                        revenue=revenue,
                        cogs=revenue * Decimal("0.45"),  # 45% of revenue
                        operating_expenses=revenue * Decimal("0.25"),  # 25% of revenue
                        net_profit=revenue * Decimal("0.30"),  # 30% net margin
                    )
                    session.add(income_stmt)
                    statements_created += 1
                    
                    # Create balance sheet
                    total_assets = revenue * Decimal("3.5")
                    balance_sheet = BalanceSheet(
                        period_id=period.period_id,
                        total_assets=total_assets,
                        total_liabilities=total_assets * Decimal("0.4"),  # 40% debt
                        total_equity=total_assets * Decimal("0.6"),  # 60% equity
                        current_assets=total_assets * Decimal("0.3"),  # 30% current
                        current_liabilities=total_assets * Decimal("0.15"),  # 15% current liabilities
                    )
                    session.add(balance_sheet)
                    statements_created += 1
                    
                    # Create cash flow
                    cash_flow = CashFlow(
                        period_id=period.period_id,
                        operating_cf=income_stmt.net_profit * Decimal("1.2"),  # 120% of net profit
                        investing_cf=-(income_stmt.net_profit * Decimal("0.3")),  # -30% capex
                        financing_cf=Decimal("0"),  # No financing changes
                    )
                    session.add(cash_flow)
                    statements_created += 1
                    
                    # Create expense breakdown for this period
                    expense_categories = [
                        ("Salaries & Benefits", income_stmt.operating_expenses * Decimal("0.5")),
                        ("Rent & Facilities", income_stmt.operating_expenses * Decimal("0.2")),
                        ("Utilities", income_stmt.operating_expenses * Decimal("0.1")),
                        ("Marketing", income_stmt.operating_expenses * Decimal("0.15")),
                        ("Other", income_stmt.operating_expenses * Decimal("0.05")),
                    ]
                    
                    for category_name, amount in expense_categories:
                        expense = ExpenseBreakdown(
                            period_id=period.period_id,
                            category=category_name,
                            amount=amount,
                        )
                        session.add(expense)
                        statements_created += 1
            
            # Commit all changes
            await session.commit()
            
            print(f"✓ Created {periods_created} financial periods")
            print(f"✓ Created {statements_created} financial statements & expense records")
            print("✅ Database seeding completed successfully!")
            
        except Exception as e:
            await session.rollback()
            print(f"❌ Error seeding database: {e}")
            raise


async def main():
    """Main entry point."""
    try:
        # Create all tables if they don't exist
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        # Seed the database
        await seed_database()
        
    finally:
        await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
