import FadeIn from "./FadeIn";

const FEATURES = [
  {
    icon: "🎯",
    title: "Objectif pédagogique",
    description: "Verbe d'action + condition + finalité + critère, conforme OP 2009",
  },
  {
    icon: "⚙️",
    title: "Conditions de réalisation",
    description: "Temps, espace, effectif avec rôles, déroulement détaillé",
  },
  {
    icon: "✅",
    title: "Critères de réussite",
    description: "Indicateurs qualitatifs ET quantitatifs pour évaluer l'élève",
  },
  {
    icon: "📊",
    title: "PB / NPB / DEF",
    description: "Comportements attendus selon le rôle de chaque joueur",
  },
  {
    icon: "🔧",
    title: "Critères de réalisation",
    description: "Description technique précise du geste attendu",
  },
  {
    icon: "📋",
    title: "Consignes & Sécurité",
    description: "Organisation claire et règles de sécurité pour la classe",
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              Structure complète
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight px-2">
              Chaque situation, parfaitement structurée.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 80}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200 h-full">
                <span className="text-2xl mb-3 md:mb-4 block">{feature.icon}</span>
                <h3 className="text-base font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
