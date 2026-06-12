import FadeIn from "./FadeIn";

const LEVELS = [
  {
    badge: "1ère AC",
    oti: "L'élève doit acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
    focus: "Motricité · Intégration au groupe",
  },
  {
    badge: "2ème AC",
    oti: "L'élève doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et s'accoutumer à commander et à être commandé pour réaliser différents rôles.",
    focus: "Énergie · Coopération · Rôles",
  },
  {
    badge: "3ème AC",
    oti: "L'élève doit pouvoir ajuster les éléments de l'acte moteur et l'adaptation aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
    focus: "Acte moteur · Projet sportif",
  },
];

export default function Levels() {
  return (
    <section id="niveaux" className="py-20 md:py-32 px-4 sm:px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              OP 2009
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight px-2">
              Adapté aux 3 niveaux.
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm md:text-base px-2">
              Objectifs Terminaux d&apos;Intégration officiels selon les Orientations Pédagogiques 2009.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVELS.map((level, i) => (
            <FadeIn key={level.badge} delay={i * 100}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200 h-full flex flex-col w-full">
                <span className="inline-block self-start text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 font-medium">
                  {level.badge}
                </span>
                <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4 line-clamp-3">
                  {level.oti}
                </p>
                <p className="text-white/30 text-xs font-mono">{level.focus}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
