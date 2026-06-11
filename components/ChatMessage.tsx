"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[90%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
        <article className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-h2:text-blue-600 prose-h3:text-gray-700 prose-p:text-sm prose-li:text-sm">
          {message.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          ) : (
            <span className="text-gray-400 text-sm">Génération en cours...</span>
          )}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-0.5 align-middle" />
          )}
        </article>
      </div>
    </div>
  );
}
