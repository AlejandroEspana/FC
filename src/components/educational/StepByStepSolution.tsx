/**
 * src/components/educational/StepByStepSolution.tsx
 * Resolución analítica secuencial con justificación de cada paso.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { LAYERS } from "../../theme/layers";

export interface SolutionStep {
  number: number;
  label: string;
  math?: string;
  rationale?: string;
}

export interface StepByStepSolutionProps {
  title?: string;
  steps: SolutionStep[];
  className?: string;
}

export const StepByStepSolution: React.FC<StepByStepSolutionProps> = ({
  title = "Deducción Paso a Paso",
  steps,
  className = "",
}) => {
  return (
    <div
      style={{ zIndex: LAYERS.Explanations }}
      className={`p-6 rounded-2xl bg-[#0F172A]/90 border border-[#1E293B] shadow-xl flex flex-col gap-3 ${className}`}
    >
      <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
        {title}
      </span>

      <div className="space-y-2.5 font-mono">
        {steps.map((step) => (
          <div
            key={step.number}
            className="p-3 rounded-xl bg-[#070A12] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-xs font-bold flex items-center justify-center shrink-0">
                {step.number}
              </span>
              <span className="text-xs text-[#94A3B8] font-sans">{step.label}:</span>
            </div>

            {step.math && <Equation latex={step.math} fontSize="text-sm" block={false} />}
            {step.rationale && (
              <span className="text-xs text-[#34D399] font-sans">{step.rationale}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
