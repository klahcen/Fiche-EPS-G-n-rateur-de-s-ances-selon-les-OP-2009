"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { AsteriskIcon } from "./AsteriskIcon";
import { chatTheme } from "./theme";
import { markdownComponents } from "./markdownComponents";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
}

function ActionBtn({
  onClick,
  label,
  children,
}: {
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="hover:bg-white/[0.07] transition-colors"
      style={{
        background: "transparent",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        color: "rgba(255,255,255,0.6)",
        width: "30px",
        height: "30px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

export default function ChatMessage({
  message,
  isStreaming,
  onCopy,
  onRegenerate,
}: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div
        style={{
          padding: "16px 0",
          borderBottom: `1px solid ${chatTheme.border}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              background: chatTheme.cardBg,
              border: `1px solid ${chatTheme.cardBorder}`,
              borderRadius: "18px",
              borderBottomRightRadius: "4px",
              padding: "10px 16px",
              maxWidth: "75%",
              fontSize: "15px",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.9)",
              whiteSpace: "pre-wrap",
            }}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: `1px solid ${chatTheme.border}`,
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, marginTop: "2px" }}>
          <AsteriskIcon size={20} boxed={false} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            {message.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            ) : null}
            {isStreaming && message.content && (
              <span
                className="inline-block w-1.5 h-4 ml-0.5 align-middle rounded-sm animate-pulse"
                style={{ background: chatTheme.accentLight }}
              />
            )}
          </div>

          {!isStreaming && message.content && (
            <div style={{ display: "flex", gap: "2px", marginTop: "10px", opacity: 0.4 }}>
              {onCopy && (
                <ActionBtn onClick={onCopy} label="Copier">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </ActionBtn>
              )}
              <ActionBtn label="Utile">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </ActionBtn>
              <ActionBtn label="Pas utile">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
              </ActionBtn>
              {onRegenerate && (
                <ActionBtn onClick={onRegenerate} label="Régénérer">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </ActionBtn>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
