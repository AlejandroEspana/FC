/**
 * src/courses/vectors/content/data.ts
 * Contenido pedagógico riguroso para el Curso Fundamental de Vectores (14 Capítulos).
 */

import { FormulaDeconstructionData, DefinitionCardData, ErrorCardData, BulletItemData, ExerciseData } from "../../../content/types";

export const VECTORS_COURSE = {
  id: "vectors",
  title: "Álgebra Lineal & Física Clásica",
  subtitle: "Curso Fundamental Completo de Vectores",

  cap00_intro: {
    title: "Fundamentos y Naturaleza de los Vectores",
    subtitle: "Motivación, Aplicaciones e Intuición Física",
    durationFrames: 600,
    bullets: [
      {
        title: "Mecánica Clásica & Dinámica",
        description: "Fuerzas coplanares, aceleración centrípeta, cantidad de movimiento y campos gravitacionales.",
        badge: "Física",
        badgeColor: "#38BDF8",
      },
      {
        title: "Computación Gráfica & Videojuegos 3D",
        description: "Vértices poligonales, vectores normales para sombreado (shaders), trazado de rayos y colisiones.",
        badge: "CGI & Motores",
        badgeColor: "#FACC15",
      },
      {
        title: "Machine Learning & Big Data",
        description: "Embeddings de lenguaje natural, espacios latentes y optimización por gradiente descendente.",
        badge: "Inteligencia Artificial",
        badgeColor: "#34D399",
      },
    ] as BulletItemData[],
  },

  cap01_preconcepts: {
    title: "Preconceptos Matemáticos Indispensables",
    subtitle: "Recta Real, Plano Coordenado y Trigonometría Básica",
    durationFrames: 600,
    definition: {
      title: "El Espacio Euclídeo R²",
      category: "Sistema de Referencia",
      text: "Conjunto de pares ordenados (x, y) de números reales dotados del producto interno euclidiano estándar y la métrica euclidiana inducida por el Teorema de Pitágoras.",
      formula: "\\mathbb{R}^2 = \\{ (x, y) : x, y \\in \\mathbb{R} \\}",
      accentColor: "#38BDF8",
    } as DefinitionCardData,
    trigFormula: {
      formula: "\\sin(\\theta) = \\frac{y}{r}, \\quad \\cos(\\theta) = \\frac{x}{r}, \\quad \\tan(\\theta) = \\frac{y}{x}",
      title: "Razones Trigonométricas Fundamentales",
      subtitle: "Relación entre el ángulo polar y las proyecciones en el triángulo rectángulo",
      components: [
        { symbol: "r", name: "Radio o Hipotenusa", color: "#38BDF8", description: "Distancia euclídea radial desde el origen al punto." },
        { symbol: "x", name: "Cateto Adyacente (Coseno)", color: "#FACC15", description: "Proyección horizontal sobre el eje de abscisas." },
        { symbol: "y", name: "Cateto Opuesto (Seno)", color: "#34D399", description: "Proyección vertical sobre el eje de ordenadas." },
      ],
    } as FormulaDeconstructionData,
  },

  cap02_intuition: {
    title: "Intuición Geométrica: Escalar vs Vector",
    subtitle: "¿Por qué un simple número no basta para describir el universo?",
    durationFrames: 600,
    errorCase: {
      wrong: "La rapidez (speed) y la velocidad (velocity) son sinónimos idénticos.",
      correct: "La rapidez es un escalar puro (|v| >= 0). La velocidad es un vector que exige dirección y sentido.",
      why: "En física, viajar a 100 km/h rumbo al Norte tiene consecuencias mecánicas radicalmente distintas a viajar a 100 km/h rumbo al Sur.",
    } as ErrorCardData,
  },

  cap03_formal_definition: {
    title: "Definición Formal de Vector Euclidiano",
    subtitle: "Axiomas de Dirección, Magnitud y Sentido",
    durationFrames: 600,
    definition: {
      title: "Vector en el Espacio R^n",
      category: "Axioma Algebraico",
      text: "Un vector euclidiano es un elemento geométrico y algebraico definido unívocamente por su longitud escalar no negativa (|v| >= 0), la inclinación de su recta directriz (dirección) y la orientación de su punta de flecha (sentido).",
      formula: "\\vec{v} \\in \\mathbb{R}^n, \\quad |\\vec{v}| \\ge 0",
      accentColor: "#34D399",
    } as DefinitionCardData,
  },

  cap04_representation: {
    title: "Representación: Vector Libre vs Aplicado",
    subtitle: "Equipolencia de Vectores y Coordenadas",
    durationFrames: 600,
    bullets: [
      {
        title: "Vector Libre (Equipolente)",
        description: "Representa a todos los vectores con idéntica longitud, dirección paralela y mismo sentido, sin importar su punto de aplicación.",
        badge: "Álgebra Lineal",
        badgeColor: "#38BDF8",
      },
      {
        title: "Vector de Posición / Aplicado",
        description: "Posee un origen fijo atado al origen de coordenadas O=(0,0) o a una partícula material en dinámica.",
        badge: "Física Clásica",
        badgeColor: "#FACC15",
      },
    ] as BulletItemData[],
  },

  cap05_components: {
    title: "Componentes y Base Ortonormal Canónica",
    subtitle: "Descomposición Ortogonal en Versores i y j",
    durationFrames: 700,
    decomposition: {
      formula: "\\vec{v} = v_x \\hat{i} + v_y \\hat{j}",
      title: "Descomposición Canónica",
      subtitle: "Combinación lineal única en términos de versores ortonormales unitarios",
      components: [
        { symbol: "\\vec{v}", name: "Vector Resultante", color: "#38BDF8", description: "Vector diagonal que une el origen con el punto extremo final." },
        { symbol: "v_x", name: "Proyección Horizontal X", color: "#FACC15", description: "Magnitud escalar con signo proyectada sobre el eje X." },
        { symbol: "\\hat{i}", name: "Versor Base (1, 0)", color: "#FB923C", description: "Vector unitario de norma 1 sobre el eje X positivo." },
        { symbol: "v_y", name: "Proyección Vertical Y", color: "#34D399", description: "Magnitud escalar con signo proyectada sobre el eje Y." },
        { symbol: "\\hat{j}", name: "Versor Base (0, 1)", color: "#F472B6", description: "Vector unitario de norma 1 sobre el eje Y positivo." },
      ],
    } as FormulaDeconstructionData,
  },

  cap06_magnitude: {
    title: "Magnitud y Norma Euclidiana",
    subtitle: "Teorema de Pitágoras en 2D y 3D",
    durationFrames: 700,
    magnitudeFormula: {
      formula: "|\\vec{v}| = \\sqrt{v_x^2 + v_y^2 + v_z^2}",
      title: "Norma Euclidiana L2",
      subtitle: "Longitud absoluta de la flecha en el espacio euclídeo",
      components: [
        { symbol: "|\\vec{v}|", name: "Módulo o Longitud", color: "#34D399", description: "Escalar real no negativo que mide la distancia geométrica." },
        { symbol: "v_x^2 + v_y^2", name: "Aporte en el Plano XY", color: "#FACC15", description: "Hipotenusa base en el plano horizontal." },
        { symbol: "v_z^2", name: "Aporte en Cota Z", color: "#A78BFA", description: "Elevación espacial para generalización tridimensional." },
      ],
    } as FormulaDeconstructionData,
  },

  cap07_direction: {
    title: "Dirección Polar y Vector Unitario",
    subtitle: "Normalización y Cuadrantes trigonométricos",
    durationFrames: 700,
    unitFormula: {
      formula: "\\hat{u} = \\frac{\\vec{v}}{|\\vec{v}|} = \\left( \\frac{v_x}{|\\vec{v}|},\\; \\frac{v_y}{|\\vec{v}|} \\right)",
      title: "Normalización de un Vector",
      subtitle: "Extracción pura de la orientación con longitud idéntica a 1",
      components: [
        { symbol: "\\hat{u}", name: "Versor Normalizado", color: "#34D399", description: "Vector adimensional cuya norma satisface estrictamente |u| = 1." },
        { symbol: "1 / |\\vec{v}|", name: "Factor Escalar Inverso", color: "#FB923C", description: "Contrae el vector hasta posarlo sobre el círculo unitario." },
      ],
    } as FormulaDeconstructionData,
  },

  cap08_operations: {
    title: "Operaciones Vectoriales: Suma, Resta y Escalamiento",
    subtitle: "Rigor Geométrico y Homotecia Continua",
    durationFrames: 800,
    sumFormula: {
      formula: "\\vec{w} = \\vec{u} + \\vec{v} = (u_x + v_x)\\hat{i} + (u_y + v_y)\\hat{j}",
      title: "Suma Vectorial Punta-Cola",
      subtitle: "Superposición de desplazamientos y adición término a término",
      components: [
        { symbol: "\\vec{w}", name: "Resultante Total", color: "#34D399", description: "Vector neto que une el origen inicial con la punta final." },
        { symbol: "u_x + v_x", name: "Suma en Abscisas", color: "#FACC15", description: "Desplazamiento horizontal total." },
        { symbol: "u_y + v_y", name: "Suma en Ordenadas", color: "#38BDF8", description: "Desplazamiento vertical total." },
      ],
    } as FormulaDeconstructionData,
  },

  cap09_dot_product: {
    title: "El Producto Punto (Producto Escalar)",
    subtitle: "Geometría, Proyecciones y Criterio de Ortogonalidad",
    durationFrames: 800,
    dotFormula: {
      formula: "\\vec{u} \\cdot \\vec{v} = |\\vec{u}| |\\vec{v}| \\cos(\\theta) = u_x v_x + u_y v_y + u_z v_z",
      title: "Equivalencia Geométrica y Algebraica",
      subtitle: "Medida del alineamiento mutuo entre dos direcciones",
      components: [
        { symbol: "\\vec{u} \\cdot \\vec{v}", name: "Producto Escalar", color: "#34D399", description: "Produce un único número real (escalar con signo), JAMÁS un vector." },
        { symbol: "\\cos(\\theta)", name: "Coseno del Ángulo", color: "#FACC15", description: "Positivo para ángulos agudos, cero a 90° (ortogonalidad), negativo para obtusos." },
      ],
    } as FormulaDeconstructionData,
  },

  cap10_cross_product: {
    title: "El Producto Cruz (Vectorial en R³)",
    subtitle: "Ortogonalidad Espacial, Regla de la Mano Derecha y Three.js",
    durationFrames: 850,
    crossFormula: {
      formula: "\\vec{w} = \\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{bmatrix}",
      title: "Determinante Formal en R³",
      subtitle: "Produce un vector ortogonal simultáneamente a los dos vectores dados",
      components: [
        { symbol: "\\vec{w}", name: "Vector Perpendicular", color: "#34D399", description: "Satisface w · a = 0 y w · b = 0." },
        { symbol: "|\\vec{a} \\times \\vec{b}|", name: "Área del Paralelogramo", color: "#38BDF8", description: "La longitud del vector equivale al área delimitada por a y b." },
      ],
    } as FormulaDeconstructionData,
  },

  cap11_projections: {
    title: "Proyecciones Escalares y Vectoriales",
    subtitle: "Descomposición en componentes paralelas y ortogonales",
    durationFrames: 700,
    projFormula: {
      formula: "\\mathrm{proj}_{\\vec{v}}(\\vec{u}) = \\left( \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{v}|^2} \\right) \\vec{v}",
      title: "Proyección Vectorial Ortogonal",
      subtitle: "La sombra de u sobre la recta generada por v",
      components: [
        { symbol: "\\mathrm{proj}_{\\vec{v}}(\\vec{u})", name: "Vector Proyección", color: "#38BDF8", description: "Vector colineal a v con longitud igual a la sombra de u." },
        { symbol: "\\vec{u} \\cdot \\vec{v}", name: "Producto Escalar", color: "#34D399", description: "Modula la intensidad del solapamiento direccional." },
      ],
    } as FormulaDeconstructionData,
  },

  cap12_common_errors: {
    title: "Errores Comunes y Falacias Frecuentes",
    subtitle: "Prevención de Errores Clásicos en Exámenes y Modelación",
    durationFrames: 700,
    error1: {
      wrong: "Para restar dos vectores basta con restar sus módulos: |u - v| = |u| - |v|.",
      correct: "FALSO. El módulo de la resta depende del ángulo: |u - v| = sqrt(|u|² + |v|² - 2|u||v|cosθ).",
      why: "Restar vectores es una operación vectorial que toma en cuenta la orientación espacial relativa.",
    } as ErrorCardData,
  },

  cap13_exercises_summary: {
    title: "Resumen Maestro & Ejercicios de Dominio",
    subtitle: "Consolidación de Competencias y Resolución Paso a Paso",
    durationFrames: 900,
    exercise1: {
      level: "Nivel Básico: Magnitud y Ángulo Polar",
      prompt: "Dado el vector v = (3, 4), calcular su norma euclidiana |v| y su versor unitario asociado.",
      steps: [
        { label: "Norma", math: "|\\vec{v}| = \\sqrt{3^2 + 4^2} = 5" },
        { label: "Unitario", math: "\\hat{u} = (3/5, 4/5) = (0.6, 0.8), \\quad |\\hat{u}| = 1" },
      ],
    } as ExerciseData,
    exercise2: {
      level: "Nivel Avanzado: Producto Vectorial en R³",
      prompt: "Calcular el vector ortogonal c = a × b para a = (1, 2, 0) y b = (0, 3, 1).",
      steps: [
        { label: "Laplace", math: "\\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 0 \\\\ 0 & 3 & 1 \\end{bmatrix} = 2\\hat{i} - \\hat{j} + 3\\hat{k}" },
        { label: "Resultado", math: "\\vec{c} = (2, -1, 3), \\quad |\\vec{c}| = \\sqrt{14} \\approx 3.74" },
      ],
    } as ExerciseData,
  },
};
