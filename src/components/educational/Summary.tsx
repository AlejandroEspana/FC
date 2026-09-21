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
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-5 ${className}`}
    >
      <div>
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#34D399] px-2.5 py-0.5 rounded-full bg-[#34D399]/10 border border-[#34D399]/20">
          Síntesis Conceptual
        </span>
        <h3 className="text-2xl font-bold text-white tracking-tight mt-1.5">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#94A3B8] mt-1 font-sans">{subtitle}</p>
        )}
      </div>

      {/* Columnas de Pilares */}
      <div className="grid grid-cols-3 gap-4">
        {pillars.map((pillar, idx) => {
          const color = pillar.color || (idx === 0 ? "#38BDF8" : idx === 1 ? "#FACC15" : "#34D399");
          return (
            <div
              key={idx}
              style={{ borderTopColor: color }}
              className="p-4 rounded-xl bg-[#070A12]/80 border border-[#1E293B] border-t-4 flex flex-col justify-between gap-3"
            >
              <div>
                <h4 style={{ color }} className="text-sm font-bold">
                  {pillar.title}
                </h4>
                {pillar.keyFormula && (
                  <div className="my-2.5 p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] flex justify-center">
                    <Equation latex={pillar.keyFormula} fontSize="text-xs" block={false} />
                  </div>
                )}
                <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2">
                  {pillar.takeaway}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conexión con el siguiente nivel */}
      {futureConnection && (
        <div className="p-3.5 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold font-mono text-[#38BDF8]">🚀 Próximo Nivel:</span>
          <span className="font-sans">{futureConnection}</span>
        </div>
      )}
    </div>
  );
};
