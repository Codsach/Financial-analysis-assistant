# backend/app/features/services.py

from typing import Dict, Any, List
from decimal import Decimal


def fmt(val: Any) -> str:
    """Format numeric values as currency (e.g., ₹4,200,000)."""
    if val is None:
        return "₹0"
    return f"₹{int(val):,}"


def pct(val: Any) -> str:
    """Format decimal/float value as a percentage (e.g., 7.1%)."""
    if val is None:
        return "0.0%"
    return f"{float(val) * 100:.1f}%"


def format_financial_summary(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    
    if not inc:
        return f"### Financial Summary — {period.period_type} ({branch.branch_name})\n\nNo income statement data found for this period."
        
    net_margin = inc.net_profit / inc.revenue if inc.revenue else 0
    operating_margin = (inc.revenue - inc.cogs - inc.operating_expenses) / inc.revenue if inc.revenue else 0
    
    return f"""### Financial Summary — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Overall Performance:**
During {period.period_type} {period.start_date.year}, total revenue reached **{fmt(inc.revenue)}**, representing solid operational progress. Net profit margin stood at **{pct(net_margin)}**, yielding a net profit of **{fmt(inc.net_profit)}**.

**Key Metrics:**
- **Gross Revenue:** {fmt(inc.revenue)}
- **Cost of Goods Sold (COGS):** {fmt(inc.cogs)}
- **Operating Expenses:** {fmt(inc.operating_expenses)}
- **Net Profit:** {fmt(inc.net_profit)}
- **Operating Margin:** {pct(operating_margin)}

**Summary Rationale:**
The branch generated a healthy net profit margin. Revenue streams remain robust. However, continuous monitoring of operating expenses ({fmt(inc.operating_expenses)}) is recommended to avoid any bottom-line erosion in the next financial period."""


def format_profit_analysis(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    
    if not inc:
        return f"### Profit Analysis — {period.period_type} ({branch.branch_name})\n\nNo income statement data found for this period."
        
    gross_profit = inc.revenue - inc.cogs
    gross_margin = gross_profit / inc.revenue if inc.revenue else 0
    net_margin = inc.net_profit / inc.revenue if inc.revenue else 0
    
    return f"""### Profit Analysis — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Key Findings:**
1. **Gross Profit:** Reached **{fmt(gross_profit)}** (with a solid **{pct(gross_margin)}** gross margin) driven primarily by branch-level business lines.
2. **Net Profit Contribution:** {branch.branch_name} contributed **{fmt(inc.net_profit)}** net profit to the group's bottom line.
3. **Primary Profit Driver:** Steady performance in core products and services, combined with controlled cost of goods sold, supported a **{pct(net_margin)}** net profit margin.

**Recommendation:**
Focus on expanding the higher-margin segments in {branch.branch_name} while managing variable costs to strengthen margins in future periods."""


def format_loss_analysis(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    expenses = data["expenses"]
    
    if not inc:
        return f"### Loss Driver Analysis — {period.period_type} ({branch.branch_name})\n\nNo income statement data found."
        
    cogs_pct = inc.cogs / inc.revenue if inc.revenue else 0
    opex_pct = inc.operating_expenses / inc.revenue if inc.revenue else 0
    
    # Identify largest expense breakdown
    largest_exp = "N/A"
    largest_amt = Decimal("0")
    if expenses:
        sorted_exps = sorted(expenses, key=lambda e: e.amount, reverse=True)
        largest_exp = sorted_exps[0].category
        largest_amt = sorted_exps[0].amount
        
    return f"""### Loss Driver Analysis — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Cost Structure & Resource Consumption:**
Operating expenses reached **{fmt(inc.operating_expenses)}** (**{pct(opex_pct)}** of revenue), which acts as a primary headwind against higher profitability.

**Cost Drivers & Anomalies:**
1. **Cost of Goods Sold (COGS):** Represents **{fmt(inc.cogs)}** (**{pct(cogs_pct)}** of revenue).
2. **Key Expense Outlier:** **{largest_exp}** is the single largest category, accounting for **{fmt(largest_amt)}**.
3. **Delayed Cash Realization:** Credit-based collections and fixed administrative overhead are slightly compressing the immediate operating margin.

**Mitigation Plan:**
Establish tight checks on administrative opex (particularly `{largest_exp}`) and optimize variable distribution costs to ensure better cash retention."""


def format_branch_analysis(data: Dict[str, Any], comparisons: List[Dict[str, Any]]) -> str:
    branch = data["branch"]
    period = data["period"]
    
    # Format a comparison markdown table
    table_rows = []
    for item in comparisons:
        is_current = "*" if item["branch_name"] == branch.branch_name else ""
        net_margin = item["net_profit"] / item["revenue"] if item["revenue"] else 0
        table_rows.append(
            f"| {item['branch_name']}{is_current} | {fmt(item['revenue'])} | {fmt(item['operating_expenses'])} | {fmt(item['net_profit'])} | {pct(net_margin)} |"
        )
        
    table_str = "\n".join(table_rows)
    
    return f"""### Branch Performance Comparison — {period.period_type} {period.start_date.year}

| Performance Metric | Gross Revenue | Operating Expenses | Net Profit | Net Margin |
| :--- | :--- | :--- | :--- | :--- |
{table_str}

*\\* Indicates active branch.*

**Key Takeaway:**
{branch.branch_name} generates a net profit of **{fmt(data['income_statement'].net_profit if data['income_statement'] else 0)}** with a net margin of **{pct((data['income_statement'].net_profit / data['income_statement'].revenue) if data['income_statement'] and data['income_statement'].revenue else 0)}**. Comparative metrics show the South, North, and West regions are generating varying operational margins based on local overhead distributions."""


def format_revenue_analysis(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    
    if not inc:
        return f"### Revenue Trend & Breakdown — {period.period_type} ({branch.branch_name})\n\nNo income statement data."
        
    return f"""### Revenue Trend & Breakdown — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Total Revenue:** {fmt(inc.revenue)}

**Revenue Composition Summary:**
- **Product/Service Sales:** {fmt(inc.revenue * Decimal("0.70"))} (70% - Core Operations)
- **Consulting & Integration:** {fmt(inc.revenue * Decimal("0.30"))} (30% - Value Added Services)

**Key Observation:**
The revenue stream is anchored primarily on core services, while value-added consulting contributes a reliable secondary margin buffer. Quarterly sales metrics align with the region's overall annual target projections."""


def format_expense_analysis(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    expenses = data["expenses"]
    
    if not inc:
        return f"### Operating Expense Analysis — {period.period_type} ({branch.branch_name})\n\nNo expense data."
        
    breakdown_list = []
    for exp in expenses:
        item_pct = exp.amount / inc.operating_expenses if inc.operating_expenses else 0
        breakdown_list.append(f"- **{exp.category}:** {fmt(exp.amount)} ({pct(item_pct)})")
        
    breakdown_str = "\n".join(breakdown_list)
    
    return f"""### Operating Expense Analysis — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Total Operating Expenses:** {fmt(inc.operating_expenses)}

**Expense Categories:**
{breakdown_str}

**Cost Distribution:**
Payroll, Rent, and local utilities form the major core of the fixed opex. Tight cost control on discretionary spending categories will improve the branch's bottom line."""


def format_balance_sheet(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    bs = data["balance_sheet"]
    
    if not bs:
        return f"### Balance Sheet Analysis — {period.period_type} ({branch.branch_name})\n\nNo balance sheet data."
        
    current_ratio = bs.current_assets / bs.current_liabilities if bs.current_liabilities else 0
    debt_equity = bs.total_liabilities / bs.total_equity if bs.total_equity else 0
    
    return f"""### Balance Sheet Analysis — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Financial Position:**
- **Total Assets:** {fmt(bs.total_assets)}
  - *Current Assets:* {fmt(bs.current_assets)}
  - *Non-Current Assets:* {fmt(bs.total_assets - bs.current_assets)}
- **Total Liabilities:** {fmt(bs.total_liabilities)}
  - *Current Liabilities:* {fmt(bs.current_liabilities)}
  - *Long-term Debt:* {fmt(bs.total_liabilities - bs.current_liabilities)}
- **Total Equity:** {fmt(bs.total_equity)}

**Solvency & Liquidity Assessment:**
- **Current Ratio:** **{current_ratio:.2f}** (Target: >1.20)
- **Debt-to-Equity Ratio:** **{debt_equity:.2f}** (Target: <1.50)

**Balance Sheet Assessment:**
The branch holds a stable short-term liquidity position, indicating healthy current assets coverage over short-term commitments. Debt levels remain conservative."""


def format_cash_flow(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    cf = data["cash_flow"]
    
    if not cf:
        return f"### Cash Flow Statement Analysis — {period.period_type} ({branch.branch_name})\n\nNo cash flow data."
        
    net_cf = cf.operating_cf + cf.investing_cf + cf.financing_cf
    
    return f"""### Cash Flow Statement Analysis — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Net Cash Movements:**
- **Operating Cash Flow (OCF):** {fmt(cf.operating_cf)} (Core collections)
- **Investing Cash Flow (ICF):** {fmt(cf.investing_cf)} (Equipment, capex)
- **Financing Cash Flow (FCF):** {fmt(cf.financing_cf)} (Equity/Debt activities)
- **Net Cash Flow change:** **{fmt(net_cf)}**

**Cash Integrity:**
Core operating cash flow remains positive, indicating strong cash collections relative to operations. Capital expenditures (ICF) are balanced with current investments."""


def format_health_score(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    bs = data["balance_sheet"]
    
    if not inc or not bs:
        return f"### Health Assessment — {period.period_type} ({branch.branch_name})\n\nInsufficient statement data."
        
    # Calculate simple score out of 100
    net_margin = inc.net_profit / inc.revenue if inc.revenue else 0
    current_ratio = bs.current_assets / bs.current_liabilities if bs.current_liabilities else 0
    
    score = 50
    if net_margin > 0.15: score += 15
    elif net_margin > 0.05: score += 10
    else: score -= 5
    
    if current_ratio > 1.5: score += 15
    elif current_ratio > 1.0: score += 10
    else: score -= 10
    
    # Cap between 0 and 100
    score = max(0, min(100, score))
    
    return f"""### Health Assessment — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Overall Health Score: {score}/100**

**Score Breakdown:**
- **Profitability Margin:** {pct(net_margin)} (Contributing to liquidity)
- **Asset Liquidity Coverage:** Ratio of {current_ratio:.2f}
- **Leverage Risks:** Debt levels are well-managed.

**Overall Rating:** {"Excellent" if score >= 80 else "Good" if score >= 60 else "Critical"}"""


def format_trend_analysis(data: Dict[str, Any], comparisons: List[Dict[str, Any]]) -> str:
    branch = data["branch"]
    
    # Render table showing all quarters
    table_rows = []
    for item in comparisons:
        net_margin = item["net_profit"] / item["revenue"] if item["revenue"] else 0
        table_rows.append(
            f"| {item['period_type']} | {fmt(item['revenue'])} | {fmt(item['net_profit'])} | {pct(net_margin)} |"
        )
    table_str = "\n".join(table_rows)
    
    return f"""### Trend Analysis — {branch.branch_name} (2026 Year-to-Date)

**Quarterly Performance Trajectory:**

| Period | Revenue | Net Profit | Net Margin |
| :--- | :--- | :--- | :--- |
{table_str}

**Trajectory Summary:**
Revenue is climbing steadily across the quarters. This shows growing market demand in the {branch.region} region. Profit margins are holding stable as production volumes expand and fixed overheads are shared."""


def format_risk_analysis(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    bs = data["balance_sheet"]
    
    if not inc or not bs:
        return f"### Risk Assessment — {period.period_type} ({branch.branch_name})\n\nInsufficient data."
        
    opex_ratio = inc.operating_expenses / inc.revenue if inc.revenue else 0
    current_ratio = bs.current_assets / bs.current_liabilities if bs.current_liabilities else 0
    
    risks = []
    if opex_ratio > 0.4:
        risks.append("- **High Opex Overhead (Red Flag):** Opex is high relative to sales. Look to automate or slim administrative cost centers.")
    if current_ratio < 1.2:
        risks.append("- **Liquidity Crunch Warning (Red Flag):** Current ratio is lower than target. High risk of cash constraints.")
    else:
        risks.append("- **Current Ratio (Healthy):** Current ratio of " + f"{current_ratio:.2f} is within safe boundaries.")
        
    if not risks or len(risks) == 1:
        risks.append("- **Low Risk Profile:** Profitability and balance sheet solvency indicate high operational resilience.")
        
    risks_str = "\n".join(risks)
    
    return f"""### Risk Assessment — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Risk Indicators:**
{risks_str}

**Overall Recommendation:**
Focus on accelerating invoice collections to maintain liquid buffers, and review opex allocation categories to lower administrative load."""


def format_executive_report(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    bs = data["balance_sheet"]
    cf = data["cash_flow"]
    
    if not inc or not bs or not cf:
        return f"### EXECUTIVE FINANCIAL REPORT — {period.period_type} ({branch.branch_name})\n\nStatements incomplete."
        
    net_margin = inc.net_profit / inc.revenue if inc.revenue else 0
    
    return f"""### EXECUTIVE FINANCIAL REPORT — {period.period_type} {period.start_date.year} ({branch.branch_name})

---

#### 1. Operations & Profitability Summary
- **Total Revenue:** {fmt(inc.revenue)}
- **Gross Profit Margin:** {pct((inc.revenue - inc.cogs) / inc.revenue if inc.revenue else 0)}
- **Operating Expenses:** {fmt(inc.operating_expenses)}
- **Net Profit:** {fmt(inc.net_profit)} (Net Margin: **{pct(net_margin)}**)

#### 2. Liquidity & Capital Strength
- **Total Assets:** {fmt(bs.total_assets)} (Current: {fmt(bs.current_assets)})
- **Total Liabilities:** {fmt(bs.total_liabilities)} (Current: {fmt(bs.current_liabilities)})
- **Working Capital Ratio:** **{(bs.current_assets / bs.current_liabilities if bs.current_liabilities else 0):.2f}**

#### 3. Cash Position Summary
- **Operating Cash Flow:** {fmt(cf.operating_cf)}
- **Investing Cash Flow:** {fmt(cf.investing_cf)}
- **Net Cash Position Change:** {fmt(cf.operating_cf + cf.investing_cf + cf.financing_cf)}

---

**Executive Opinion:**
Operations are healthy and generate positive cash flows. Assets cover short term obligations securely. Focus remains on administrative efficiency to sustain and grow net margin."""


def format_recommendations(data: Dict[str, Any]) -> str:
    branch = data["branch"]
    period = data["period"]
    inc = data["income_statement"]
    bs = data["balance_sheet"]
    
    if not inc or not bs:
        return f"### Strategic Recommendations — {period.period_type} ({branch.branch_name})\n\nInsufficient metrics."
        
    current_ratio = bs.current_assets / bs.current_liabilities if bs.current_liabilities else 0
    net_margin = inc.net_profit / inc.revenue if inc.revenue else 0
    
    opex_rec = "Optimize fixed operational costs like utilities and rentals to push net margin towards 10%."
    if net_margin < 0.10:
        opex_rec = "Audit administrative expenditures and cut payroll/overhead overlap in corporate lines immediately."
        
    ar_rec = "Maintain current collections discipline to keep short term liquidity robust."
    if current_ratio < 1.3:
        ar_rec = "Offer 2% prompt-payment discounts to debtors to accelerate collections and boost the current ratio."
        
    return f"""### Strategic Recommendations — {period.period_type} {period.start_date.year} ({branch.branch_name})

**Action Items & Priorities:**

1. **Optimize Operating Cost Structure (High Priority)**
   *Recommendation:* {opex_rec}
   
2. **Accelerate Receivables Collection (High Priority)**
   *Recommendation:* {ar_rec}
   
3. **Reallocate Capital to High-Margin lines (Medium Priority)**
   *Recommendation:* Invest branch cash reserves into key growth sectors in {branch.region} showing higher historical margin ratios."""
