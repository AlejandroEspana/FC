/**
 * src/theme/boardTheme.ts
 * Tokens de diseño para el paradigma "Tablero Científico Dinámico".
 * Proporciona configuraciones cromáticas claras, texturas de pizarra técnica
 * y estilos de paneles para cada una de las tres temáticas del motor.
 */

export type CourseTopic = "vectors" | "matrices" | "discrete";

export interface TopicThemeConfig {
  id: CourseTopic;
  name: string;
  topicBadge: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;

  // Colores principales de alto contraste (Estilo Manim sobre fondo claro)
  primary: string;
  secondary: string;
  tertiary: string;
  result: string;
  warning: string;
  accent: string;

  // Textos y legibilidad en pizarra clara
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Estructura y fondos de tablero blanco técnico
  boardBg: string;
  boardGrid: string;
  panelBg: string;
  panelBorder: string;
  panelBorderActive: string;
  glowColor: string;
}

export const TOPIC_THEMES: Record<CourseTopic, TopicThemeConfig> = {
  vectors: {
    id: "vectors",
    name: "Álgebra Lineal & Física Clásica",
    topicBadge: "VECTORES & GEOMETRÍA",
    badgeBg: "#EFF6FF",
    badgeBorder: "#BFDBFE",
    badgeText: "#1D4ED8",

    primary: "#2563EB",   // Azul Cobalto Manim (Vector u / Datos base)
    secondary: "#D97706", // Ámbar cálido (Vector v / Operando)
    tertiary: "#7C3AED",  // Lavanda/Violeta real (Proyecciones / Eje 3D)
    result: "#059669",    // Verde esmeralda (Vector w resultante)
    warning: "#DC2626",   // Carmesí intenso (Vector opuesto / Resta / Error)
    accent: "#0284C7",    // Cian celeste técnico

    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#64748B",

    boardBg: "#F8FAFC",   // Pizarra técnica blanco slate
    boardGrid: "#E2E8F0", // Cuadrícula milimétrica sutil
    panelBg: "#FFFFFF",   // Tarjeta blanca pura de alto contraste
    panelBorder: "#E2E8F0",
    panelBorderActive: "#2563EB",
    glowColor: "rgba(37, 99, 235, 0.05)",
  },

  matrices: {
    id: "matrices",
    name: "Álgebra Lineal Computacional",
    topicBadge: "MATRICES & TRANSFORMACIONES",
    badgeBg: "#EEF2FF",
    badgeBorder: "#C7D2FE",
    badgeText: "#3730A3",

    primary: "#1D4ED8",   // Azul Real (Matriz A / Filas foco)
    secondary: "#EA580C", // Naranja Mandarina (Matriz B / Columnas foco)
    tertiary: "#CA8A04",  // Amarillo Mostaza (Escalares / Índices de dimensión)
    result: "#047857",    // Verde Bosque (Matriz C / Producto final)
    warning: "#E11D48",   // Rosa Carmesí (No-conmutatividad AB != BA)
    accent: "#7C3AED",    // Violeta intenso (Determinantes y espacios)

    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#64748B",

    boardBg: "#F8FAFC",
    boardGrid: "#E2E8F0",
    panelBg: "#FFFFFF",
    panelBorder: "#E2E8F0",
    panelBorderActive: "#1D4ED8",
    glowColor: "rgba(29, 78, 216, 0.05)",
  },

  discrete: {
    id: "discrete",
    name: "Sistemas Dinámicos & Modelación",
    topicBadge: "MODELOS DISCRETOS & CAOS",
    badgeBg: "#F0FDFA",
    badgeBorder: "#99F6E4",
    badgeText: "#0F766E",

    primary: "#0D9488",   // Turquesa / Teal (Secuencias temporales x_n)
    secondary: "#D97706", // Ámbar dorado (Función de transición f(x))
    tertiary: "#475569",  // Gris técnico (Recta identidad y = x)
    result: "#16A34A",    // Verde hoja (Puntos fijos atractores estables)
    warning: "#BE123C",   // Borgoña brillante (Inestabilidad / Bifurcación)
    accent: "#9333EA",    // Púrpura dinámico (Diagramas de órbita y caos)

    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#64748B",

    boardBg: "#F8FAFC",
    boardGrid: "#E2E8F0",
    panelBg: "#FFFFFF",
    panelBorder: "#E2E8F0",
    panelBorderActive: "#0D9488",
    glowColor: "rgba(13, 148, 136, 0.05)",
  },
};

export function getTopicTheme(topic: CourseTopic | string): TopicThemeConfig {
  if (topic === "matrices" || topic.toLowerCase().includes("matri")) {
    return TOPIC_THEMES.matrices;
  }
  if (topic === "discrete" || topic.toLowerCase().includes("discret") || topic.toLowerCase().includes("dinam")) {
    return TOPIC_THEMES.discrete;
  }
  return TOPIC_THEMES.vectors;
}
