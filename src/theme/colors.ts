/**
 * src/theme/colors.ts
 * Paleta pedagógica semántica con asignación rigurosa de significado conceptual.
 * Los colores representan funciones cognitivas consistentes en todo el curso:
 * - Datos originales -> Cian (#38BDF8)
 * - Variable en estudio -> Ámbar (#FACC15)
 * - Operación / Proceso -> Violeta (#A855F7)
 * - Resultado / Solución -> Esmeralda (#34D399)
 * - Advertencia / Error -> Coral (#FB7185)
 */

export const EDUCATIONAL_THEME = {
  // Fondos y estructura
  background: "#070A12",
  cardBg: "#0F172A",
  cardBorder: "#1E293B",
  cardBorderHover: "#334155",

  // Textos y legibilidad
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",

  // Roles semánticos conceptuales consistentes
  originalData: "#38BDF8",   // Color A: Datos dados, vector u, valor x_0, matriz A
  studyVariable: "#FACC15",  // Color B: Variable a despejar, vector v, fila/columna foco
  operation: "#A855F7",      // Color C: Operador suma/producto, radical, transformación lineal
  result: "#34D399",         // Color D: Vector resultante w, determinante, atractor estable
  warning: "#FB7185",        // Color E: Error conceptual común, repulsor inestable, caso inválido

  // Atributos de compatibilidad
  primary: "#38BDF8",
  secondary: "#94A3B8",
  concept: "#38BDF8",
  accent3D: "#A78BFA",

  // Cuadrícula y sistema cartesiano (alto contraste moderado, no agresivo)
  grid: "#1E293B",
  axes: "#64748B",
  ticks: "#475569",
} as const;

export const educationalTheme = EDUCATIONAL_THEME;

// Compatibilidad hacia atrás con THEME_COLORS
export const THEME_COLORS = {
  bg: EDUCATIONAL_THEME.background,
  cardBg: EDUCATIONAL_THEME.cardBg,
  cardBorder: EDUCATIONAL_THEME.cardBorder,
  cardBorderHover: EDUCATIONAL_THEME.cardBorderHover,

  textPrimary: EDUCATIONAL_THEME.textPrimary,
  textSecondary: EDUCATIONAL_THEME.textSecondary,
  textMuted: EDUCATIONAL_THEME.textMuted,

  conceptA: EDUCATIONAL_THEME.originalData,
  conceptB: EDUCATIONAL_THEME.studyVariable,
  operation: EDUCATIONAL_THEME.operation,
  result: EDUCATIONAL_THEME.result,
  highlight: EDUCATIONAL_THEME.studyVariable,
  error: EDUCATIONAL_THEME.warning,
  accent3D: EDUCATIONAL_THEME.accent3D,

  grid: EDUCATIONAL_THEME.grid,
  axes: EDUCATIONAL_THEME.axes,
  ticks: EDUCATIONAL_THEME.ticks,
} as const;

export type SemanticRole =
  | "originalData"
  | "studyVariable"
  | "operation"
  | "result"
  | "warning"
  | "neutral";

export function getColorBySemanticRole(role: SemanticRole): string {
  switch (role) {
    case "originalData":
      return EDUCATIONAL_THEME.originalData;
    case "studyVariable":
      return EDUCATIONAL_THEME.studyVariable;
    case "operation":
      return EDUCATIONAL_THEME.operation;
    case "result":
      return EDUCATIONAL_THEME.result;
    case "warning":
      return EDUCATIONAL_THEME.warning;
    case "neutral":
    default:
      return EDUCATIONAL_THEME.textSecondary;
  }
}

export { TOPIC_THEMES, getTopicTheme, type CourseTopic, type TopicThemeConfig } from "./boardTheme";
