"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, LogOut, ChevronDown } from "lucide-react";

/* ─── Route → title map ───────────────────────────────────────────────────── */
const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/":         { title: "Dashboard",       subtitle: "Financial overview & quick access" },
  "/query":    { title: "Query Console",   subtitle: "Ask any financial question" },
  "/history":  { title: "Query History",   subtitle: "Review your past analyses" },
  "/settings": { title: "Settings",        subtitle: "Configure preferences & integrations" },
};

function getPageMeta(pathname: string) {
  return (
    PAGE_TITLES[pathname] ??
    PAGE_TITLES[Object.keys(PAGE_TITLES).find((k) => k !== "/" && pathname.startsWith(k)) ?? "/"] ??
    PAGE_TITLES["/"]
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function TopNav() {
  const pathname = usePathname();
  const { title, subtitle } = getPageMeta(pathname);

  return (
    <header
      className="flex items-center justify-between shrink-0 px-6"
      style={{
        height: "64px",
        backgroundColor: "rgba(26, 26, 46, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #2d2d4e",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* ── Left: Page title ── */}
      <div>
        <h1
          className="font-bold leading-none"
          style={{ fontSize: "18px", color: "#e2e8f0" }}
        >
          {title}
        </h1>
        <p
          className="mt-0.5"
          style={{ fontSize: "12px", color: "#6b7280" }}
        >
          {subtitle}
        </p>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <button
          className="flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200"
          style={{
            backgroundColor: "rgba(45, 45, 78, 0.6)",
            border: "1px solid #2d2d4e",
            color: "#6b7280",
            fontSize: "13px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#3730a3";
            (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2d2d4e";
            (e.currentTarget as HTMLElement).style.color = "#6b7280";
          }}
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search…</span>
          <kbd
            className="hidden sm:inline-flex items-center rounded px-1.5"
            style={{
              fontSize: "11px",
              backgroundColor: "rgba(55, 48, 163, 0.2)",
              color: "#7c3aed",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center rounded-xl transition-all duration-200"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(45, 45, 78, 0.6)",
            border: "1px solid #2d2d4e",
            color: "#94a3b8",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#3730a3";
            (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2d2d4e";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }}
        >
          <Bell size={16} />
          {/* Notification dot */}
          <span
            className="absolute top-2 right-2 rounded-full"
            style={{
              width: "7px",
              height: "7px",
              backgroundColor: "#7c3aed",
              boxShadow: "0 0 6px rgba(124,58,237,0.8)",
            }}
          />
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "#2d2d4e",
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />

        {/* User avatar + logout */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-xl font-bold shrink-0"
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
              color: "#fff",
              fontSize: "13px",
              boxShadow: "0 0 12px rgba(124, 58, 237, 0.3)",
            }}
          >
            FA
          </div>

          {/* Name + role */}
          <div className="hidden md:block">
            <p
              className="font-semibold leading-none"
              style={{ fontSize: "13px", color: "#e2e8f0" }}
            >
              Analyst
            </p>
            <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
              Finance Team
            </p>
          </div>

          <ChevronDown size={14} style={{ color: "#6b7280" }} />
        </div>

        {/* Logout */}
        <button
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-200"
          style={{
            backgroundColor: "transparent",
            border: "1px solid transparent",
            color: "#6b7280",
            fontSize: "13px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(239, 68, 68, 0.1)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(239, 68, 68, 0.3)";
            (e.currentTarget as HTMLElement).style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#6b7280";
          }}
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
