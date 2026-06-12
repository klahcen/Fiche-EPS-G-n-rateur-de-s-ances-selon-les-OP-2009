"use client";

import { useRef } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  dark?: boolean;
}

export default function ChatInput({ value, onChange, onSubmit, disabled, dark }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div
      className={`px-4 py-4 ${
        dark ? "border-t border-white/[0.06] bg-white/[0.02]" : "border-t border-gray-200 bg-white"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="max-w-3xl mx-auto flex items-end gap-3"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Décrivez la situation d'apprentissage souhaitée..."
          rows={1}
          disabled={disabled}
          className={`flex-1 resize-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 max-h-[120px] ${
            dark
              ? "bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30"
              : "border border-gray-300 focus:ring-blue-600 focus:border-transparent"
          }`}
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="flex-shrink-0 w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 text-white rounded-xl flex items-center justify-center transition-colors"
        >
          {disabled ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
