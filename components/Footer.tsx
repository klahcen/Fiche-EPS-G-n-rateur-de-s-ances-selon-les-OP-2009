export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090909]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
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

          <div>
            <h4 className="text-white/70 text-sm font-medium mb-4">Sports</h4>
            <ul className="space-y-2">
              {["Basketball", "Handball", "Football", "Volleyball"].map((s) => (
                <li key={s}>
                  <span className="text-white/40 text-sm hover:text-white/60 transition-colors cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/70 text-sm font-medium mb-4">Niveaux</h4>
            <ul className="space-y-2">
              {["1ère AC", "2ème AC", "3ème AC"].map((n) => (
                <li key={n}>
                  <span className="text-white/40 text-sm hover:text-white/60 transition-colors cursor-default">
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/70 text-sm font-medium mb-4">Ressources</h4>
            <ul className="space-y-2">
              {["OP 2009", "OTI par niveau", "Fiche de séance"].map((r) => (
                <li key={r}>
                  <span className="text-white/40 text-sm hover:text-white/60 transition-colors cursor-default">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 EPS OP2009 Assistant · Outil non officiel
          </p>
          <p className="text-white/20 text-xs font-mono">
            Orientations Pédagogiques 2009 — Royaume du Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
