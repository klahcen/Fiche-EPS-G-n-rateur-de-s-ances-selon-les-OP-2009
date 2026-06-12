"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Levels from "@/components/Levels";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const EXAMPLE_PROMPT =
  "Génère une situation d'apprentissage en basketball pour une classe de 2ème AC";

export default function Home() {
  const exampleHref = `/chat?example=${encodeURIComponent(EXAMPLE_PROMPT)}`;

  return (
    <div className="bg-[#090909] min-h-screen">
      <Navbar />

      <Hero chatHref="/chat" exampleHref={exampleHref} />

      <Features />
      <HowItWorks />

      <section className="py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              Prêt à commencer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Ouvrez le chat et générez.
            </h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              Une page dédiée pour vos conversations — comme un assistant personnel EPS.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-medium transition-all"
            >
              Ouvrir le chat
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Levels />
      <Footer />
    </div>
  );
}
