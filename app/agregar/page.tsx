"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgregarPage() {
  const router = useRouter();
  const [materia, setMateria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const guardar = () => {
    if (!materia.trim() || !descripcion.trim() || !fecha) {
      setError("Completa todos los campos.");
      return;
    }

    const nueva = {
      id: Date.now().toString(),
      materia: materia.trim(),
      descripcion: descripcion.trim(),
      fecha,
    };

    const stored = localStorage.getItem("entregas");
    const entregas = stored ? JSON.parse(stored) : [];
    entregas.push(nueva);
    localStorage.setItem("entregas", JSON.stringify(entregas));

    router.push("/");
  };

  const inputStyle = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 8,
    padding: "14px 16px",
    color: "#fff",
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    color: "#555",
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 8,
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
      }}>
        <div>
          <p style={{ color: "#555", fontSize: 11, letterSpacing: 3, margin: "0 0 4px", textTransform: "uppercase" }}>
            Nueva entrega
          </p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
            Agregar
          </h1>
        </div>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            padding: "10px 16px",
            borderRadius: 6,
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>
      </div>

      {/* Formulario */}
      <div style={{ padding: "28px 20px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Materia */}
        <div>
          <label style={labelStyle}>Materia</label>
          <input
            type="text"
            placeholder="Ej: Cálculo diferencial"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Descripción */}
        <div>
          <label style={labelStyle}>Descripción</label>
          <textarea
            placeholder="Ej: Taller de integrales capítulo 3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            style={{
              ...inputStyle,
              resize: "none",
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Fecha límite */}
        <div>
          <label style={labelStyle}>Fecha y hora límite</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{
              ...inputStyle,
              colorScheme: "dark",
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#2e0a0a",
            border: "1px solid #ef4444",
            borderRadius: 8,
            padding: "12px 16px",
            color: "#f87171",
            fontSize: 13,
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Preview del semáforo */}
        {fecha && (
          <div style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ color: "#555", fontSize: 12 }}>Estado estimado:</span>
            <EstadoPreview fecha={fecha} />
          </div>
        )}

        {/* Botón guardar */}
        <button
          onClick={guardar}
          style={{
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "16px",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            letterSpacing: 0.5,
            marginTop: 8,
          }}
        >
          Guardar entrega
        </button>
      </div>
    </main>
  );
}

function EstadoPreview({ fecha }: { fecha: string }) {
  const ahora = new Date();
  const limite = new Date(fecha);
  const diff = (limite.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24);

  let color, label;
  if (diff < 0)      { color = "#555"; label = "⚫ Vencida"; }
  else if (diff < 2) { color = "#ef4444"; label = "🔴 Urgente"; }
  else if (diff < 5) { color = "#eab308"; label = "🟡 Pronto"; }
  else               { color = "#22c55e"; label = "🟢 Al día"; }

  return (
    <span style={{ color, fontWeight: 700, fontSize: 13 }}>{label}</span>
  );
}


