import type { CSSProperties } from "react";
import { chatTheme } from "./theme";

export function ChatBrandIcon({
  size = 28,
  className = "",
  style,
  boxed = true,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  boxed?: boolean;
}) {
  const iconSize = boxed ? size * 0.5 : size;

  const icon = (
    <svg
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      style={{ color: chatTheme.accentLight, flexShrink: 0, ...style }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  if (!boxed) return icon;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: chatTheme.accentBg,
        border: `1px solid ${chatTheme.accentBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}

/** @deprecated Use ChatBrandIcon — kept as alias for existing imports */
export const AsteriskIcon = ChatBrandIcon;

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}
