import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2
      style={{
        fontSize: "16px",
        fontWeight: 600,
        color: "white",
        margin: "24px 0 10px",
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      style={{
        fontSize: "15px",
        fontWeight: 600,
        color: "rgba(255,255,255,0.95)",
        margin: "20px 0 8px",
        paddingBottom: "6px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </h3>
  ),
  strong: ({ children }) => (
    <strong style={{ color: "white", fontWeight: 600 }}>{children}</strong>
  ),
  p: ({ children }) => (
    <p style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.82)" }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: "18px", margin: "6px 0 12px", listStyleType: "disc" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: "18px", margin: "6px 0 12px" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li
      style={{
        marginBottom: "5px",
        color: "rgba(255,255,255,0.78)",
        fontSize: "14px",
        lineHeight: 1.6,
      }}
    >
      {children}
    </li>
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        margin: "14px 0",
      }}
    />
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: "8px",
            padding: "12px 16px",
            overflowX: "auto",
            fontSize: "13px",
            fontFamily: "monospace",
            color: "#86efac",
            border: "1px solid rgba(255,255,255,0.07)",
            margin: "10px 0",
          }}
        >
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code
        style={{
          background: "rgba(255,255,255,0.08)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "13px",
          fontFamily: "monospace",
          color: "#93c5fd",
        }}
      >
        {children}
      </code>
    );
  },
};
