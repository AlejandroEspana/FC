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
      className={`p-7 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-5 ${className}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-purple-700 px-3 py-0.5 rounded-full bg-purple-50 border border-purple-200">
            Comparación Metodológica
          </span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-slate-700 mt-1 leading-relaxed font-sans font-medium">{description}</p>
        )}
      </div>

      {/* Tarjetas Lado a Lado */}
      <div className="grid grid-cols-2 gap-4">
        {[methodA, methodB].map((m, idx) => {
          const accent = m.color || (idx === 0 ? "#2563EB" : "#D97706");
          return (
            <div
              key={idx}
              style={{ borderTopColor: accent }}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-t-4 flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{ color: accent }}
                    className="text-[11px] font-mono font-extrabold uppercase tracking-wider"
                  >
                    {m.badge}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">{m.name}</h4>

                {m.formula && (
                  <div className="my-2 p-2 rounded-lg bg-white border border-slate-200 flex justify-center shadow-2xs text-slate-900">
                    <Equation latex={m.formula} fontSize="text-xs" block={false} />
                  </div>
                )}

                <div className="mt-3 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-black text-emerald-700 block">
                    Ventajas:
                  </span>
                  {m.pros.map((p, i) => (
                    <p key={i} className="text-[11px] text-slate-700 font-medium flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> {p}
                    </p>
                  ))}
                </div>

                <div className="mt-2.5 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-black text-rose-700 block">
                    Limitaciones:
                  </span>
                  {m.cons.map((c, i) => (
                    <p key={i} className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                      <span className="text-rose-600 font-bold">•</span> {c}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] shadow-2xs">
                <span className="text-slate-500 font-bold">Cuándo usar: </span>
                <span className="text-slate-800 font-medium">{m.bestFor}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
