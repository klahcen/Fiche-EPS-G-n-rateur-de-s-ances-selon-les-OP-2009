"use client";

import { useEffect, useRef, useState } from "react";
import { FILE_ACCEPT } from "@/lib/attachments";
import { chatTheme } from "./theme";

interface AttachMenuProps {
  onFilesSelected: (files: FileList) => void;
  disabled?: boolean;
  compact?: boolean;
}

export default function AttachMenu({
  onFilesSelected,
  disabled,
  compact = false,
}: AttachMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        if (!disabled) inputRef.current?.click();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFilesSelected(e.target.files);
      e.target.value = "";
      setOpen(false);
    }
  };

  const shortcut = typeof navigator !== "undefined" && /Mac/.test(navigator.platform)
    ? "⌘U"
    : "Ctrl+U";

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="file"
        accept={FILE_ACCEPT}
        multiple
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="transition-colors hover:bg-white/[0.08]"
        style={{
          background: open ? "rgba(255,255,255,0.08)" : "transparent",
          border: compact ? "none" : `1px solid ${chatTheme.borderStrong}`,
          borderRadius: compact ? "8px" : "8px",
          padding: compact ? "6px" : "5px 10px",
          color: "rgba(255,255,255,0.5)",
          fontSize: "13px",
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          opacity: disabled ? 0.4 : 1,
        }}
        aria-label="Ajouter des fichiers"
        aria-expanded={open}
      >
        <svg width={compact ? 20 : 14} height={compact ? 20 : 14} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {!compact && <span>Ajouter</span>}
      </button>

      {open && (
        <div
          className="absolute left-0 z-50"
          style={{
            bottom: compact ? "calc(100% + 8px)" : "calc(100% + 8px)",
            minWidth: "260px",
            background: "#2a2a2a",
            border: `1px solid ${chatTheme.borderStrong}`,
            borderRadius: "12px",
            padding: "6px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/[0.08] text-left"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/70 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span style={{ flex: 1, fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
              Ajouter des fichiers ou photos
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{shortcut}</span>
          </button>
        </div>
      )}
    </div>
  );
}
