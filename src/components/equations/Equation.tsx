/**
 * src/components/equations/Equation.tsx
 * Renderizador KaTeX reactivo con prevención absoluta de desbordamiento (Overflow-Proof).
 * Calcula predictivamente el ancho y aplica escalamiento adaptativo automático si la fórmula
 * excede el contenedor, garantizando que NUNCA desborde los márgenes.
 */

import React, { useMemo } from "react";
import katex from "katex";
import { estimateFormulaDimensions } from "../../layout/measurements";

export interface EquationProps {
  latex: string;
  color?: string;
  fontSize?: string; // e.g. "text-3xl", "text-2xl", "text-xl", "text-base", etc.
  block?: boolean;
  containerWidthPx?: number; // Ancho disponible del contenedor en píxeles
  className?: string;
}

export const Equation: React.FC<EquationProps> = ({
  latex,
  color,
  fontSize = "text-2xl",
  block = true,
  containerWidthPx = 600,
  className = "",
}) => {
  // Limpieza defensiva de secuencias mal escapadas
  const cleanLatex = useMemo(() => {
    if (!latex) return "";
    return latex.trim();
  }, [latex]);

  const measurement = useMemo(
    () => estimateFormulaDimensions(cleanLatex, containerWidthPx, fontSize),
    [cleanLatex, containerWidthPx, fontSize]
  );

  const effectiveFontSize = measurement.recommendedFontSize;
  const scale = measurement.scaleFactor;

  const html = useMemo(() => {
    try {
      return katex.renderToString(cleanLatex, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return `<span style="color: #FB7185;">Error de KaTeX: ${cleanLatex}</span>`;
    }
  }, [cleanLatex, block]);

  if (!cleanLatex) return null;

  return (
    <div
      className={`${
        block
          ? "w-full max-w-full flex justify-center items-center my-1.5 overflow-hidden"
          : "inline-flex items-center justify-center max-w-full overflow-hidden"
      } ${className}`}
    >
      <div
        style={{
          transform: scale < 0.99 ? `scale(${scale.toFixed(3)})` : undefined,
          transformOrigin: "center center",
          color: color || undefined,
          maxWidth: "100%",
        }}
        className={`transition-transform duration-200 ${effectiveFontSize}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
