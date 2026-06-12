"use client";

import { AsteriskIcon } from "./AsteriskIcon";

export default function TypingIndicator() {
  return (
    <div
      style={{
        padding: "16px 0",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <div className="animate-pulse">
        <AsteriskIcon size={20} boxed={false} />
      </div>
      <span
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "14px",
          paddingTop: "2px",
        }}
      >
        En train de rédiger...
      </span>
    </div>
  );
}
