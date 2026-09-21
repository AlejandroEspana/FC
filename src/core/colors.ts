export const EDU_COLORS = {
  bg: "#0A0D18",
  bgCard: "#121829",
  bgCardBorder: "#1E2942",
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  conceptA: "#38BDF8", // Cyan / Azul claro (Vector u / concepto principal)
  conceptB: "#FACC15", // Amarillo (Vector v / concepto secundario)
  operation: "#FB923C", // Naranja (Operaciones, transformaciones)
  result: "#34D399",   // Verde esmeralda (Vector resultante w = u + v)
  highlight: "#F472B6",// Rosa (Énfasis / advertencias)
  error: "#F87171",    // Rojo (Errores comunes y contraejemplos)
  grid: "#1E2A42",     // Líneas de cuadrícula
  axes: "#64748B",     // Ejes cartesianos
} as const;

export type EduColor = keyof typeof EDU_COLORS;
