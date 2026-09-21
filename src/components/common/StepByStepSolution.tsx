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
    <div className={`flex flex-col gap-4 p-7 bg-white rounded-2xl border border-slate-200 shadow-md ${className}`}>
      <div>
        <span className="text-xs uppercase font-extrabold text-blue-600 tracking-widest font-mono">
          {exercise.level}
        </span>
        <p className="text-sm text-slate-800 mt-1 font-sans leading-relaxed">
          {exercise.prompt}
        </p>
      </div>

      <div className="space-y-3 font-mono">
        {exercise.steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-900"
          >
            <span className="text-xs text-slate-600 font-sans font-medium">{step.label}:</span>
            {step.math && <Equation latex={step.math} fontSize="text-sm" block={false} />}
            {step.explanation && (
              <span className="text-xs text-emerald-700 font-sans font-semibold">{step.explanation}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
