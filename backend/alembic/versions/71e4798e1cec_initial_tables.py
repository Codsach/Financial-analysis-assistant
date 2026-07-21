"""initial tables

Revision ID: 71e4798e1cec
Revises: 
Create Date: 2026-07-21 19:10:02.087962

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '71e4798e1cec'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create branches table
    op.create_table('branches',
        sa.Column('branch_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('branch_name', sa.String(255), nullable=False),
        sa.Column('region', sa.String(255), nullable=False),
        sa.PrimaryKeyConstraint('branch_id'),
        sa.UniqueConstraint('branch_name')
    )
    
    # Create financial_periods table
    op.create_table('financial_periods',
        sa.Column('period_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=False),
        sa.Column('period_type', sa.String(50), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.branch_id'], ),
        sa.PrimaryKeyConstraint('period_id')
    )
    
    # Create income_statements table
    op.create_table('income_statements',
        sa.Column('income_statement_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('period_id', sa.Integer(), nullable=False),
        sa.Column('revenue', sa.Numeric(18, 2), nullable=False),
        sa.Column('cogs', sa.Numeric(18, 2), nullable=False),
        sa.Column('operating_expenses', sa.Numeric(18, 2), nullable=False),
        sa.Column('net_profit', sa.Numeric(18, 2), nullable=False),
        sa.ForeignKeyConstraint(['period_id'], ['financial_periods.period_id'], ),
        sa.PrimaryKeyConstraint('income_statement_id'),
        sa.UniqueConstraint('period_id')
    )
    
    # Create balance_sheets table
    op.create_table('balance_sheets',
        sa.Column('balance_sheet_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('period_id', sa.Integer(), nullable=False),
        sa.Column('total_assets', sa.Numeric(18, 2), nullable=False),
        sa.Column('total_liabilities', sa.Numeric(18, 2), nullable=False),
        sa.Column('total_equity', sa.Numeric(18, 2), nullable=False),
        sa.Column('current_assets', sa.Numeric(18, 2), nullable=False),
        sa.Column('current_liabilities', sa.Numeric(18, 2), nullable=False),
        sa.ForeignKeyConstraint(['period_id'], ['financial_periods.period_id'], ),
        sa.PrimaryKeyConstraint('balance_sheet_id'),
        sa.UniqueConstraint('period_id')
    )
    
    # Create cash_flows table
    op.create_table('cash_flows',
        sa.Column('cash_flow_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('period_id', sa.Integer(), nullable=False),
        sa.Column('operating_cf', sa.Numeric(18, 2), nullable=False),
        sa.Column('investing_cf', sa.Numeric(18, 2), nullable=False),
        sa.Column('financing_cf', sa.Numeric(18, 2), nullable=False),
        sa.ForeignKeyConstraint(['period_id'], ['financial_periods.period_id'], ),
        sa.PrimaryKeyConstraint('cash_flow_id'),
        sa.UniqueConstraint('period_id')
    )
    
    # Create expense_breakdowns table
    op.create_table('expense_breakdowns',
        sa.Column('expense_breakdown_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('period_id', sa.Integer(), nullable=False),
        sa.Column('category', sa.String(255), nullable=False),
        sa.Column('amount', sa.Numeric(18, 2), nullable=False),
        sa.ForeignKeyConstraint(['period_id'], ['financial_periods.period_id'], ),
        sa.PrimaryKeyConstraint('expense_breakdown_id')
    )
    
    # Create audit_logs table
    op.create_table('audit_logs',
        sa.Column('log_id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('query_text', sa.String(2000), nullable=False),
        sa.Column('retrieved_record_ids', sa.JSON(), nullable=True),
        sa.Column('response_summary', sa.String(1000), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('log_id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('audit_logs')
    op.drop_table('expense_breakdowns')
    op.drop_table('cash_flows')
    op.drop_table('balance_sheets')
    op.drop_table('income_statements')
    op.drop_table('financial_periods')
    op.drop_table('branches')
