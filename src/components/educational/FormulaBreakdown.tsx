/**
 * src/components/educational/FormulaBreakdown.tsx
 * Componente modular para desglose integral de fórmulas matemáticas.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface FormulaPart {
  symbol: string;
  name: string;
  color: string;
  description: string;
  roleBadge?: string;
}

export interface FormulaBreakdownProps {
  formula: string;
  title: string;
  subtitle?: string;
  parts: FormulaPart[];
  className?: string;
}

export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({
  formula,
  title,
  subtitle,
  parts,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Equations }}
      className={`grid grid-cols-12 gap-6 w-full items-center ${className}`}
    >
      {/* Mitad izquierda: Fórmula */}
      <div className="col-span-5 flex flex-col items-center justify-center p-7 bg-[#0F172A]/95 rounded-2xl border border-[#1E293B] shadow-2xl backdrop-blur-md">
        <span className="text-[10px] uppercase font-extrabold text-[#38BDF8] tracking-widest block mb-1.5 font-mono">
          Estructura Analítica
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight text-center">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#94A3B8] mt-1 text-center font-sans">{subtitle}</p>
        )}

        <div className="w-full mt-4 p-5 rounded-xl bg-[#070A12] border border-[#1E293B] flex items-center justify-center shadow-inner overflow-hidden">
          <Equation latex={formula} fontSize="text-2xl" containerWidthPx={550} />
        </div>
      </div>

      {/* Mitad derecha: Desglose de cada parte */}
      <div className="col-span-7 flex flex-col gap-2.5">
        {parts.map((p, idx) => (
          <div
            key={idx}
            style={{ borderLeftColor: p.color }}
            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0F172A]/80 border border-[#1E293B] border-l-4 shadow-sm"
          >
            <div
              style={{
                backgroundColor: `${p.color}15`,
                borderColor: `${p.color}40`,
                color: p.color,
              }}
              className="min-w-[3rem] w-auto max-w-[10rem] px-3 py-1.5 h-12 rounded-lg border flex items-center justify-center font-bold shrink-0 text-sm font-mono shadow-inner overflow-hidden"
            >
              <Equation latex={p.symbol} fontSize="text-sm" block={false} containerWidthPx={150} />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span style={{ color: p.color }} className="text-xs font-bold">
                  {p.name}
                </span>
                {p.roleBadge && (
                  <span className="text-[9px] font-mono text-[#94A3B8] px-1.5 py-0.5 rounded bg-white/5">
                    {p.roleBadge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-snug mt-0.5">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
