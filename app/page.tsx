"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Levels from "@/components/Levels";
import Footer from "@/components/Footer";
import ChatPanel from "@/components/ChatPanel";
import FadeIn from "@/components/FadeIn";

const EXAMPLE_PROMPT =
  "Génère une situation d'apprentissage en basketball pour une classe de 2ème AC";

export default function Home() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [examplePrompt, setExamplePrompt] = useState<string | undefined>();

  const scrollToChat = () => {
    const el = chatRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleStartChat = () => {
    setExamplePrompt(undefined);
    scrollToChat();
  };

  const handleSeeExample = () => {
    setExamplePrompt(EXAMPLE_PROMPT);
    scrollToChat();
  };

  return (
    <div className="bg-[#090909] min-h-screen">
      <Navbar />

      <Hero onStartChat={handleStartChat} onSeeExample={handleSeeExample} />

      <Features />
      <HowItWorks />

      <section id="chat" ref={chatRef} className="py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                Live
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Essayez maintenant.
              </h2>
              <p className="text-white/50 mt-4 text-sm">
                Posez votre question directement — la réponse est générée en temps réel.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <ChatPanel autoSendMessage={examplePrompt} />
          </FadeIn>
        </div>
      </section>

      <Levels />
      <Footer />
    </div>
  );
}
