/**
 * src/components/educational/GradualDifficultyWorkbench.tsx
 * Estación de Trabajo Pedagógica con Dificultad Gradual en 3 Niveles:
 * - Nivel 1: Básico / Intuitivo (Lectura directa, cálculo aritmético simple)
 * - Nivel 2: Intermedio / Operativo (Problema inverso, despeje analítico en pasos)
 * - Nivel 3: Avanzado / Reto Desafío (Tridimensional, caso límite, demostración)
 * Diseñado con estética de pizarra blanca técnica de alto contraste.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";

export type DifficultyLevel = "basic" | "intermediate" | "advanced";

export interface GradualStep {
  label: string;
  math: string;
  explanation?: string;
  highlight?: boolean;
}

export interface GradualExerciseTier {
  level: DifficultyLevel;
  levelBadge?: string;
  title: string;
  statement: string;
  givenData?: { label: string; value: string; color?: string }[];
  targetVariable?: string;
  steps: GradualStep[];
  result: {
    math: string;
    label?: string;
    interpretation?: string;
  };
  keyTakeaway?: string;
  visualComponent?: React.ReactNode;
}

export interface GradualDifficultyWorkbenchProps {
  topic?: CourseTopic;
  activeLevel?: DifficultyLevel;
  tiers: GradualExerciseTier[];
  className?: string;
}

export const GradualDifficultyWorkbench: React.FC<GradualDifficultyWorkbenchProps> = ({
  topic = "vectors",
  activeLevel = "basic",
  tiers,
  className = "",
}) => {
  const theme = getTopicTheme(topic);

  // Encontrar el tier activo o usar el primero
  const currentTier = tiers.find((t) => t.level === activeLevel) || tiers[0];

  const getLevelConfig = (lvl: DifficultyLevel) => {
    switch (lvl) {
      case "basic":
        return {
          label: "Nivel 1: Básico",
          color: "#059669",
          bgColor: "#ECFDF5",
          borderColor: "#A7F3D0",
          icon: "🟢",
        };
      case "intermediate":
        return {
          label: "Nivel 2: Intermedio",
          color: "#D97706",
          bgColor: "#FFFBEB",
          borderColor: "#FDE68A",
          icon: "🟡",
        };
      case "advanced":
        return {
          label: "Nivel 3: Avanzado",
          color: "#DC2626",
          bgColor: "#FEF2F2",
          borderColor: "#FECACA",
          icon: "🔴",
        };
    }
  };

  const activeConfig = getLevelConfig(currentTier.level);

  return (
    <div
      className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-4 w-full ${className}`}
    >
      {/* 1. Selector de Dificultad Gradual (Tier Indicator) */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {tiers.map((tier) => {
            const cfg = getLevelConfig(tier.level);
            const isSelected = tier.level === currentTier.level;
            return (
              <div
                key={tier.level}
                style={{
                  backgroundColor: isSelected ? cfg.bgColor : "#F8FAFC",
                  borderColor: isSelected ? cfg.color : "#E2E8F0",
                  color: isSelected ? cfg.color : "#64748B",
                  fontWeight: isSelected ? 800 : 600,
                }}
                className={`px-3 py-1 rounded-full border text-xs font-mono flex items-center gap-1.5 transition-all duration-200 shadow-2xs`}
              >
                <span>{cfg.icon}</span>
                <span>{tier.levelBadge || cfg.label}</span>
              </div>
            );
          })}
        </div>

        {currentTier.targetVariable && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-500">Incógnita:</span>
            <div className="font-bold text-slate-900">
              <Equation latex={currentTier.targetVariable} fontSize="text-xs" block={false} />
            </div>
          </div>
        )}
      </div>

      {/* 2. Enunciado del Problema */}
      <div>
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          {currentTier.title}
        </h3>
        <p className="text-xs text-slate-700 mt-1 leading-relaxed font-sans font-medium">
          {currentTier.statement}
        </p>
      </div>

      {/* 3. Datos Dados (si existen) */}
      {currentTier.givenData && currentTier.givenData.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentTier.givenData.map((d, i) => (
            <div
              key={i}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-2xs"
            >
              <span className="text-[11px] font-sans font-bold text-slate-600">{d.label}:</span>
              <div style={{ color: d.color || theme.primary }}>
                <Equation latex={d.value} fontSize="text-xs" block={false} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Desarrollo Paso a Paso */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-500">
          Desarrollo Paso a Paso:
        </span>
        {currentTier.steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono ${
              step.highlight
                ? "bg-blue-50/80 border-blue-200 text-blue-950 font-bold shadow-xs"
                : "bg-slate-50 border-slate-200 text-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                style={{ backgroundColor: activeConfig.color }}
                className="w-5 h-5 rounded-full text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0 shadow-xs"
              >
                {idx + 1}
              </span>
              <span className="font-sans font-semibold text-slate-800">{step.label}</span>
              {step.explanation && (
                <span className="text-[10px] font-sans text-slate-500 hidden md:inline">
                  ({step.explanation})
                </span>
              )}
            </div>

            <div className="text-slate-900 font-bold shrink-0 self-end sm:self-auto">
              <Equation latex={step.math} fontSize="text-xs" block={false} />
            </div>
          </div>
        ))}
      </div>

      {/* 5. Resultado Final Verificado */}
      <div
        style={{
          backgroundColor: `${theme.result}10`,
          borderColor: `${theme.result}35`,
        }}
        className="p-3.5 rounded-xl border flex items-center justify-between gap-4 shadow-xs"
      >
        <div>
          <span
            style={{ color: theme.result }}
            className="text-[10px] font-mono uppercase font-black tracking-wider block"
          >
            {currentTier.result.label || "RESULTADO VERIFICADO"}
          </span>
          {currentTier.result.interpretation && (
            <p className="text-xs text-slate-700 font-sans mt-0.5 font-medium">
              {currentTier.result.interpretation}
            </p>
          )}
        </div>
        <div className="p-2 px-3.5 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono font-bold text-sm shadow-2xs">
          <Equation latex={currentTier.result.math} fontSize="text-sm" block={false} />
        </div>
      </div>

      {/* 6. Regla Mnemotécnica / Takeaway */}
      {currentTier.keyTakeaway && (
        <div className="px-3.5 py-2 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-sans flex items-center gap-2">
          <span className="text-sm">💡</span>
          <span className="font-medium">
            <strong className="font-bold">Regla Clave: </strong>
            {currentTier.keyTakeaway}
          </span>
        </div>
      )}
    </div>
  );
};
