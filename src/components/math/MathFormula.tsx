import React, { useMemo } from "react";
import katex from "katex";

interface MathFormulaProps {
  math: string;
  block?: boolean;
  className?: string;
  fontSize?: string; // e.g. "text-3xl", "text-5xl"
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  block = true,
  className = "",
  fontSize = "text-4xl",
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (e) {
      return math;
    }
  }, [math, block]);

  return (
    <div
      className={`font-mono text-white ${fontSize} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
