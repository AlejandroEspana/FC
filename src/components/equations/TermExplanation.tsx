/**
 * src/components/equations/TermExplanation.tsx
 * Tarjeta pedagógica profunda que responde rigurosamente a:
 * 1. ¿Qué representa el símbolo?
 * 2. ¿Por qué aparece en la fórmula?
 * 3. ¿Cómo se refleja en la geometría o física del problema?
 */

import React from "react";
import { Equation } from "./Equation";
import { LAYERS } from "../../theme/layers";

export interface TermExplanationProps {
  symbol: string;
  concept: string;
  why: string;
  color?: string;
  roleBadge?: string;
  geometryConnection?: string;
  isActive?: boolean;
}

export const TermExplanation: React.FC<TermExplanationProps> = ({
  symbol,
  concept,
  why,
  color = "#38BDF8",
  roleBadge = "Término Activo",
  geometryConnection,
  isActive = true,
}) => {
  return (
    <div
      style={{
        zIndex: LAYERS.Explanations,
        borderLeftColor: color,
        boxShadow: isActive ? `0 0 20px ${color}20` : undefined,
      }}
      className={`p-5 rounded-2xl bg-[#0F172A]/90 border border-[#1E293B] border-l-4 transition-all duration-300 flex flex-col gap-3 backdrop-blur-md ${
        isActive ? "ring-1 ring-white/10" : "opacity-80"
      }`}
    >
      {/* Encabezado con símbolo KaTeX y concepto */}
      <div className="flex items-center gap-4">
        <div
          style={{
            backgroundColor: `${color}18`,
            borderColor: `${color}40`,
            color: color,
          }}
          className="min-w-[3.75rem] w-auto max-w-[12rem] px-3.5 py-1.5 h-14 rounded-xl border flex items-center justify-center font-bold shrink-0 text-lg font-mono shadow-inner overflow-hidden"
        >
          <Equation latex={symbol} fontSize="text-lg" block={false} containerWidthPx={180} />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              style={{ color }}
              className="text-[10px] font-extrabold tracking-wider uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
            >
              {roleBadge}
            </span>
          </div>
          <h4 className="text-base font-bold text-white tracking-tight mt-0.5">{concept}</h4>
        </div>
      </div>

      {/* Explicación de por qué aparece */}
      <div className="p-3 rounded-xl bg-[#070A12]/80 border border-[#1E293B]">
        <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1 font-mono">
          ¿Por qué aparece en la fórmula?
        </span>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">{why}</p>
      </div>

      {/* Conexión con la geometría o física */}
      {geometryConnection && (
        <div className="flex items-start gap-2 text-xs text-[#34D399] bg-[#34D399]/10 p-2.5 rounded-lg border border-[#34D399]/20">
          <span className="font-bold font-mono">🔗 Geometría:</span>
          <span className="font-sans text-emerald-200">{geometryConnection}</span>
        </div>
      )}
    </div>
  );
};
