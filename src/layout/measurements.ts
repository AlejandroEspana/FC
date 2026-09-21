/**
 * src/layout/measurements.ts
 * Estimador matemático para el dimensionamiento predictivo y responsivo de fórmulas KaTeX.
 * Evita desbordamientos ajustando automáticamente la escala y el tamaño antes del renderizado.
 */

export interface FormulaMeasurement {
  estimatedWidthPx: number;
  estimatedHeightPx: number;
  recommendedFontSize: string; // Tailwind class
  scaleFactor: number; // Factor de escala (1.0 = normal, < 1.0 = escalado hacia abajo)
  requiresMultiline: boolean;
}

export function estimateFormulaDimensions(
  latex: string,
  containerWidthPx: number = 600,
  requestedFontSize: string = "text-2xl"
): FormulaMeasurement {
  if (!latex || latex.trim() === "") {
    return {
      estimatedWidthPx: 0,
      estimatedHeightPx: 40,
      recommendedFontSize: "text-base",
      scaleFactor: 1.0,
      requiresMultiline: false,
    };
  }

  // 1. Detectar matrices y contar dimensiones internas
  const matrixMatch = latex.match(/\\begin\{(?:b|p|v|V)?matrix\}([\s\S]*?)\\end\{(?:b|p|v|V)?matrix\}/);
  let matrixCols = 0;
  let matrixRows = 0;
  let matrixWidthPx = 0;

  if (matrixMatch) {
    const matrixContent = matrixMatch[1];
    const rows = matrixContent.split(/\\\\/).filter((r) => r.trim().length > 0);
    matrixRows = rows.length;
    if (matrixRows > 0) {
      const firstRowCols = rows[0].split(/&/).length;
      matrixCols = firstRowCols;
      // Cada columna de matriz en KaTeX consume entre 45px y 75px
      matrixWidthPx = matrixCols * 58 + 40; // +40px por los corchetes
    }
  }

  // 2. Limpiar comandos LaTeX para medir con precisión los glifos horizontales visibles
  let cleanFormula = latex
    .replace(/\\begin\{(?:b|p|v|V)?matrix\}[\s\S]*?\\end\{(?:b|p|v|V)?matrix\}/g, "")
    // Fracciones: en KaTeX se apilan verticalmente, el ancho es el máximo entre num y den
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, num, den) => (num.length >= den.length ? `${num} ` : `${den} `))
    // Decoradores y tipos de letra (recursivo para anidados como \mathrm{proj}_{\vec{v}})
    .replace(/\\(?:mathrm|mathbf|mathit|mathbb|mathcal|text|operatorname|vec|hat|bar|tilde|dot|ddot|overline)\{([^{}]*)\}/g, "$1")
    .replace(/\\(?:mathrm|mathbf|mathit|mathbb|mathcal|text|operatorname|vec|hat|bar|tilde|dot|ddot|overline)\{([^{}]*)\}/g, "$1")
    // Funciones matemáticas comunes (se renderizan como su nombre)
    .replace(/\\(sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|ln|log|det|exp|lim|max|min|dim|ker|deg)/g, "$1")
    // Letras griegas (1 glifo visible)
    .replace(/\\(alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)/g, "G")
    // Operadores y símbolos matemáticos (1 glifo visible)
    .replace(/\\(cdot|times|div|pm|mp|circ|bullet|star|ast|oplus|otimes|odot|leq|geq|neq|approx|equiv|sim|simeq|propto|in|notin|subset|subseteq|supset|supseteq|cup|cap|to|rightarrow|leftarrow|Rightarrow|Leftarrow|iff|implies|partial|nabla|infty|forall|exists|emptyset)/g, "O")
    // Comandos de tamaño y delimitadores sin ancho
    .replace(/\\(left|right|big|Big|bigg|Bigg|displaystyle|textstyle|scriptstyle)/g, "")
    // Espacios KaTeX
    .replace(/\\(quad|qquad|,|;|!| )/g, " ")
    // Raíces cuadradas (añaden símbolo radical + contenido)
    .replace(/\\sqrt(?:\[[^\]]*\])?\{([^{}]*)\}/g, "R$1")
    // Agrupadores invisibles
    .replace(/[{}\\]/g, "");

  // Contar glifos visibles ignorando espacios en blanco múltiples
  const visibleGlyphs = cleanFormula.replace(/\s+/g, " ").trim().length;

  // 3. Modificadores de complejidad
  const fractionsCount = (latex.match(/\\frac/g) || []).length;
  const rootsCount = (latex.match(/\\sqrt/g) || []).length;

  const FONT_HIERARCHY: Array<{ size: string; px: number }> = [
    { size: "text-3xl", px: 18 },
    { size: "text-2xl", px: 14 },
    { size: "text-xl", px: 12 },
    { size: "text-lg", px: 10.5 },
    { size: "text-base", px: 9.5 },
    { size: "text-sm", px: 8.5 },
    { size: "text-xs", px: 7 },
  ];

  const startIndex = Math.max(
    0,
    FONT_HIERARCHY.findIndex((f) => f.size === requestedFontSize)
  );

  const availableWidth = Math.max(80, containerWidthPx - 24);
  let recommendedFontSize = requestedFontSize;
  let scaleFactor = 1.0;
  let rawWidth = 0;

  // Evaluar en orden descendente desde el tamaño solicitado
  for (let i = startIndex; i < FONT_HIERARCHY.length; i++) {
    const candidate = FONT_HIERARCHY[i];
    const width = Math.round(
      (visibleGlyphs * candidate.px + matrixWidthPx + fractionsCount * 14 + rootsCount * 12) * 1.08
    );
    if (width <= availableWidth || i === FONT_HIERARCHY.length - 1) {
      recommendedFontSize = candidate.size;
      rawWidth = width;
      if (width > availableWidth) {
        scaleFactor = Math.min(1.0, Math.max(0.45, availableWidth / width));
      } else {
        scaleFactor = 1.0;
      }
      break;
    }
  }

  const estimatedWidthPx = Math.round(rawWidth * scaleFactor);
  const estimatedHeightPx = matrixRows > 0 ? Math.max(90, matrixRows * 42) : fractionsCount > 0 ? 80 : 50;
  const requiresMultiline = rawWidth > containerWidthPx * 1.8;

  return {
    estimatedWidthPx,
    estimatedHeightPx,
    recommendedFontSize,
    scaleFactor,
    requiresMultiline,
  };
}
