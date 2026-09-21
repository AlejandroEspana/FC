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
      className={`p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-5 ${className}`}
    >
      {/* Pregunta y contexto matemático */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FACC15] px-2.5 py-0.5 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20">
            Ejercicio Interactivo
          </span>

          {isThinkingPhase ? (
            <span className="text-xs font-mono text-[#38BDF8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              Pausa para pensar: {remainingSeconds}s
            </span>
          ) : (
            <span className="text-xs font-mono text-[#34D399] font-bold flex items-center gap-1.5">
              ✓ Respuesta Revelada
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight leading-snug">{question}</h3>

        {mathContext && (
          <div className="mt-2.5 p-3 rounded-xl bg-[#070A12] border border-[#1E293B] flex items-center justify-center">
            <Equation latex={mathContext} fontSize="text-xl" block={false} />
          </div>
        )}
      </div>

      {/* Barra de progreso de cuenta regresiva para pensar */}
      {isThinkingPhase && (
        <div className="w-full bg-[#070A12] rounded-full h-1.5 overflow-hidden border border-[#1E293B]">
          <div
            style={{ width: `${(1 - countdownProgress) * 100}%` }}
            className="h-full bg-gradient-to-r from-[#38BDF8] to-[#FACC15] transition-all"
          />
        </div>
      )}

      {/* Opciones A, B, C, D */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          let optionStyles = "bg-[#070A12]/80 border-[#1E293B] text-slate-200";

          if (!isThinkingPhase) {
            if (opt.isCorrect) {
              optionStyles =
                "bg-[#34D399]/15 border-[#34D399] text-white ring-2 ring-[#34D399]/40";
            } else {
              optionStyles = "bg-[#070A12]/40 border-[#1E293B]/40 text-slate-500 opacity-60";
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
                      ? "bg-[#34D399] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {opt.id}
                </span>
                <span className="text-xs font-sans">{opt.text}</span>
              </div>

              {opt.math && <Equation latex={opt.math} fontSize="text-xs" block={false} />}
            </div>
          );
        })}
      </div>

      {/* Explicación tras la revelación */}
      {!isThinkingPhase && (
        <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex flex-col gap-1 transition-all duration-300">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#34D399]">
            Solución y Razonamiento:
          </span>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};
