"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Entrega = {
  id: string;
  materia: string;
  descripcion: string;
  fecha: string;
};

function getEstado(fecha: string): "vencida" | "roja" | "amarilla" | "verde" {
  const ahora = new Date();
  const limite = new Date(fecha);
  const diff = (limite.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "vencida";
  if (diff < 2) return "roja";
  if (diff < 5) return "amarilla";
  return "verde";
}

function getDiasRestantes(fecha: string): string {
  const ahora = new Date();
  const limite = new Date(fecha);
  const diff = (limite.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "Venció";
  if (diff < 1) return "Hoy";
  if (diff < 2) return "Mañana";
  return `${Math.ceil(diff)}d`;
}

const COLORES = {
  verde:    { bg: "#0f2e1a", border: "#22c55e", dot: "#22c55e", badge: "#166534", text: "#4ade80" },
  amarilla: { bg: "#2e2100", border: "#eab308", dot: "#eab308", badge: "#854d0e", text: "#fde047" },
  roja:     { bg: "#2e0a0a", border: "#ef4444", dot: "#ef4444", badge: "#991b1b", text: "#f87171" },
  vencida:  { bg: "#1a1a1a", border: "#555",    dot: "#555",    badge: "#333",    text: "#888"    },
};

const LABELS = {
  verde:    "Al día",
  amarilla: "Pronto",
  roja:     "¡Urgente!",
  vencida:  "Vencida",
};

export default function Home() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("entregas");
    if (stored) setEntregas(JSON.parse(stored));
  }, []);

  const eliminar = (id: string) => {
    const nuevas = entregas.filter((e) => e.id !== id);
    setEntregas(nuevas);
    localStorage.setItem("entregas", JSON.stringify(nuevas));
  };

  const ordenadas = [...entregas].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const counts = {
    roja:     ordenadas.filter((e) => getEstado(e.fecha) === "roja").length,
    amarilla: ordenadas.filter((e) => getEstado(e.fecha) === "amarilla").length,
    verde:    ordenadas.filter((e) => getEstado(e.fecha) === "verde").length,
    vencida:  ordenadas.filter((e) => getEstado(e.fecha) === "vencida").length,
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      fontFamily: "'Courier New', monospace",
      padding: "0 0 80px 0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #222",
        padding: "24px 24px 20px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div>
          <p style={{ color: "#555", fontSize: 11, letterSpacing: 3, margin: "0 0 4px", textTransform: "uppercase" }}>
            Panel de control
          </p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
            Mis Entregas
          </h1>
        </div>
        <Link href="/agregar" style={{
          background: "#fff",
          color: "#000",
          padding: "10px 18px",
          borderRadius: 6,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          fontSize: 13,
          textDecoration: "none",
          letterSpacing: 0.5,
        }}>
          + Agregar
        </Link>
      </div>

      {/* Resumen */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "#222",
        borderBottom: "1px solid #222",
      }}>
        {(["roja", "amarilla", "verde", "vencida"] as const).map((estado) => (
          <div key={estado} style={{
            background: "#0d0d0d",
            padding: "16px 12px",
            textAlign: "center",
          }}>
            <div style={{
              width: 10, height: 10,
              borderRadius: "50%",
              background: COLORES[estado].dot,
              margin: "0 auto 8px",
              boxShadow: estado !== "vencida" ? `0 0 8px ${COLORES[estado].dot}` : "none",
            }} />
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{counts[estado]}</div>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>
              {LABELS[estado]}
            </div>
          </div>
        ))}
      </div>

      {/* Lista */}
      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {ordenadas.length === 0 && (
          <div style={{
            textAlign: "center",
            color: "#444",
            marginTop: 60,
            fontSize: 14,
            lineHeight: 2,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            No tienes entregas registradas.<br />
            <span style={{ color: "#666" }}>Presiona <strong style={{ color: "#fff" }}>+ Agregar</strong> para comenzar.</span>
          </div>
        )}

        {ordenadas.map((entrega) => {
          const estado = getEstado(entrega.fecha);
          const c = COLORES[estado];
          const dias = getDiasRestantes(entrega.fecha);
          const fechaFormato = new Date(entrega.fecha).toLocaleDateString("es-CO", {
            weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
          });

          return (
            <div key={entrega.id} style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              position: "relative",
            }}>
              {/* Semáforo dot */}
              <div style={{
                width: 14, height: 14,
                borderRadius: "50%",
                background: c.dot,
                flexShrink: 0,
                boxShadow: estado !== "vencida" ? `0 0 10px ${c.dot}` : "none",
              }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {entrega.materia}
                  </span>
                  <span style={{
                    background: c.badge,
                    color: c.text,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 4,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    flexShrink: 0,
                  }}>
                    {LABELS[estado]}
                  </span>
                </div>
                <div style={{ color: "#aaa", fontSize: 12, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {entrega.descripcion}
                </div>
                <div style={{ color: "#555", fontSize: 11 }}>
                  🗓 {fechaFormato}
                </div>
              </div>

              {/* Días restantes */}
              <div style={{
                textAlign: "center",
                flexShrink: 0,
              }}>
                <div style={{ color: c.text, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{dias}</div>
                {!["Hoy", "Mañana", "Venció"].includes(dias) && (
                  <div style={{ color: "#555", fontSize: 10 }}>días</div>
                )}
              </div>

              {/* Botón eliminar */}
              <button
                onClick={() => eliminar(entrega.id)}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#555",
                  borderRadius: 5,
                  width: 28, height: 28,
                  cursor: "pointer",
                  fontSize: 14,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}