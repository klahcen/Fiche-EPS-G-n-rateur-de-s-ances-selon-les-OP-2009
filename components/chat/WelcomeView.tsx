"use client";

import { ChatAttachment } from "@/lib/types";
import { AsteriskIcon, getGreeting } from "./AsteriskIcon";
import InputCard from "./InputCard";
import { chatTheme } from "./theme";

const SUGGESTIONS = [
  {
    label: "Basketball 2AC",
    query: "Génère une situation d'apprentissage en basketball pour 2ème AC — marquage démarquage",
  },
  {
    label: "Football 1AC",
    query: "Génère une situation d'apprentissage en football pour 1ère AC — passe et déplacement",
  },
  {
    label: "Handball 3AC",
    query: "Génère une situation d'apprentissage en handball pour 3ème AC — projet collectif",
  },
  {
    label: "Athlétisme",
    query: "Génère une situation d'apprentissage en athlétisme — course de vitesse 2AC",
  },
];

interface WelcomeViewProps {
  input: string;
  setInput: (v: string) => void;
  onSend: (text?: string) => void;
  isLoading: boolean;
  attachments?: ChatAttachment[];
  onAddFiles?: (files: FileList) => void;
  onRemoveAttachment?: (id: string) => void;
  attachError?: string | null;
  isExtracting?: boolean;
}

export default function WelcomeView({
  input,
  setInput,
  onSend,
  isLoading,
  attachments,
  onAddFiles,
  onRemoveAttachment,
  attachError,
  isExtracting,
}: WelcomeViewProps) {
  const greeting = getGreeting();

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 gap-6 overflow-y-auto">
      <div
        className="absolute pointer-events-none"
        style={{
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: `radial-gradient(ellipse, ${chatTheme.accentGlow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-2.5 mb-2">
        <AsteriskIcon size={32} />
        <h1
          style={{
            fontSize: "clamp(22px, 5vw, 32px)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {greeting} 👋
        </h1>
      </div>

      <div className="relative w-full max-w-[680px]">
        <InputCard
          value={input}
          onChange={setInput}
          onSend={() => onSend()}
          disabled={isLoading}
          placeholder="Comment puis-je vous aider ?"
          rows={2}
          minHeight={52}
          maxHeight={200}
          showExtras
          attachments={attachments}
          onAddFiles={onAddFiles}
          onRemoveAttachment={onRemoveAttachment}
          isExtracting={isExtracting}
        />
        {isExtracting && (
          <p className="text-white/40 text-xs mt-2 text-center">Extraction du fichier...</p>
        )}
        {attachError && (
          <p className="text-red-400 text-xs mt-2 text-center">{attachError}</p>
        )}
      </div>

      <div className="relative flex flex-wrap gap-2 justify-center w-full max-w-[680px]">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onSend(s.query)}
            className="transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
            style={{
              background: chatTheme.cardBg,
              border: `1px solid ${chatTheme.cardBorder}`,
              borderRadius: "20px",
              padding: "8px 16px",
              color: chatTheme.textMuted,
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
