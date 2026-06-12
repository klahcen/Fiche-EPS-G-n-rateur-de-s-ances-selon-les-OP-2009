import FadeIn from "./FadeIn";

const STEPS = [
  {
    number: "01",
    title: "Posez votre question",
    description: "Décrivez le sport, le niveau (1AC/2AC/3AC) et vos besoins",
  },
  {
    number: "02",
    title: "L'IA génère",
    description: "Structure complète générée en temps réel, section par section",
  },
  {
    number: "03",
    title: "Utilisez en classe",
    description: "Copiez, imprimez ou adaptez selon votre contexte",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 md:py-32 px-4 sm:px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              Simple
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight px-2">
              De la question à la fiche en 3 étapes.
            </h2>
          </div>
        </FadeIn>

        {/* Mobile: vertical steps */}
        <div className="md:hidden max-w-md mx-auto">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm font-mono flex-shrink-0">
                    {step.number}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 my-2 min-h-[2rem]" />
                  )}
                </div>
                <div className={`flex-1 ${i < STEPS.length - 1 ? "pb-8" : "pb-2"}`}>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop: horizontal steps */}
        <div className="hidden md:block relative">
          <div className="absolute top-6 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 120}>
                <div className="text-center relative">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="text-blue-400 font-mono text-sm font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
