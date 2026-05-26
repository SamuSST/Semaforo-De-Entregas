import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import SWRegistration from "./SWRegistration";

export const metadata: Metadata = {
  title: "Semáforo de Entregas",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
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
        {children}
        <SWRegistration />
      </body>
    </html>
  );
}