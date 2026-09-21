/**
 * src/courses/matrices/content/data.ts
 * Contenido pedagógico riguroso para el Curso de Matrices y Multiplicación Matricial.
 */

import { FormulaDeconstructionData, DefinitionCardData, ErrorCardData, BulletItemData, ExerciseData } from "../../../content/types";
import { Matrix } from "../../../math/matrices";

export const MATRICES_COURSE = {
  id: "matrices",
  title: "Álgebra Lineal Computacional",
  subtitle: "Curso Fundamental: Matrices, Producto Matricial y Transformaciones Lineales",

  cap00_intro: {
    title: "Naturaleza y Poder de las Matrices",
    subtitle: "Desde Sistemas de Ecuaciones hasta Redes Neuronales Profundas",
    durationFrames: 600,
    bullets: [
      {
        title: "Sistemas de Ecuaciones Lineales",
        description: "Representación unificada A x = b para resolver simultáneamente miles de incógnitas.",
        badge: "Fundamento",
        badgeColor: "#38BDF8",
      },
      {
        title: "Computación Gráfica y Videojuegos 3D",
        description: "Transformaciones de cámara, proyecciones en perspectiva y shaders matriciales.",
        badge: "Gráficos 3D",
        badgeColor: "#FACC15",
      },
      {
        title: "Inteligencia Artificial y Deep Learning",
        description: "Las capas de redes neuronales no son más que multiplicaciones de matrices de pesos (W x + b).",
        badge: "Machine Learning",
        badgeColor: "#34D399",
      },
    ] as BulletItemData[],
  },

  cap01_anatomy: {
    title: "Anatomía Matricial: Filas, Columnas e Índices",
    subtitle: "Dimensiones m × n y Notación de Elementos a_{ij}",
    durationFrames: 600,
    notationFormula: {
      formula: "A = [a_{ij}] = \\begin{bmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}",
      title: "Matriz General de Dimensión m × n",
      subtitle: "Arreglo bidimensional rectangular de m filas y n columnas",
      components: [
        { symbol: "m", name: "Número de Filas", color: "#38BDF8", description: "Cantidad de renglones horizontales." },
        { symbol: "n", name: "Número de Columnas", color: "#FACC15", description: "Cantidad de columnas verticales." },
        { symbol: "a_{ij}", name: "Elemento en Posición (i, j)", color: "#34D399", description: "Fila i (primer índice) y columna j (segundo índice)." },
      ],
    } as FormulaDeconstructionData,
  },

  cap02_special_types: {
    title: "Tipos Especiales de Matrices",
    subtitle: "Identidad, Diagonal, Nula, Simétrica y Triangulares",
    durationFrames: 600,
    identityDef: {
      title: "La Matriz Identidad (I)",
      category: "Elemento Neutro Multiplicativo",
      text: "Matriz cuadrada que posee unos en la diagonal principal y ceros en todas las demás posiciones. Cumple estrictamente que A * I = I * A = A para toda matriz compatible.",
      formula: "I_n = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}, \\quad A I = I A = A",
      accentColor: "#34D399",
    } as DefinitionCardData,
  },

  cap03_operations: {
    title: "Operaciones Básicas: Suma, Resta y Escalar",
    subtitle: "Adición término a término bajo igualdad dimensional",
    durationFrames: 650,
    sumFormula: {
      formula: "C = A + B \\iff c_{ij} = a_{ij} + b_{ij}",
      title: "Suma y Resta Matricial Término a Término",
      subtitle: "Exige estrictamente que ambas matrices compartan exactamente la misma dimensión m × n",
      components: [
        { symbol: "c_{ij}", name: "Elemento Suma", color: "#34D399", description: "Resultado directo de sumar los elementos homólogos." },
        { symbol: "a_{ij} + b_{ij}", name: "Adición Escalar", color: "#38BDF8", description: "Suma ordinaria de números reales en la posición (i, j)." },
      ],
    } as FormulaDeconstructionData,
  },

  cap04_dimension_compatibility: {
    title: "Compatibilidad Dimensional para la Multiplicación",
    subtitle: "La regla fundamental de las dimensiones internas",
    durationFrames: 650,
    compatFormula: {
      formula: "A_{(m \\times n)} \\cdot B_{(n \\times p)} = C_{(m \\times p)}",
      title: "Regla de Índices Internos Iguales",
      subtitle: "El número de columnas de A debe ser idéntico al número de filas de B",
      components: [
        { symbol: "n", name: "Dimensión Interna Compartida", color: "#FACC15", description: "Columnas de A = Filas de B. Si difieren, la multiplicación NO existe." },
        { symbol: "m \\times p", name: "Dimensión Externa Resultante", color: "#34D399", description: "La matriz resultante hereda las filas de A y las columnas de B." },
      ],
    } as FormulaDeconstructionData,
  },

  cap05_multiplication_algorithm: {
    title: "El Algoritmo de Multiplicación: Fila × Columna",
    subtitle: "Desarrollo paso a paso del producto escalar entre renglón y columna",
    durationFrames: 750,
    matrixA: [
      [1, 2],
      [3, 4],
    ] as Matrix,
    matrixB: [
      [2, 0],
      [1, 2],
    ] as Matrix,
    matrixC: [
      [4, 4],
      [10, 8],
    ] as Matrix,
  },

  cap06_properties: {
    title: "Propiedades del Producto de Matrices",
    subtitle: "Asociatividad, Distributividad y Neutro Multiplicativo",
    durationFrames: 650,
    bullets: [
      {
        title: "Propiedad Asociativa",
        description: "(A · B) · C = A · (B · C). Permite agrupar multiplicaciones de múltiples matrices consecutivas.",
        badge: "Propiedad 1",
        badgeColor: "#38BDF8",
      },
      {
        title: "Propiedad Distributiva",
        description: "A · (B + C) = A · B + A · C y (A + B) · C = A · C + B · C.",
        badge: "Propiedad 2",
        badgeColor: "#34D399",
      },
      {
        title: "Elemento Neutro (Identidad)",
        description: "A · I = I · A = A. Multiplicar por la identidad preserva inalterada la matriz.",
        badge: "Propiedad 3",
        badgeColor: "#FACC15",
      },
    ] as BulletItemData[],
  },

  cap07_non_commutativity: {
    title: "La No-Conmutatividad Fundamental",
    subtitle: "Demostración Rigurosa: Por qué A · B ≠ B · A",
    durationFrames: 700,
    errorCase: {
      wrong: "En el producto matricial el orden no importa: A · B = B · A.",
      correct: "FALSO. El producto de matrices NO es conmutativo en general: A · B ≠ B · A.",
      why: "Geométricamente, aplicar una rotación y luego un cizallamiento produce una deformación completamente distinta a aplicar primero el cizallamiento y luego la rotación.",
    } as ErrorCardData,
  },

  cap08_geometric_2d: {
    title: "Interpretación Geométrica en 2D: Transformaciones",
    subtitle: "Rotación, Escalamiento y Cizallamiento (Shear)",
    durationFrames: 800,
    shearMatrix: [
      [1, 1.2],
      [0, 1],
    ] as Matrix,
  },

  cap09_applications: {
    title: "Aplicaciones del Álgebra Matricial",
    subtitle: "De la física clásica a los LLMs modernos",
    durationFrames: 650,
    bullets: [
      {
        title: "Sistemas de Ecuaciones Lineales Ax = b",
        description: "Resolución por eliminación gaussiana o inversión de matrices en ingeniería estructural y circuitos eléctricos.",
        badge: "Ingeniería",
        badgeColor: "#38BDF8",
      },
      {
        title: "Transformaciones Afines en Computación Gráfica",
        description: "Matrices 4x4 homogéneas para trasladar, rotar y proyectar geometrías 3D en la GPU.",
        badge: "Motores 3D",
        badgeColor: "#FACC15",
      },
      {
        title: "Atención en Redes Neuronales (Transformers)",
        description: "El cálculo Attention(Q, K, V) = softmax(Q K^T / sqrt(d)) V son productos matriciales masivos.",
        badge: "IA Moderna",
        badgeColor: "#34D399",
      },
    ] as BulletItemData[],
  },

  cap10_exercises_summary: {
    title: "Ejercicios de Dominio y Resumen de Matrices",
    subtitle: "Cálculo analítico guiado paso a paso",
    durationFrames: 850,
    exercise1: {
      level: "Nivel Intermedio: Multiplicación 2x2",
      prompt: "Calcular el producto C = A · B para A = [[1, 2], [3, 4]] y B = [[2, 0], [1, 2]].",
      steps: [
        { label: "c_11", math: "c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4" },
        { label: "c_12", math: "c_{12} = (1)(0) + (2)(2) = 0 + 4 = 4" },
        { label: "c_21", math: "c_{21} = (3)(2) + (4)(1) = 6 + 4 = 10" },
        { label: "c_22", math: "c_{22} = (3)(0) + (4)(2) = 0 + 8 = 8" },
        { label: "Resultado", math: "C = \\begin{bmatrix} 4 & 4 \\\\ 10 & 8 \\end{bmatrix}" },
      ],
    } as ExerciseData,
  },
};
