/**
 * src/components/equations/ProgressiveFormula.tsx
 * Componente de construcción progresiva de fórmulas matemáticas.
 * La fórmula NO aparece completa de golpe: se ensambla término a término delante del estudiante,
 * explicando cada símbolo, su rol matemático y su correspondencia visual.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { Equation } from "./Equation";
import { TermExplanation } from "./TermExplanation";
import { LAYERS } from "../../theme/layers";

export interface FormulaStage {
  id: string;
  stageFormula: string;
  label: string;
  activeTermKey?: string;
  term?: {
    symbol: string;
    concept: string;
    why: string;
    color: string;
    roleBadge?: string;
    geometryConnection?: string;
  };
  durationFrames: number;
}

export interface ProgressiveFormulaProps {
  title: string;
  subtitle?: string;
  stages: FormulaStage[];
  controlledStageIndex?: number;
  className?: string;
}

export const ProgressiveFormula: React.FC<ProgressiveFormulaProps> = ({
  title,
  subtitle,
  stages,
  controlledStageIndex,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Si no está controlado externamente, calcular la etapa activa por frame
  let activeIndex = 0;
  if (controlledStageIndex !== undefined) {
    activeIndex = Math.max(0, Math.min(stages.length - 1, controlledStageIndex));
  } else {
    let accumulated = 0;
    for (let i = 0; i < stages.length; i++) {
      accumulated += stages[i].durationFrames;
      if (frame < accumulated) {
        activeIndex = i;
        break;
      }
      if (i === stages.length - 1) {
        activeIndex = i;
      }
    }
  }

  const currentStage = stages[activeIndex] || stages[0];

  return (
    <div
      style={{ zIndex: LAYERS.Equations }}
      className={`grid grid-cols-12 gap-8 w-full items-center ${className}`}
    >
      {/* Mitad Izquierda: Contenedor de la fórmula que se ensambla en tiempo real */}
      <div className="col-span-6 flex flex-col items-center justify-center p-8 bg-[#0F172A]/95 rounded-2xl border border-[#1E293B] shadow-2xl backdrop-blur-md">
        <div className="text-center mb-5 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
              Construcción Progresiva
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              Etapa {activeIndex + 1} de {stages.length}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto font-sans">{subtitle}</p>
          )}
        </div>

        {/* Pizarra central de la ecuación activa */}
        <div className="w-full min-h-[120px] p-6 rounded-xl bg-[#070A12] border border-[#1E293B] flex items-center justify-center shadow-inner relative overflow-hidden">
          <div className="transition-all duration-300 w-full flex justify-center items-center">
            <Equation latex={currentStage.stageFormula} fontSize="text-3xl" containerWidthPx={550} />
          </div>
        </div>

        {/* Indicador de etapa actual */}
        <div className="mt-4 flex items-center justify-between w-full text-xs text-[#64748B] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-slate-300 font-semibold">{currentStage.label}</span>
          </div>
        </div>
      </div>

      {/* Mitad Derecha: Explicación analítica y geométrica del término activo */}
      <div className="col-span-6 flex flex-col gap-3">
        {currentStage.term ? (
          <TermExplanation
            symbol={currentStage.term.symbol}
            concept={currentStage.term.concept}
            why={currentStage.term.why}
            color={currentStage.term.color}
            roleBadge={currentStage.term.roleBadge || `Término: ${currentStage.label}`}
            geometryConnection={currentStage.term.geometryConnection}
            isActive={true}
          />
        ) : (
          <div className="p-6 rounded-2xl bg-[#0F172A]/80 border border-[#1E293B] text-center">
            <h4 className="text-base font-bold text-white">Fórmula Completa Ensamblada</h4>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              Todos los términos han sido justificados analítica y geométricamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
