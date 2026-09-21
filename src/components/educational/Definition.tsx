/**
 * src/components/educational/Definition.tsx
 * Componente de Definición Formal y Rigurosa con nota de intuición geométrica.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface DefinitionProps {
  category?: string;
  title: string;
  statement: string;
  formula?: string;
  intuition?: string;
  accentColor?: string;
  className?: string;
}

export const Definition: React.FC<DefinitionProps> = ({
  category = "Definición Formal",
  title,
  statement,
  formula,
  intuition,
  accentColor = EDUCATIONAL_THEME.primary,
  className = "",
}) => {
  return (
    <div
      style={{
        zIndex: LAYERS.Explanations,
        borderLeftColor: accentColor,
      }}
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] border-l-4 shadow-2xl backdrop-blur-md flex flex-col gap-4 ${className}`}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <span
          style={{ color: accentColor }}
          className="text-xs font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
        >
          {category}
        </span>
        <span className="text-xs text-[#64748B] font-mono">Rigor Matemático</span>
      </div>

      <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>

      {/* Enunciado formal */}
      <p className="text-sm text-slate-200 leading-relaxed font-sans">{statement}</p>

      {/* Fórmula central si existe */}
      {formula && (
        <div className="my-1 p-5 rounded-xl bg-[#070A12] border border-[#1E293B] flex items-center justify-center shadow-inner overflow-hidden">
          <Equation latex={formula} fontSize="text-2xl" containerWidthPx={700} />
        </div>
      )}

      {/* Nota de intuición geométrica / física */}
      {intuition && (
        <div className="p-3.5 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-start gap-2.5">
          <span className="text-sm">💡</span>
          <div>
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider block font-mono">
              Intuición Conceptual:
            </span>
            <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">{intuition}</p>
          </div>
        </div>
      )}
    </div>
  );
};
