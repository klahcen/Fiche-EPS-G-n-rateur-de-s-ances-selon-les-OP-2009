"use client";

import { useState } from "react";
import ChatPanel from "@/components/ChatPanel";

export default function Home() {
  const [chatKey, setChatKey] = useState(0);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white px-6 py-3 shadow-md flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold">Assistant EPS</h1>
          <p className="text-blue-100 text-xs">
            Orientations Pédagogiques 2009 — Cycle Collégial Marocain
          </p>
        </div>
        <button
          type="button"
          onClick={() => setChatKey((k) => k + 1)}
          className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle conversation
        </button>
      </header>

      <main className="flex-1 overflow-hidden">
        <ChatPanel key={chatKey} />
      </main>
    </div>
  );
}
