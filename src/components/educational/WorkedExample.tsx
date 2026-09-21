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
      className={`p-7 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-5 ${className}`}
    >
      {/* Encabezado y Enunciado */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-blue-700 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200">
            {typeBadge}
          </span>
          {targetVariable && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              <span className="font-bold">Incógnita:</span>
              <Equation latex={targetVariable} fontSize="text-xs" block={false} />
            </div>
          )}
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-sans font-medium">{prompt}</p>
      </div>

      {/* Datos Iniciales Dados */}
      {givenData && givenData.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {givenData.map((d, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-2xs"
            >
              <span className="text-[11px] text-slate-600 font-sans font-bold">{d.label}:</span>
              <div className="text-slate-900 font-bold">
                <Equation latex={d.value} fontSize="text-xs" block={false} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pasos de Resolución */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-mono font-black flex items-center justify-center shrink-0 shadow-xs">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold text-slate-800 font-sans">{step.label}</span>
            </div>

            {step.math && (
              <div className="shrink-0 text-slate-900 font-bold">
                <Equation latex={step.math} fontSize="text-sm" block={false} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resultado Final Destacado */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-black text-emerald-800 tracking-wider font-mono block">
            Resultado Verificado
          </span>
          {finalResult.interpretation && (
            <p className="text-xs text-slate-700 font-sans mt-0.5 font-medium">
              {finalResult.interpretation}
            </p>
          )}
        </div>
        <div className="p-2 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 shadow-xs">
          <Equation latex={finalResult.math} fontSize="text-lg" block={false} />
        </div>
      </div>
    </div>
  );
};
