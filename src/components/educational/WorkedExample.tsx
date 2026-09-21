/**
 * src/components/educational/WorkedExample.tsx
 * Componente para Ejemplos Guiados Resueltos Paso a Paso con rigor pedagógico.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface WorkedStep {
  label: string;
  math?: string;
  explanation: string;
}

export interface WorkedExampleProps {
  typeBadge?: string;
  title: string;
  prompt: string;
  givenData?: { label: string; value: string }[];
  targetVariable?: string;
  steps: WorkedStep[];
  finalResult: { math: string; interpretation?: string };
  className?: string;
}

export const WorkedExample: React.FC<WorkedExampleProps> = ({
  typeBadge = "Ejemplo Resuelto",
  title,
  prompt,
  givenData,
  targetVariable,
  steps,
  finalResult,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-5 ${className}`}
    >
      {/* Encabezado y Enunciado */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#38BDF8] px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
            {typeBadge}
          </span>
          {targetVariable && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#FACC15]">
              <span>Incógnita:</span>
              <Equation latex={targetVariable} fontSize="text-xs" block={false} />
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">{prompt}</p>
      </div>

      {/* Datos Iniciales Dados */}
      {givenData && givenData.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {givenData.map((d, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-lg bg-[#070A12] border border-[#1E293B] flex items-center gap-2"
            >
              <span className="text-[11px] text-[#94A3B8] font-sans">{d.label}:</span>
              <Equation latex={d.value} fontSize="text-xs" block={false} />
            </div>
          ))}
        </div>
      )}

      {/* Pasos de Resolución */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#070A12]/80 border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-xs font-medium text-slate-200 font-sans">{step.label}</span>
            </div>

            {step.math && (
              <div className="shrink-0">
                <Equation latex={step.math} fontSize="text-sm" block={false} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resultado Final Destacado */}
      <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#34D399] tracking-wider font-mono block">
            Resultado Verificado
          </span>
          {finalResult.interpretation && (
            <p className="text-xs text-emerald-200/90 font-sans mt-0.5">
              {finalResult.interpretation}
            </p>
          )}
        </div>
        <div className="p-2 px-4 rounded-lg bg-[#070A12] border border-[#34D399]/40">
          <Equation latex={finalResult.math} fontSize="text-lg" block={false} />
        </div>
      </div>
    </div>
  );
};
