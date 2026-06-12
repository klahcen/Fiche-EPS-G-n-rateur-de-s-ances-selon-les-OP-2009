export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090909]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          <div className="md:col-span-1 text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-semibold text-white text-sm">EPS OP2009</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Assistant IA pour enseignants d&apos;EPS au collège marocain.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white/70 text-sm font-medium mb-3 md:mb-4">Sports</h4>
            <ul className="space-y-2">
              {["Basketball", "Handball", "Football", "Volleyball"].map((s) => (
                <li key={s}>
                  <span className="text-white/40 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white/70 text-sm font-medium mb-3 md:mb-4">Niveaux</h4>
            <ul className="space-y-2">
              {["1ère AC", "2ème AC", "3ème AC"].map((n) => (
                <li key={n}>
                  <span className="text-white/40 text-sm">{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white/70 text-sm font-medium mb-3 md:mb-4">Ressources</h4>
            <ul className="space-y-2">
              {["OP 2009", "OTI par niveau", "Fiche de séance"].map((r) => (
                <li key={r}>
                  <span className="text-white/40 text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-2 text-center">
          <p className="text-white/30 text-sm">
            © 2025 EPS OP2009 Assistant · Outil non officiel
          </p>
          <p className="text-white/20 text-sm font-mono">
            Orientations Pédagogiques 2009 — Royaume du Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
