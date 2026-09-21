/**
 * src/components/educational/Summary.tsx
 * Síntesis integral de capítulo o curso: pilares conceptuales, fórmulas clave y conexiones.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { LAYERS } from "../../theme/layers";

export interface SummaryPillar {
  title: string;
  keyFormula?: string;
  takeaway: string;
  color?: string;
}

export interface SummaryProps {
  title: string;
  subtitle?: string;
  pillars: SummaryPillar[];
  futureConnection?: string;
  className?: string;
}

export const Summary: React.FC<SummaryProps> = ({
  title,
  subtitle,
  pillars,
  futureConnection,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-7 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-5 ${className}`}
    >
      <div>
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-emerald-800 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
          Síntesis Conceptual
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">{title}</h3>
        {subtitle && (
          <p className="text-xs text-slate-600 mt-1 font-sans font-medium">{subtitle}</p>
        )}
      </div>

      {/* Columnas de Pilares */}
      <div className="grid grid-cols-3 gap-4">
        {pillars.map((pillar, idx) => {
          const color = pillar.color || (idx === 0 ? "#2563EB" : idx === 1 ? "#D97706" : "#059669");
          return (
            <div
              key={idx}
              style={{ borderTopColor: color }}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-t-4 flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div>
                <h4 style={{ color }} className="text-sm font-extrabold">
                  {pillar.title}
                </h4>
                {pillar.keyFormula && (
                  <div className="my-2.5 p-2 rounded-lg bg-white border border-slate-200 flex justify-center shadow-2xs text-slate-900">
                    <Equation latex={pillar.keyFormula} fontSize="text-xs" block={false} />
                  </div>
                )}
                <p className="text-xs text-slate-700 font-sans leading-relaxed mt-2 font-medium">
                  {pillar.takeaway}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conexión con el siguiente nivel */}
      {futureConnection && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-slate-800 shadow-2xs">
          <span className="font-bold font-mono text-blue-700">🚀 Próximo Nivel:</span>
          <span className="font-sans font-medium">{futureConnection}</span>
        </div>
      )}
    </div>
  );
};
