"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { parseApiError } from "@/lib/errors";
import { ChatMessage as ChatMessageType } from "@/lib/types";

const WELCOME_MESSAGE =
  "Bonjour ! Je suis votre assistant EPS. Demandez-moi une situation d'apprentissage en sport collectif — précisez le sport si possible (basketball, handball, football, volleyball...) ou posez-moi n'importe quelle question sur la pédagogie EPS.";

function generateId() {
  return Math.random().toString(36).slice(2);
}

interface ChatPanelProps {
  autoSendMessage?: string;
}

export default function ChatPanel({ autoSendMessage }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const autoSentRef = useRef<string | null>(null);

  const scrollChatToBottom = (smooth = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    if (smooth) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleMessagesScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    userScrolledUp.current = distanceFromBottom > 80;
  };

  useEffect(() => {
    if (!userScrolledUp.current) {
      scrollChatToBottom(isStreaming ? false : true);
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    if (autoSendMessage && autoSendMessage !== autoSentRef.current && !isStreaming) {
      autoSentRef.current = autoSendMessage;
      sendMessage(autoSendMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSendMessage]);

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isStreaming) return;

    const userMessage: ChatMessageType = {
      id: generateId(),
      role: "user",
      content: trimmed,
    };

    const assistantId = generateId();
    const history = messages.filter((m) => m.id !== "welcome");
    const updatedMessages = [...history, userMessage];

    userScrolledUp.current = false;
    setMessages([
      ...messages,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la génération");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Flux de réponse indisponible");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.text }
                    : m
                )
              );
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
    } catch (error) {
      const raw = error instanceof Error ? error.message : "Une erreur est survenue";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `⚠️ **${parseApiError(raw)}**` }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleNewChat = () => {
    if (isStreaming) return;
    userScrolledUp.current = false;
    setMessages([{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }]);
    setInput("");
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex flex-col h-[600px] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/[0.06]">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-white/40 ml-2 font-mono">assistant-eps · OP 2009</span>
        </div>
        <button
          type="button"
          onClick={handleNewChat}
          disabled={isStreaming}
          className="text-xs text-white/40 hover:text-white/70 disabled:opacity-40 transition-colors"
        >
          Nouvelle conversation
        </button>
      </div>

      <div
        ref={messagesContainerRef}
        onScroll={handleMessagesScroll}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-4 py-4 chat-scrollbar"
      >
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              dark
              isStreaming={
                isStreaming &&
                message.role === "assistant" &&
                message.id === lastMessage?.id
              }
            />
          ))}
        </div>
      </div>

      <ChatInput
        dark
        value={input}
        onChange={setInput}
        onSubmit={() => sendMessage()}
        disabled={isStreaming}
      />
    </div>
  );
}
