/**
 * src/validation/validateContent.ts
 * Validador de consistencia y completitud pedagógica del contenido.
 */

import katex from "katex";
import { FormulaDeconstructionData } from "../content/types";

export interface ContentValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateLatexSyntax(latex: string): boolean {
  try {
    katex.renderToString(latex, { throwOnError: true });
    return true;
  } catch {
    return false;
  }
}

export function validateDeconstructionContent(data: FormulaDeconstructionData): ContentValidationResult {
  const errors: string[] = [];

  if (!validateLatexSyntax(data.formula)) {
    errors.push(`[LATEX_SYNTAX_ERROR] La fórmula principal '${data.formula}' contiene errores KaTeX.`);
  }

  if (data.components.length === 0) {
    errors.push(`[PEDAGOGY_ERROR] La descomposición '${data.title}' no define componentes analíticos.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
