/**
 * src/components/educational/ConceptComparison.tsx
 * Comparación pedagógica de dos conceptos o métodos de solución alternativos (Tipo 6).
 * Analiza ventajas, limitaciones y escenarios recomendados para cada enfoque.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface MethodComparisonItem {
  name: string;
  badge: string;
  formula?: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  color?: string;
}

export interface ConceptComparisonProps {
  title: string;
  description?: string;
  methodA: MethodComparisonItem;
  methodB: MethodComparisonItem;
  className?: string;
}

export const ConceptComparison: React.FC<ConceptComparisonProps> = ({
  title,
  description,
  methodA,
  methodB,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-5 ${className}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#A855F7] px-2.5 py-0.5 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
            Comparación Metodológica
          </span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">{description}</p>
        )}
      </div>

      {/* Tarjetas Lado a Lado */}
      <div className="grid grid-cols-2 gap-4">
        {[methodA, methodB].map((m, idx) => {
          const accent = m.color || (idx === 0 ? "#38BDF8" : "#FACC15");
          return (
            <div
              key={idx}
              style={{ borderTopColor: accent }}
              className="p-4 rounded-xl bg-[#070A12]/80 border border-[#1E293B] border-t-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{ color: accent }}
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                  >
                    {m.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{m.name}</h4>

                {m.formula && (
                  <div className="my-2 p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] flex justify-center">
                    <Equation latex={m.formula} fontSize="text-xs" block={false} />
                  </div>
                )}

                <div className="mt-3 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#34D399] block">
                    Ventajas:
                  </span>
                  {m.pros.map((p, i) => (
                    <p key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> {p}
                    </p>
                  ))}
                </div>

                <div className="mt-2.5 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#FB7185] block">
                    Limitaciones:
                  </span>
                  {m.cons.map((c, i) => (
                    <p key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="text-rose-400">•</span> {c}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#0F172A] border border-white/5 text-[11px]">
                <span className="text-[#94A3B8] font-semibold">Cuándo usar: </span>
                <span className="text-slate-200">{m.bestFor}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
