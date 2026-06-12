"use client";

import { useEffect, useRef } from "react";
import { chatTheme } from "./theme";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import InputCard from "./InputCard";

interface ChatViewProps {
  messages: ChatMessageType[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isLoading: boolean;
  showTyping: boolean;
  onCopy: (content: string) => void;
  onRegenerate: (index: number) => void;
  attachments?: ChatMessageType["attachments"];
  onAddFiles?: (files: FileList) => void;
  onRemoveAttachment?: (id: string) => void;
  attachError?: string | null;
  isExtracting?: boolean;
}

export default function ChatView({
  messages,
  input,
  setInput,
  onSend,
  isLoading,
  showTyping,
  onCopy,
  onRegenerate,
  attachments,
  onAddFiles,
  onRemoveAttachment,
  attachError,
  isExtracting,
}: ChatViewProps) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, showTyping]);

  return (
    <>
      <div
        ref={messagesRef}
        className="flex-1 min-h-0 overflow-y-auto chat-messages"
        style={{
          padding: "8px 0 16px",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "720px" }}
        >
          {messages.map((message, i) => {
            if (showTyping && message.id === lastMessage?.id) return null;
            return (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={
                  isLoading &&
                  message.role === "assistant" &&
                  message.id === lastMessage?.id
                }
                onCopy={() => onCopy(message.content)}
                onRegenerate={
                  message.role === "assistant"
                    ? () => onRegenerate(i)
                    : undefined
                }
              />
            );
          })}
          {showTyping && <TypingIndicator />}
        </div>
      </div>

      <div
        className="flex-shrink-0 safe-area-bottom"
        style={{
          padding: "8px 16px 12px",
          background: chatTheme.bg,
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "720px" }}>
          <InputCard
            value={input}
            onChange={setInput}
            onSend={onSend}
            disabled={isLoading}
            placeholder="Continuez la conversation..."
            attachments={attachments}
            onAddFiles={onAddFiles}
            onRemoveAttachment={onRemoveAttachment}
            isExtracting={isExtracting}
          />
          {isExtracting && (
            <p className="text-white/40 text-xs mt-1 text-center">Extraction du fichier...</p>
          )}
          {attachError && (
            <p className="text-red-400 text-xs mt-1 text-center">{attachError}</p>
          )}
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "rgba(255,255,255,0.18)",
              margin: "6px 0 0",
            }}
          >
            L&apos;IA peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </>
  );
}
