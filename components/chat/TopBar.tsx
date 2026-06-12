"use client";

import { useRouter } from "next/navigation";

interface TopBarProps {
  hasMessages: boolean;
  onNewChat: () => void;
}

export default function TopBar({ hasMessages, onNewChat }: TopBarProps) {
  const router = useRouter();

  return (
    <div
      className="safe-area-top flex-shrink-0"
      style={{
        height: "48px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {hasMessages ? (
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.5)",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Retour"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Accueil</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="hover:bg-white/[0.06] transition-colors"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          padding: "6px 10px",
          borderRadius: "8px",
        }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span className="hidden sm:inline">Nouveau</span>
      </button>
    </div>
  );
}
