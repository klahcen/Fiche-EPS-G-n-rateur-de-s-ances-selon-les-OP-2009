"use client";

import { chatTheme } from "./theme";

interface InputCardProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  minHeight?: number;
  maxHeight?: number;
  showExtras?: boolean;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window;
}

export default function InputCard({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = "Comment puis-je vous aider ?",
  rows = 1,
  minHeight = 24,
  maxHeight = 120,
  showExtras = false,
}: InputCardProps) {
  const canSend = value.trim().length > 0 && !disabled;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isTouchDevice()) {
      e.preventDefault();
      if (canSend) onSend();
    }
  };

  return (
    <div
      style={{
        background: chatTheme.cardBg,
        border: `1px solid ${chatTheme.cardBorder}`,
        borderRadius: "16px",
        padding: showExtras ? "16px" : "12px 14px 10px",
        display: "flex",
        flexDirection: "column",
        gap: showExtras ? "12px" : "10px",
      }}
    >
      <textarea
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        inputMode="text"
        enterKeyHint="send"
        rows={rows}
        disabled={disabled}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "16px",
          lineHeight: showExtras ? "1.6" : "1.5",
          resize: "none",
          width: "100%",
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
          fontFamily: "inherit",
          caretColor: chatTheme.accentLight,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {showExtras ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              style={{
                background: "transparent",
                border: `1px solid ${chatTheme.borderStrong}`,
                borderRadius: "8px",
                padding: "5px 10px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Ajouter</span>
            </button>
            <div
              style={{
                background: "rgba(59, 130, 246, 0.1)",
                border: `1px solid ${chatTheme.accentBorder}`,
                borderRadius: "8px",
                padding: "5px 10px",
                color: "rgba(255,255,255,0.35)",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Haiku 4.5</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span style={{ color: chatTheme.accentLight, fontSize: "11px" }}>Rapide</span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.3)",
              display: "flex",
              padding: "2px",
            }}
            aria-label="Ajouter"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          style={{
            width: showExtras ? "36px" : "34px",
            height: showExtras ? "36px" : "34px",
            borderRadius: "50%",
            background: canSend ? chatTheme.accent : "rgba(255,255,255,0.06)",
            border: "none",
            cursor: canSend ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: canSend ? "white" : "rgba(255,255,255,0.2)",
            transition: "all 0.15s ease",
            flexShrink: 0,
          }}
          aria-label="Envoyer"
        >
          {disabled ? (
            <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
