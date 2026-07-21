import { MessageSquare } from "lucide-react";

export default function QueryConsolePage() {
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
          background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
          boxShadow: "0 0 32px rgba(124, 58, 237, 0.4)",
        }}
      >
        <MessageSquare size={32} color="#fff" />
      </div>
      <h1 className="font-bold mb-3" style={{ fontSize: "28px" }}>
        Query Console
      </h1>
      <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "400px", textAlign: "center" }}>
        The AI-powered query interface is coming in Phase B2. You&apos;ll be able to ask
        any financial question in plain English.
      </p>
      <div
        className="mt-8 rounded-xl px-6 py-3 font-semibold"
        style={{
          border: "1px dashed #3d3d6e",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        🚧 Coming in Phase B2
      </div>
    </div>
  );
}
