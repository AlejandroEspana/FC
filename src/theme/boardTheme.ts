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

  // Colores principales de alto contraste
  primary: string;
  secondary: string;
  tertiary: string;
  result: string;
  warning: string;
  accent: string;

  // Estructura y fondos de tablero
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
    badgeBg: "rgba(56, 189, 248, 0.12)",
    badgeBorder: "rgba(56, 189, 248, 0.35)",
    badgeText: "#38BDF8",

    primary: "#38BDF8",   // Celeste claro luminoso (Vector u / Datos base)
    secondary: "#FBBF24", // Ámbar cálido claro (Vector v / Operando)
    tertiary: "#A78BFA",  // Lavanda claro (Proyecciones / Eje 3D)
    result: "#34D399",    // Verde menta / esmeralda (Vector w resultante)
    warning: "#FB7185",   // Coral brillante (Vector opuesto / Resta / Error)
    accent: "#67E8F9",    // Cian brillante

    boardBg: "#0A1120",
    boardGrid: "#1B2A47",
    panelBg: "#0F1A2E",
    panelBorder: "#1E355B",
    panelBorderActive: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.25)",
  },

  matrices: {
    id: "matrices",
    name: "Álgebra Lineal Computacional",
    topicBadge: "MATRICES & TRANSFORMACIONES",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeBorder: "rgba(96, 165, 250, 0.35)",
    badgeText: "#60A5FA",

    primary: "#60A5FA",   // Azul cobalto claro (Matriz A / Filas foco)
    secondary: "#FB923C", // Naranja mandarina claro (Matriz B / Columnas foco)
    tertiary: "#FDE047",  // Amarillo sol (Escalares / Índices de dimensión)
    result: "#4ADE80",    // Verde primavera claro (Matriz C / Producto final)
    warning: "#F43F5E",   // Carmesí claro (No-conmutatividad AB != BA)
    accent: "#C084FC",    // Violeta claro (Determinantes y espacios)

    boardBg: "#0C1026",
    boardGrid: "#1C244A",
    panelBg: "#121738",
    panelBorder: "#232F64",
    panelBorderActive: "#60A5FA",
    glowColor: "rgba(96, 165, 250, 0.25)",
  },

  discrete: {
    id: "discrete",
    name: "Sistemas Dinámicos & Modelación",
    topicBadge: "MODELOS DISCRETOS & CAOS",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    badgeBorder: "rgba(45, 212, 191, 0.35)",
    badgeText: "#2DD4BF",

    primary: "#22D3EE",   // Cian glaciar (Secuencias temporales x_n)
    secondary: "#FBBF24", // Ámbar dorado (Función de transición f(x))
    tertiary: "#F8FAFC",  // Blanco nieve (Recta identidad y = x)
    result: "#A3E635",    // Verde lima neón (Puntos fijos atractores estables)
    warning: "#FB7185",   // Rosa frambuesa brillante (Inestabilidad / Bifurcación)
    accent: "#E879F9",    // Fucsia claro (Diagramas de órbita y caos)

    boardBg: "#081414",
    boardGrid: "#132D28",
    panelBg: "#0E1E1C",
    panelBorder: "#193E37",
    panelBorderActive: "#2DD4BF",
    glowColor: "rgba(45, 212, 191, 0.25)",
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
