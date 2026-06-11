import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assistant EPS — Situations d'apprentissage",
  description:
    "Chatbot EPS spécialisé dans la génération de situations d'apprentissage en sports collectifs (OP 2009).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
