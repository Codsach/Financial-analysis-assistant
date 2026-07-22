"use client";

import { Clock3, History, MessageSquareMore } from "lucide-react";
import { HistoryItem, ANALYSIS_TYPE_MAP } from "@/types/domain";

interface HistoryPanelProps {
  history: HistoryItem[];
  isHydrated: boolean;
  onSelect: (item: HistoryItem) => void;
}

function timeAgo(timestamp: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function HistoryPanel({ history, isHydrated, onSelect }: HistoryPanelProps) {
  if (!isHydrated) {
    return <p className="p-6 text-sm" style={{ color: "#94a3b8" }}>Loading session history...</p>;
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <History size={30} style={{ color: "#818cf8" }} />
        <p className="font-semibold" style={{ color: "#e2e8f0" }}>No queries in this session yet</p>
        <p className="text-sm" style={{ color: "#94a3b8" }}>Completed analyses will appear here for quick replay.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-230px)] overflow-y-auto p-3 flex flex-col gap-2">
      {history.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className="w-full rounded-xl p-4 text-left transition-colors"
          style={{ backgroundColor: "#131326", border: "1px solid #2d2d4e" }}
          onMouseEnter={(event) => { event.currentTarget.style.borderColor = "#7c3aed"; }}
          onMouseLeave={(event) => { event.currentTarget.style.borderColor = "#2d2d4e"; }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquareMore size={15} style={{ color: "#a78bfa" }} />
                <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: "#27214b", color: "#c4b5fd" }}>
                  {ANALYSIS_TYPE_MAP[item.type]?.title ?? item.type}
                </span>
              </div>
              <p className="line-clamp-2 text-sm leading-6" style={{ color: "#e2e8f0" }}>{item.query}</p>
            </div>
            <span className="shrink-0 flex items-center gap-1 text-xs" style={{ color: "#94a3b8" }}>
              <Clock3 size={13} /> {timeAgo(item.createdAt)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
