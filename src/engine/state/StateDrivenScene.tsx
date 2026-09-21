/**
 * src/engine/state/StateDrivenScene.tsx
 * Componente envoltorio de alto nivel para escenas gobernadas por máquinas de estados continuas.
 * Conecta el estado matemático con el diseño visual, la narración pedagógica y las capas.
 */

import React from "react";
import { SceneState } from "./types";
import { useEducationalStateMachine } from "./useEducationalStateMachine";
import { ChapterComposition } from "../../compositions/ChapterComposition";
import { LAYERS } from "../../theme/layers";

export interface StateDrivenSceneProps<T> {
  courseTitle: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  sceneState: SceneState<T>;
  children: (stateContext: ReturnType<typeof useEducationalStateMachine<T>>) => React.ReactNode;
}

export function StateDrivenScene<T>({
  courseTitle,
  chapterNumber,
  title,
  subtitle,
  sceneState,
  children,
}: StateDrivenSceneProps<T>): React.ReactElement {
  const totalDuration = sceneState.states.reduce((sum, s) => sum + s.durationFrames, 0);
  const stateContext = useEducationalStateMachine(sceneState);
  const { currentState, stateIndex, narration } = stateContext;
  const totalStates = sceneState.states.length;

  return (
    <ChapterComposition
      courseTitle={courseTitle}
      chapterNumber={chapterNumber}
      title={title}
      subtitle={subtitle}
      durationFrames={totalDuration}
    >
      <div className="w-full h-full flex flex-col justify-between relative">
        {/* Barra superior de progreso de conceptos dentro del capítulo */}
        <div
          style={{ zIndex: LAYERS.UI }}
          className="w-full flex items-center justify-between px-2 mb-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
              Fase {stateIndex + 1} de {totalStates}
            </span>
            <span className="text-xs text-[#64748B] font-mono">•</span>
            <span className="text-xs font-semibold text-[#94A3B8] font-sans">
              {currentState.name || currentState.id}
            </span>
          </div>

          {/* Indicador de pasos visual tipo píldoras */}
          <div className="flex items-center gap-1.5">
            {sceneState.states.map((st, i) => (
              <div
                key={st.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stateIndex
                    ? "w-8 bg-[#38BDF8]"
                    : i < stateIndex
                    ? "w-3 bg-[#34D399]"
                    : "w-3 bg-[#1E2942]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenido principal inyectado con el contexto continuo */}
        <div className="flex-1 w-full flex items-center justify-center relative">
          {children(stateContext)}
        </div>

        {/* Subtítulo / Narración pedagógica activa contextual */}
        {narration && (
          <div
            style={{ zIndex: LAYERS.Explanations }}
            className="w-full mt-3 p-3 rounded-xl bg-[#0F172A]/90 border border-[#1E2942] backdrop-blur-md flex items-center justify-center shadow-lg"
          >
            <p className="text-sm font-medium text-slate-200 text-center font-sans tracking-wide">
              {narration}
            </p>
          </div>
        )}
      </div>
    </ChapterComposition>
  );
}
