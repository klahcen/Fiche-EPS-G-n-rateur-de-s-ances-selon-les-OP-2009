"use client";

interface ImageAttachmentProps {
  src: string;
  alt: string;
  variant?: "preview" | "message";
}

export default function ImageAttachment({
  src,
  alt,
  variant = "message",
}: ImageAttachmentProps) {
  const isPreview = variant === "preview";

  return (
    <div
      className="overflow-hidden"
      style={{
        borderRadius: isPreview ? "8px" : "12px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        maxWidth: isPreview ? "140px" : "100%",
      }}
    >
      <button
        type="button"
        onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
        className="block w-full transition-opacity hover:opacity-90"
        style={{ cursor: "zoom-in", padding: isPreview ? "2px" : "6px" }}
        title="Cliquer pour agrandir"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={
            isPreview
              ? "w-[136px] h-[96px] object-contain rounded-md mx-auto"
              : "w-full max-w-[360px] max-h-[480px] object-contain rounded-lg mx-auto"
          }
          style={{ display: "block" }}
        />
      </button>
      {!isPreview && (
        <p
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            padding: "4px 8px 6px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {alt || "Capture d'écran"} · cliquer pour agrandir
        </p>
      )}
    </div>
  );
}
