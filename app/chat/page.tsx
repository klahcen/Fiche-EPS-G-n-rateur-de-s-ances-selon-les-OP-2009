"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatPanel from "@/components/ChatPanel";
import { chatTheme } from "@/components/chat/theme";

function ChatContent() {
  const searchParams = useSearchParams();
  const example = searchParams.get("example");
  const [chatKey, setChatKey] = useState(0);

  return (
    <div
      className="chat-page flex flex-col overflow-hidden"
      style={{
        height: "100dvh",
        background: chatTheme.bg,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <ChatPanel
        key={chatKey}
        onNewChat={() => setChatKey((k) => k + 1)}
        autoSendMessage={chatKey === 0 ? (example ?? undefined) : undefined}
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center text-white/40 text-sm"
          style={{ height: "100dvh", background: chatTheme.bg }}
        >
          Chargement...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
