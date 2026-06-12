import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EPS OP2009 — Assistant Situations d'apprentissage",
  description:
    "Assistant IA spécialisé en EPS collégiale marocaine. Générez des situations d'apprentissage conformes aux OP 2009.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
