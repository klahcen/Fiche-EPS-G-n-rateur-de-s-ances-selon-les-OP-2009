"use client";

import { ChatAttachment } from "@/lib/types";
import { attachmentDataUrl, isDocumentAttachment, isImageAttachment } from "@/lib/attachments";
import { chatTheme } from "./theme";
import ImageAttachment from "./ImageAttachment";

interface AttachmentPreviewProps {
  attachments: ChatAttachment[];
  onRemove: (id: string) => void;
}

function DocumentChip({ name, type }: { name: string; type: string }) {
  const isPdf = type === "application/pdf" || name.toLowerCase().endsWith(".pdf");
  const isDocx =
    type.includes("wordprocessingml") || name.toLowerCase().endsWith(".docx");

  return (
    <div
      className="flex items-center gap-2 px-3 py-2"
      style={{ minWidth: "120px", maxWidth: "180px" }}
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
        style={{
          background: isPdf
            ? "rgba(239,68,68,0.15)"
            : isDocx
              ? "rgba(59,130,246,0.15)"
              : "rgba(255,255,255,0.08)",
        }}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={isPdf ? "text-red-400" : isDocx ? "text-blue-400" : "text-white/50"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <span className="truncate text-xs text-white/70" title={name}>
        {name}
      </span>
    </div>
  );
}

export default function AttachmentPreview({ attachments, onRemove }: AttachmentPreviewProps) {
  if (!attachments.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pb-1">
      {attachments.map((att) => (
        <div
          key={att.id}
          className="relative group"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${chatTheme.borderStrong}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {isImageAttachment(att) && att.data ? (
            <ImageAttachment src={attachmentDataUrl(att)} alt={att.name} variant="preview" />
          ) : isDocumentAttachment(att) ? (
            <DocumentChip name={att.name} type={att.type} />
          ) : null}

          <button
            type="button"
            onClick={() => onRemove(att.id)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
            style={{ background: "#444", border: "1px solid rgba(255,255,255,0.15)" }}
            aria-label={`Retirer ${att.name}`}
          >
            <span className="text-white/80 text-xs leading-none">×</span>
          </button>
        </div>
      ))}
    </div>
  );
}
