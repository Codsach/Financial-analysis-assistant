"use client";

import { useRouter } from "next/navigation";
import { History } from "lucide-react";
import HistoryPanel from "@/features/history/components/HistoryPanel";
import { useHistory } from "@/features/history/hooks/useHistory";
import { HistoryItem } from "@/types/domain";

export default function HistoryPage() {
  const router = useRouter();
  const { history, isHydrated } = useHistory();

  const handleSelect = (item: HistoryItem) => {
    const params = new URLSearchParams({ type: item.type, query: item.query, replay: item.id });
    if (item.branch) params.set("branch", item.branch);
    if (item.period) params.set("period", item.period);
    router.push(`/query?${params.toString()}`);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1000px", margin: "0 auto", minHeight: "100%" }}>
      <div className="flex items-center gap-3 border-b pb-6" style={{ borderColor: "#2d2d4e" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)" }}>
          <History size={20} color="#fff" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>Query History</h1>
          <p className="mt-1 text-sm" style={{ color: "#94a3b8" }}>Past completed queries from this browser session. Select one to run it again.</p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl" style={{ backgroundColor: "#1a1a2e", border: "1px solid #2d2d4e" }}>
        <HistoryPanel history={history} isHydrated={isHydrated} onSelect={handleSelect} />
      </div>
    </div>
  );
}
