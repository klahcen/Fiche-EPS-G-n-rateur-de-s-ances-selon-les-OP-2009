"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
  dark?: boolean;
}

export default function ChatMessage({ message, isStreaming, dark }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div
          className={`max-w-[80%] rounded-2xl rounded-br-md px-4 py-3 ${
            dark
              ? "bg-blue-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div
        className={`max-w-[90%] rounded-2xl rounded-bl-md px-5 py-4 ${
          dark
            ? "bg-white/[0.04] border border-white/[0.08]"
            : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <article
          className={`prose prose-sm max-w-none ${
            dark
              ? "prose-invert prose-headings:text-white prose-h2:text-blue-400 prose-h3:text-blue-300 prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white"
              : "prose-headings:text-gray-800 prose-h2:text-blue-600 prose-h3:text-gray-700 prose-p:text-sm prose-li:text-sm"
          }`}
        >
          {message.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          ) : (
            <span className={`text-sm ${dark ? "text-white/40" : "text-gray-400"}`}>
              Génération en cours...
            </span>
          )}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-0.5 align-middle" />
          )}
        </article>
      </div>
    </div>
  );
}
