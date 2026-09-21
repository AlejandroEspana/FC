/**
 * src/components/educational/MultipleChoice.tsx
 * Simulación de ejercicio interactivo con tiempo para pensar (countdown)
 * y revelación pedagógica justificada de la respuesta correcta.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { Equation } from "../equations/Equation";
import { EDUCATIONAL_THEME } from "../../theme/colors";
import { LAYERS } from "../../theme/layers";

export interface OptionItem {
  id: string; // ej: "A", "B", "C", "D"
  text: string;
  math?: string;
  isCorrect: boolean;
}

export interface MultipleChoiceProps {
  question: string;
  mathContext?: string;
  options: OptionItem[];
  thinkingFrames?: number; // Tiempo de espera antes de revelar la respuesta
  explanation: string;
  className?: string;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  mathContext,
  options,
  thinkingFrames = 180, // 3 segundos por defecto a 60 FPS
  explanation,
  className = "",
}) => {
  const frame = useCurrentFrame();

  const isThinkingPhase = frame < thinkingFrames;
  const countdownProgress = Math.min(1, frame / thinkingFrames);
  const remainingSeconds = Math.max(0, ((thinkingFrames - frame) / 60)).toFixed(1);

  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-7 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-5 ${className}`}
    >
      {/* Pregunta y contexto matemático */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-700 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200">
            Ejercicio Interactivo
          </span>

          {isThinkingPhase ? (
            <span className="text-xs font-mono text-blue-700 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Pausa para pensar: {remainingSeconds}s
            </span>
          ) : (
            <span className="text-xs font-mono text-emerald-700 font-extrabold flex items-center gap-1.5">
              ✓ Respuesta Revelada
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">{question}</h3>

        {mathContext && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 shadow-2xs flex items-center justify-center">
            <Equation latex={mathContext} fontSize="text-xl" block={false} />
          </div>
        )}
      </div>

      {/* Barra de progreso de cuenta regresiva para pensar */}
      {isThinkingPhase && (
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 shadow-inner">
          <div
            style={{ width: `${(1 - countdownProgress) * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-amber-500 transition-all"
          />
        </div>
      )}

      {/* Opciones A, B, C, D */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let optionStyles = "bg-slate-50 border-slate-200 text-slate-800 shadow-2xs";

          if (!isThinkingPhase) {
            if (opt.isCorrect) {
              optionStyles =
                "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/40 shadow-xs";
            } else {
              optionStyles = "bg-slate-50/40 border-slate-200/50 text-slate-400 opacity-60";
            }
          }

          return (
            <div
              key={opt.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-mono font-extrabold flex items-center justify-center ${
                    !isThinkingPhase && opt.isCorrect
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {opt.id}
                </span>
                <span className="text-xs font-sans font-semibold">{opt.text}</span>
              </div>

              {opt.math && <Equation latex={opt.math} fontSize="text-xs" block={false} />}
            </div>
          );
        })}
      </div>

      {/* Explicación tras la revelación */}
      {!isThinkingPhase && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col gap-1 transition-all duration-300 shadow-xs">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-800">
            Solución y Razonamiento:
          </span>
          <p className="text-xs text-slate-700 font-sans leading-relaxed font-medium">{explanation}</p>
        </div>
      )}
    </div>
  );
};
