import Link from "next/link";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Building2,
  DollarSign,
  Receipt,
  Scale,
  Waves,
  Activity,
  LineChart,
  ShieldAlert,
  FileText,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ─── Analysis types mock data ────────────────────────────────────────────── */
const ANALYSIS_TYPES = [
  {
    slug: "financial-summary",
    title: "Financial Summary",
    description:
      "Get a comprehensive overview of your organisation's overall financial health at a glance.",
    icon: LayoutDashboard,
    gradient: "linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)",
    glowColor: "#3730a3",
    tag: "Overview",
  },
  {
    slug: "profit",
    title: "Profit Analysis",
    description:
      "Drill into revenue versus cost breakdowns to understand where profits are being generated.",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glowColor: "#10b981",
    tag: "P&L",
  },
  {
    slug: "loss",
    title: "Loss Analysis",
    description:
      "Identify loss-making segments, cost overruns, and patterns that erode your bottom line.",
    icon: TrendingDown,
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    glowColor: "#ef4444",
    tag: "P&L",
  },
  {
    slug: "branch-analysis",
    title: "Branch Analysis",
    description:
      "Compare performance metrics side-by-side across all your branches and regions.",
    icon: Building2,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    glowColor: "#f59e0b",
    tag: "Operations",
  },
  {
    slug: "revenue",
    title: "Revenue Analysis",
    description:
      "Uncover revenue streams, seasonal trends, and growth drivers across products and channels.",
    icon: DollarSign,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    glowColor: "#7c3aed",
    tag: "Revenue",
  },
  {
    slug: "expense",
    title: "Expense Analysis",
    description:
      "Track spending categories, detect anomalies, and find opportunities for cost reduction.",
    icon: Receipt,
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    glowColor: "#ec4899",
    tag: "Expenses",
  },
  {
    slug: "balance-sheet",
    title: "Balance Sheet",
    description:
      "View assets, liabilities, and equity with full breakdowns to assess solvency.",
    icon: Scale,
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    glowColor: "#0ea5e9",
    tag: "Accounting",
  },
  {
    slug: "cash-flow",
    title: "Cash Flow",
    description:
      "Analyse operating, investing, and financing cash flows to understand liquidity.",
    icon: Waves,
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    glowColor: "#14b8a6",
    tag: "Liquidity",
  },
  {
    slug: "health-score",
    title: "Health Score",
    description:
      "A composite AI-driven wellness score combining key financial ratios and indicators.",
    icon: Activity,
    gradient: "linear-gradient(135deg, #10b981 0%, #3730a3 100%)",
    glowColor: "#10b981",
    tag: "AI Insight",
  },
  {
    slug: "trend",
    title: "Trend Analysis",
    description:
      "Surface historical patterns, seasonality, and forward-looking forecasts from your data.",
    icon: LineChart,
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    glowColor: "#6366f1",
    tag: "Forecasting",
  },
  {
    slug: "risk",
    title: "Risk Assessment",
    description:
      "Identify financial risk factors, concentration risks, and mitigation strategies.",
    icon: ShieldAlert,
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    glowColor: "#f97316",
    tag: "Risk",
  },
  {
    slug: "report",
    title: "Report Generator",
    description:
      "Auto-generate polished executive-ready reports in PDF or Markdown from any analysis.",
    icon: FileText,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    glowColor: "#8b5cf6",
    tag: "Reporting",
  },
  {
    slug: "recommendations",
    title: "Recommendations",
    description:
      "Get AI-powered strategic suggestions tailored to your financial position and goals.",
    icon: Lightbulb,
    gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    glowColor: "#fbbf24",
    tag: "AI Strategy",
  },
] as const;

/* ─── Stat card data ──────────────────────────────────────────────────────── */
const STATS = [
  { label: "Active Branches",   value: "—",  sub: "Awaiting data"   },
  { label: "Analysis Types",    value: "13", sub: "Ready to use"    },
  { label: "Avg Response",      value: "—",  sub: "Once connected"  },
  { label: "Reports Generated", value: "—",  sub: "Coming soon"     },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <>
      {/* Global CSS-only hover/animation styles (no JS event handlers needed) */}
      <style>{`
        .analysis-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .analysis-card:hover {
          transform: translateY(-5px);
          border-color: #3d3d6e !important;
        }
        .analysis-card:hover .card-glow {
          opacity: 1;
        }
        .analysis-card:hover .card-cta {
          color: #a5b4fc;
        }
        .analysis-card:hover .card-arrow {
          transform: translateX(4px);
        }
        .card-glow {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .card-cta {
          color: #6b7280;
          transition: color 0.2s ease;
        }
        .card-arrow {
          transition: transform 0.2s ease;
        }
        .stat-card {
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .stat-card:hover {
          border-color: #3d3d6e !important;
          background-color: #1e1e3a !important;
        }
        .hero-cta {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 36px rgba(124,58,237,0.55) !important;
        }
      `}</style>

      <div
        style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto", minHeight: "100%" }}
      >
        {/* ── Hero banner ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
            border: "1px solid #2d2d4e",
            padding: "40px 48px",
            marginBottom: "28px",
          }}
        >
          {/* Ambient glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 15% 50%, rgba(55,48,163,0.25) 0%, transparent 55%), " +
                "radial-gradient(ellipse at 85% 50%, rgba(124,58,237,0.18) 0%, transparent 55%)",
            }}
          />

          <div className="relative flex items-center justify-between gap-8 flex-wrap">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Sparkles size={15} style={{ color: "#7c3aed" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#7c3aed",
                  }}
                >
                  AI-Powered Intelligence
                </span>
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#e2e8f0",
                  marginBottom: "12px",
                }}
              >
                Financial Intelligence{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #818cf8, #a78bfa, #c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Dashboard
                </span>
              </h1>
              <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "500px", lineHeight: 1.65 }}>
                Select an analysis type below, or type your question in the Query Console.
                All 13 analysis engines are ready and waiting.
              </p>
            </div>

            {/* CTA button — server-safe, CSS hover */}
            <Link
              href="/query"
              className="hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 0 28px rgba(124,58,237,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              Open Query Console
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {STATS.map(({ label, value, sub }) => (
            <div
              key={label}
              className="stat-card"
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #2d2d4e",
                borderRadius: "14px",
                padding: "22px 24px",
              }}
            >
              <p style={{ fontSize: "30px", fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginTop: "6px" }}>
                {label}
              </p>
              <p style={{ fontSize: "11px", color: "#4b5563", marginTop: "4px" }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Section header ── */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#e2e8f0" }}>
            Analysis Engines
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            {ANALYSIS_TYPES.length} analysis types available — click any card to begin
          </p>
        </div>

        {/* ── 13-card grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {ANALYSIS_TYPES.map(({ slug, title, description, icon: Icon, gradient, glowColor, tag }) => (
            <Link
              key={slug}
              href={`/query?type=${slug}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <article
                className="analysis-card"
                style={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #2d2d4e",
                  borderRadius: "16px",
                  padding: "24px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Corner glow (CSS-driven) */}
                <div
                  className="card-glow"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "130px",
                    height: "130px",
                    background: `radial-gradient(circle at 100% 0%, ${glowColor}55 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: gradient,
                      boxShadow: `0 0 18px ${glowColor}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color="#fff" strokeWidth={2} />
                  </div>

                  {/* Tag badge */}
                  <span
                    style={{
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      backgroundColor: "rgba(45, 45, 78, 0.9)",
                      border: "1px solid #3d3d6e",
                      borderRadius: "999px",
                      color: "#94a3b8",
                    }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Body */}
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#e2e8f0", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, marginBottom: "20px" }}>
                  {description}
                </p>

                {/* CTA row */}
                <div
                  className="card-cta"
                  style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600 }}
                >
                  <span>Analyse</span>
                  <ArrowRight size={14} className="card-arrow" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ── Footer note ── */}
        <p style={{ fontSize: "12px", color: "#374151", textAlign: "center", marginTop: "40px", paddingBottom: "16px" }}>
          Mock data displayed — connect the backend API to see live financial analysis
        </p>
      </div>
    </>
  );
}
