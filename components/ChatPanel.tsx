"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import TopBar from "@/components/chat/TopBar";
import WelcomeView from "@/components/chat/WelcomeView";
import ChatView from "@/components/chat/ChatView";
import { chatTheme } from "@/components/chat/theme";
import { filesToAttachments, revokeAttachmentPreviews } from "@/lib/attachments";
import { parseApiError } from "@/lib/errors";
import { ChatAttachment, ChatMessage as ChatMessageType } from "@/lib/types";

function generateId() {
  return Math.random().toString(36).slice(2);
}

interface ChatPanelProps {
  autoSendMessage?: string;
  onNewChat?: () => void;
}

export default function ChatPanel({ autoSendMessage, onNewChat }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [attachError, setAttachError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const autoSentRef = useRef<string | null>(null);
  const messagesRef = useRef(messages);
  const inputRef = useRef(input);
  const attachmentsRef = useRef(attachments);
  const isStreamingRef = useRef(isStreaming);

  messagesRef.current = messages;
  inputRef.current = input;
  attachmentsRef.current = attachments;
  isStreamingRef.current = isStreaming;

  const hasMessages = messages.length > 0;

  const handleAddFiles = useCallback(async (files: FileList) => {
    try {
      setAttachError(null);
      setIsExtracting(true);
      const added = await filesToAttachments(files);
      setAttachments((prev) => [...prev, ...added].slice(0, 5));
    } catch (error) {
      setAttachError(error instanceof Error ? error.message : "Erreur lors de l'ajout du fichier");
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const handleRemoveAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((a) => a.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const sendMessage = useCallback(
    async (text?: string, overrideAttachments?: ChatAttachment[]) => {
      const trimmed = (text ?? inputRef.current).trim();
      const currentAttachments = overrideAttachments ?? attachmentsRef.current;
      if ((!trimmed && !currentAttachments.length) || isStreamingRef.current) return;

      const storedAttachments = currentAttachments.map(
        ({ id, name, type, kind, data, extractedText }) => ({
          id,
          name,
          type,
          kind,
          ...(data ? { data } : {}),
          ...(extractedText ? { extractedText } : {}),
        })
      );

      const userMessage: ChatMessageType = {
        id: generateId(),
        role: "user",
        content: trimmed,
        attachments: storedAttachments.length ? storedAttachments : undefined,
      };

      const assistantId = generateId();
      const updatedMessages = [...messagesRef.current, userMessage];

      if (!overrideAttachments) {
        revokeAttachmentPreviews(attachmentsRef.current);
        setAttachments([]);
      }
      setInput("");
      setAttachError(null);
      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setIsStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
              attachments: m.attachments,
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
    },
    []
  );

  const regenerateFromIndex = useCallback(
    (assistantIndex: number) => {
      if (isStreamingRef.current) return;
      const msgs = messagesRef.current;
      let userMsg: ChatMessageType | null = null;
      for (let i = assistantIndex - 1; i >= 0; i--) {
        if (msgs[i].role === "user") {
          userMsg = msgs[i];
          break;
        }
      }
      if (!userMsg) return;
      setMessages(msgs.slice(0, assistantIndex));
      sendMessage(userMsg.content, userMsg.attachments);
    },
    [sendMessage]
  );

  useEffect(() => {
    if (
      autoSendMessage &&
      autoSendMessage !== autoSentRef.current &&
      !isStreamingRef.current
    ) {
      autoSentRef.current = autoSendMessage;
      sendMessage(autoSendMessage);
    }
  }, [autoSendMessage, sendMessage]);

  useEffect(() => {
    return () => revokeAttachmentPreviews(attachmentsRef.current);
  }, []);

  const lastMessage = messages[messages.length - 1];
  const showTyping =
    isStreaming &&
    lastMessage?.role === "assistant" &&
    !lastMessage.content;

  const attachmentProps = {
    attachments,
    onAddFiles: handleAddFiles,
    onRemoveAttachment: handleRemoveAttachment,
    attachError,
    isExtracting,
  };

  return (
    <div
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
      style={{
        background: chatTheme.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <TopBar hasMessages={hasMessages} onNewChat={() => onNewChat?.()} />

      {!hasMessages && !showTyping ? (
        <WelcomeView
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          isLoading={isStreaming}
          {...attachmentProps}
        />
      ) : (
        <ChatView
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={() => sendMessage()}
          isLoading={isStreaming}
          showTyping={showTyping}
          onCopy={(content) => navigator.clipboard.writeText(content)}
          onRegenerate={regenerateFromIndex}
          {...attachmentProps}
        />
      )}
    </div>
  );
}
