"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  MessageSquare,
  History,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ─── Nav config ──────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    href: "/",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview",
  },
  {
    href: "/query",
    label: "Query Console",
    icon: MessageSquare,
    description: "Ask anything",
  },
  {
    href: "/history",
    label: "History",
    icon: History,
    description: "Past queries",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Preferences",
  },
] as const;

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="flex flex-col shrink-0 h-full"
      style={{
        width: "280px",
        backgroundColor: "#1a1a2e",
        borderRight: "1px solid #2d2d4e",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-6 py-5"
        style={{ borderBottom: "1px solid #2d2d4e" }}
      >
        {/* Icon mark */}
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
          }}
        >
          <TrendingUp size={20} color="#fff" />
        </div>
        {/* Word mark */}
        <div>
          <p
            className="font-bold leading-none tracking-tight"
            style={{ fontSize: "15px", color: "#e2e8f0" }}
          >
            FinAnalyst
          </p>
          <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
            AI Financial Intelligence
          </p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-4 py-5 flex flex-col gap-2">
        {/* Section label */}
        <p
          className="uppercase tracking-widest font-semibold px-3 mb-3"
          style={{ fontSize: "10px", color: "#6b7280" }}
        >
          Main Menu
        </p>

        {NAV_ITEMS.map(({ href, label, icon: Icon, description }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200"
              style={{
                backgroundColor: active
                  ? "rgba(55, 48, 163, 0.25)"
                  : "transparent",
                color: active ? "#a5b4fc" : "#94a3b8",
                borderLeft: active
                  ? "2px solid #7c3aed"
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(45, 45, 78, 0.6)";
                  (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                }
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-lg shrink-0 transition-all duration-200"
                style={{
                  width: "34px",
                  height: "34px",
                  backgroundColor: active
                    ? "rgba(124, 58, 237, 0.2)"
                    : "rgba(45, 45, 78, 0.5)",
                }}
              >
                <Icon
                  size={17}
                  style={{ color: active ? "#8b5cf6" : "currentColor" }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium leading-none"
                  style={{ fontSize: "14px" }}
                >
                  {label}
                </p>
                <p
                  className="mt-0.5"
                  style={{ fontSize: "11px", color: "#6b7280" }}
                >
                  {description}
                </p>
              </div>

              {/* Active dot */}
              {active && (
                <div
                  className="shrink-0 rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#7c3aed",
                    boxShadow: "0 0 8px rgba(124,58,237,0.8)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer status ── */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid #2d2d4e" }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-3"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.08)" }}
        >
          <Zap size={14} style={{ color: "#10b981" }} />
          <div>
            <p className="font-medium" style={{ fontSize: "12px", color: "#10b981" }}>
              System Online
            </p>
            <p style={{ fontSize: "10px", color: "#6b7280" }}>
              All services running
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
