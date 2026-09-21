/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        edu: {
          bg: "#0A0D18",
          bgCard: "#121829",
          bgCardBorder: "#1E2942",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          conceptA: "#38BDF8", // Cyan / Blue (Primer vector / concepto A)
          conceptB: "#FACC15", // Amarillo (Segundo vector / concepto B)
          operation: "#FB923C", // Naranja (Operaciones / transformaciones)
          result: "#34D399",   // Verde esmeralda (Resultados / sumas)
          highlight: "#F472B6",// Rosa (Énfasis / advertencias)
          error: "#F87171",    // Rojo suave (Errores comunes)
          grid: "#1E2A42",     // Líneas de cuadrícula
          axes: "#64748B",     // Ejes cartesianos
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
