/**
 * ============================================
 * Root Layout — S.O.S Canadá & Mundo dos Vistos
 * ============================================
 *
 * Layout global da aplicação:
 *   - Fontes: Outfit (títulos) + Inter (corpo) via Google Fonts
 *   - Navegação fixa no topo
 *   - Footer institucional
 *   - Botão flutuante de WhatsApp
 *   - CSS do Leaflet (mapas)
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Fonte para títulos — moderna e impactante */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/** Fonte para corpo de texto — legibilidade máxima */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "S.O.S Canadá & Mundo dos Vistos — Assessoria de Vistos",
  description:
    "A melhor assessoria de vistos do Brasil. Certificação ISO 9001, 95% de aprovação. Vistos para Canadá, EUA e mais de 50 países.",
  icons: {
    icon: "/logo-sos-canada.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        {/* CSS do Leaflet para o mapa interativo */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
        {/* Botão flutuante de WhatsApp — sempre visível */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
