"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChatPanel from "@/components/ChatPanel";

function ChatContent() {
  const searchParams = useSearchParams();
  const example = searchParams.get("example");

  return (
    <div className="h-screen flex flex-col bg-[#090909]">
      <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/[0.06] bg-[#090909]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm hidden sm:inline">Accueil</span>
          </Link>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">Assistant EPS</span>
          </div>
        </div>
        <span className="text-xs text-white/30 font-mono hidden md:inline">OP 2009 · Sports collectifs</span>
      </header>

      <ChatPanel fullPage autoSendMessage={example ?? undefined} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#090909] flex items-center justify-center text-white/40 text-sm">
          Chargement...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
