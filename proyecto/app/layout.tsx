import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semáforo de Entregas",
  description: "Controla tus fechas límite",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <header style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#111",
          borderTop: "1px solid #222",
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "12px 24px",
          zIndex: 100,
        }}>
          <Link href="/" style={{
            color: "#fff",
            background: "#1a1a1a",
            border: "1px solid #333",
            padding: "10px 28px",
            borderRadius: 8,
            textDecoration: "none",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            fontWeight: 700,
          }}>
            🚦 Entregas
          </Link>
          <Link href="/agregar" style={{
            color: "#000",
            background: "#fff",
            padding: "10px 28px",
            borderRadius: 8,
            textDecoration: "none",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            fontWeight: 700,
          }}>
            + Agregar
          </Link>
        </header>
        
      </body>
    </html>
  );
}