import React from "react";
import { ExerciseData } from "../../content/types";
import { Equation } from "../equations/Equation";

export interface StepByStepSolutionProps {
  exercise: ExerciseData;
  className?: string;
}

export const StepByStepSolution: React.FC<StepByStepSolutionProps> = ({
  exercise,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-4 p-7 bg-[#121829]/90 rounded-2xl border border-[#1E2942] shadow-xl ${className}`}>
      <div>
        <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
          {exercise.level}
        </span>
        <p className="text-sm text-slate-200 mt-1 font-sans leading-relaxed">
          {exercise.prompt}
        </p>
      </div>

      <div className="space-y-3 font-mono">
        {exercise.steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between"
          >
            <span className="text-xs text-[#94A3B8] font-sans">{step.label}:</span>
            {step.math && <Equation latex={step.math} fontSize="text-sm" block={false} />}
            {step.explanation && (
              <span className="text-xs text-[#34D399] font-sans">{step.explanation}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
