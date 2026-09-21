/**
 * src/components/board/BoardEquationWorkbench.tsx
 * Estación de trabajo algebraico interactiva para el Tablero Dinámico.
 * Muestra la ecuación canónica, el desglose de términos por rol semántico
 * y los pasos de cálculo numérico sustituidos progresivamente.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";

export interface WorkbenchTerm {
  symbol: string;
  label: string;
  color: string;
  explanation?: string;
  numericValue?: string;
}

export interface WorkbenchStep {
  label: string;
  latex: string;
  note?: string;
  highlight?: boolean;
}

export interface BoardEquationWorkbenchProps {
  topic?: CourseTopic;
  title?: string;
  formula: string;
  terms?: WorkbenchTerm[];
  steps?: WorkbenchStep[];
  result?: {
    latex: string;
    label?: string;
    interpretation?: string;
  };
  className?: string;
}

export const BoardEquationWorkbench: React.FC<BoardEquationWorkbenchProps> = ({
  topic = "vectors",
  title = "Formulación Analítica",
  formula,
  terms,
  steps,
  result,
  className = "",
}) => {
  const theme = getTopicTheme(topic);

  return (
    <div className={`flex flex-col gap-3.5 w-full ${className}`}>
      {/* Fórmula Principal */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
        {title && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold mb-1.5 self-start">
            {title}
          </span>
        )}
        <div className="w-full flex justify-center py-1 text-slate-900">
          <Equation latex={formula} fontSize="text-2xl" />
        </div>
      </div>

      {/* Desglose de Términos Semánticos (si existen) */}
      {terms && terms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {terms.map((term, idx) => (
            <div
              key={idx}
              style={{ borderLeftColor: term.color }}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 border-l-4 flex items-center justify-between gap-2 text-xs shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  style={{ color: term.color }}
                  className="font-mono font-bold shrink-0 text-sm"
                >
                  <Equation latex={term.symbol} fontSize="text-xs" block={false} />
                </span>
                <div className="truncate">
                  <div className="font-bold text-slate-800 truncate">{term.label}</div>
                  {term.explanation && (
                    <div className="text-[10px] text-slate-500 truncate font-medium">{term.explanation}</div>
                  )}
                </div>
              </div>
              {term.numericValue && (
                <span className="font-mono text-slate-700 font-bold shrink-0 bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] shadow-2xs">
                  {term.numericValue}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pasos Numéricos / Sustitución Progresiva (si existen) */}
      {steps && steps.length > 0 && (
        <div className="space-y-1.5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg border flex items-center justify-between gap-3 text-xs font-mono ${
                step.highlight
                  ? "bg-blue-50/90 border-blue-300 text-blue-950 font-bold shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              <span className="text-slate-600 text-[11px] font-sans font-medium">
                {step.label}
              </span>
              <div className="text-slate-900 font-bold">
                <Equation latex={step.latex} fontSize="text-xs" block={false} />
              </div>
              {step.note && (
                <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
                  ({step.note})
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resultado Final Verificado */}
      {result && (
        <div
          style={{
            backgroundColor: `${theme.result}12`,
            borderColor: `${theme.result}40`,
          }}
          className="p-3 rounded-xl border flex items-center justify-between gap-3 shadow-xs"
        >
          <div>
            <span
              style={{ color: theme.result }}
              className="text-[10px] font-mono uppercase font-extrabold tracking-wider block"
            >
              {result.label || "RESULTADO EXACTO"}
            </span>
            {result.interpretation && (
              <span className="text-xs text-slate-700 font-sans font-medium">
                {result.interpretation}
              </span>
            )}
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono font-bold text-sm shadow-xs">
            <Equation latex={result.latex} fontSize="text-sm" block={false} />
          </div>
        </div>
      )}
    </div>
  );
};
