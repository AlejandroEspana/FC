/**
 * src/components/educational/ErrorAnalysis.tsx
 * Componente para detección y corrección de errores conceptuales comunes (Tipo 5).
 * Contrasta el planteamiento erróneo con la deducción rigurosa y explica el porqué.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface ErrorAnalysisProps {
  title: string;
  misconception: string;
  wrongDerivation: { label: string; math: string };
  correctDerivation: { label: string; math: string };
  diagnosis: string;
  className?: string;
}

export const ErrorAnalysis: React.FC<ErrorAnalysisProps> = ({
  title,
  misconception,
  wrongDerivation,
  correctDerivation,
  diagnosis,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-4 ${className}`}
    >
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FB7185] px-2.5 py-0.5 rounded-full bg-[#FB7185]/10 border border-[#FB7185]/20">
            Detección de Falacias & Errores
          </span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">{misconception}</p>
      </div>

      {/* Contraste Lado a Lado: Incorrecto vs Correcto */}
      <div className="grid grid-cols-2 gap-4">
        {/* Columna Incorrecta (Rojo/Coral) */}
        <div className="p-4 rounded-xl bg-[#FB7185]/10 border border-[#FB7185]/30 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FB7185]">
            <span>✗</span>
            <span>Planteamiento Incorrecto</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans">{wrongDerivation.label}</p>
          <div className="mt-1 p-2.5 rounded-lg bg-[#070A12] border border-[#FB7185]/40 flex justify-center">
            <Equation latex={wrongDerivation.math} fontSize="text-sm" block={false} />
          </div>
        </div>

        {/* Columna Correcta (Esmeralda) */}
        <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#34D399]">
            <span>✓</span>
            <span>Procedimiento Válido</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans">{correctDerivation.label}</p>
          <div className="mt-1 p-2.5 rounded-lg bg-[#070A12] border border-[#34D399]/40 flex justify-center">
            <Equation latex={correctDerivation.math} fontSize="text-sm" block={false} />
          </div>
        </div>
      </div>

      {/* Diagnóstico Pedagógico */}
      <div className="p-3.5 rounded-xl bg-[#070A12] border border-[#1E293B]">
        <span className="text-[11px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider block mb-1">
          Diagnóstico y Regla Fundamental:
        </span>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">{diagnosis}</p>
      </div>
    </div>
  );
};
