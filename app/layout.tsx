import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assistant EPS — OP 2009",
  description:
    "Chatbot pédagogique EPS pour enseignants du collège marocain, basé sur les Orientations Pédagogiques 2009.",
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
