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

export default function Home() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: ChatMessageType = {
      id: generateId(),
      role: "user",
      content: trimmed,
    };

    const assistantId = generateId();
    const history = messages.filter((m) => m.id !== "welcome");
    const updatedMessages = [...history, userMessage];

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
    setMessages([{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }]);
    setInput("");
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white px-6 py-3 shadow-md flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold">Assistant EPS — Sports Collectifs</h1>
          <p className="text-blue-100 text-xs">Situations d&apos;apprentissage · OP 2009</p>
        </div>
        <button
          type="button"
          onClick={handleNewChat}
          disabled={isStreaming}
          className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 rounded-lg transition-colors"
        >
          Nouvelle conversation
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreaming={
                isStreaming &&
                message.role === "assistant" &&
                message.id === lastMessage?.id
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={sendMessage}
        disabled={isStreaming}
      />
    </div>
  );
}
