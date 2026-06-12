"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

interface HeroProps {
  chatHref: string;
  exampleHref: string;
}

export default function Hero({ chatHref, exampleHref }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16 py-24 md:py-32">
      <div
        className="absolute pointer-events-none w-72 h-48 md:w-[600px] md:h-[400px]"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center md:text-left w-full">
        <FadeIn>
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 md:mb-8">
            Outil pédagogique · OP 2009 Maroc
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-5 md:mb-6">
            Générez vos situations
            <br />
            d&apos;apprentissage EPS
            <br />
            <span className="text-blue-400">en quelques secondes.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-base md:text-xl text-white/50 max-w-xl mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed">
            Un assistant IA spécialisé en EPS collégiale marocaine. Situations d&apos;apprentissage
            structurées, conformes aux Orientations Pédagogiques 2009.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-12 md:mb-16 max-w-md md:max-w-none mx-auto md:mx-0">
            <Link
              href={chatHref}
              className="bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white px-6 py-3.5 rounded-xl font-medium transition-all w-full md:w-auto text-center"
            >
              Démarrer le chat →
            </Link>
            <Link
              href={exampleHref}
              className="border border-white/20 text-white/70 hover:border-white/40 hover:text-white active:scale-[0.98] px-6 py-3.5 rounded-xl font-medium transition-all w-full md:w-auto text-center"
            >
              Voir un exemple
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-sm text-white/30">
            {["Sports collectifs", "Athlétisme", "Gymnastique", "Sports de renvoi"].map(
              (sport, i) => (
                <span key={sport} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/15">·</span>}
                  {sport}
                </span>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
