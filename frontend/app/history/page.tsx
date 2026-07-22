import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-full"
      style={{ padding: "64px 32px", color: "#e2e8f0" }}
    >
      <div
        className="flex items-center justify-center rounded-2xl mb-6"
        style={{
          width: "72px",
          height: "72px",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          boxShadow: "0 0 32px rgba(245, 158, 11, 0.4)",
        }}
      >
        <History size={32} color="#fff" />
      </div>
      <h1 className="font-bold mb-3" style={{ fontSize: "28px" }}>
        Query History
      </h1>
      <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "400px", textAlign: "center" }}>
        Your past financial queries and analyses will appear here once the backend
        is connected and the audit log is active.
      </p>
      <div
        className="mt-8 rounded-xl px-6 py-3 font-semibold"
        style={{
          border: "1px dashed #3d3d6e",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        🚧 Coming in Phase B3
      </div>
    </div>
  );
}
