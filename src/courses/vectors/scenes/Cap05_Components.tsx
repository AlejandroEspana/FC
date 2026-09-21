/**
 * src/courses/vectors/scenes/Cap05_Components.tsx
 * Capítulo 05: Descomposición Ortogonal y Componentes Vectoriales.
 * Conecta en tiempo real la fórmula canónica con las proyecciones en el plano cartesiano.
 */

import React from "react";
import { StateDrivenScene } from "../../../engine/state/StateDrivenScene";
import { SceneState } from "../../../engine/state/types";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { MorphingVector2D } from "../../../components/vectors/MorphingVector2D";
import { ProgressiveFormula, FormulaStage } from "../../../components/equations/ProgressiveFormula";
import { VECTORS_COURSE } from "../content/data";
import { EDUCATIONAL_THEME } from "../../../theme/colors";

interface ComponentsStateData {
  focus: string;
  stageIndex: number;
  activeTermExplanation: string;
}

const componentsStages: FormulaStage[] = [
  {
    id: "stage_vector",
    stageFormula: "\\vec{v}",
    label: "Vector en el Espacio",
    activeTermKey: "vector",
    term: {
      symbol: "\\vec{v}",
      concept: "Vector Resultante Total",
      why: "El objeto matemático indivisible antes de ser descompuesto en un sistema de referencia.",
      color: EDUCATIONAL_THEME.primary,
      roleBadge: "Vector Original",
      geometryConnection: "Flecha completa desde el origen hasta el punto (3, 4)",
    },
    durationFrames: 175,
  },
  {
    id: "stage_vx",
    stageFormula: "\\vec{v} = v_x\\hat{i}",
    label: "Componente Horizontal X",
    activeTermKey: "component_x",
    term: {
      symbol: "v_x\\hat{i}",
      concept: "Proyección sobre el Eje de las Abscisas",
      why: "Multiplica el valor escalar v_x = 3 por el vector unitario canónico î = (1, 0).",
      color: EDUCATIONAL_THEME.originalData,
      roleBadge: "Eje X",
      geometryConnection: "Segmento cian proyectado horizontalmente sobre el eje X (longitud = 3)",
    },
    durationFrames: 175,
  },
  {
    id: "stage_vy",
    stageFormula: "\\vec{v} = v_x\\hat{i} + v_y\\hat{j}",
    label: "Componente Vertical Y",
    activeTermKey: "component_y",
    term: {
      symbol: "v_y\\hat{j}",
      concept: "Proyección sobre el Eje de las Ordenadas",
      why: "Multiplica el valor escalar v_y = 4 por el vector unitario canónico ĵ = (0, 1).",
      color: EDUCATIONAL_THEME.studyVariable,
      roleBadge: "Eje Y",
      geometryConnection: "Segmento ámbar proyectado verticalmente sobre el cateto opuesto (longitud = 4)",
    },
    durationFrames: 175,
  },
  {
    id: "stage_full",
    stageFormula: "\\vec{v} = 3\\hat{i} + 4\\hat{j} = (3, 4)",
    label: "Descomposición Completa",
    activeTermKey: "full",
    term: {
      symbol: "(3, 4)",
      concept: "Base Ortonormal Canónica",
      why: "Cualquier vector en R² se expresa como combinación lineal única de los versores ortogonales î y ĵ.",
      color: EDUCATIONAL_THEME.result,
      roleBadge: "Combinación Lineal",
      geometryConnection: "La suma punta-cola de v_x·î + v_y·ĵ reconstruye exactamente el vector original v",
    },
    durationFrames: 175,
  },
];

const componentsSceneState: SceneState<ComponentsStateData> = {
  initial: {
    focus: "vector",
    stageIndex: 0,
    activeTermExplanation: "Vector original sin descomponer.",
  },
  states: [
    {
      id: "state_vector",
      name: "Vector Inicial",
      durationFrames: 175,
      data: { focus: "vector", stageIndex: 0, activeTermExplanation: "Observación del vector en el plano cartesiano." },
      activeFocus: "vector",
      narration: "En un plano bidimensional, cualquier vector puede entenderse como la suma de dos movimientos independientes y perpendiculares.",
    },
    {
      id: "state_vx",
      name: "Componente Horizontal",
      durationFrames: 175,
      data: { focus: "component_x", stageIndex: 1, activeTermExplanation: "Proyección sobre el eje horizontal X." },
      activeFocus: "component_x",
      narration: "La componente v_x mide cuánto avanza el vector a lo largo del eje horizontal X.",
    },
    {
      id: "state_vy",
      name: "Componente Vertical",
      durationFrames: 175,
      data: { focus: "component_y", stageIndex: 2, activeTermExplanation: "Proyección sobre el eje vertical Y." },
      activeFocus: "component_y",
      narration: "La componente v_y mide cuánto se desplaza verticalmente a lo largo del eje Y.",
    },
    {
      id: "state_full",
      name: "Suma Canónica",
      durationFrames: 175,
      data: { focus: "full", stageIndex: 3, activeTermExplanation: "Ecuación vectorial canónica consolidada." },
      activeFocus: "full",
      narration: "Juntas, v_x en dirección de î y v_y en dirección de ĵ forman la descomposición canónica exacta del vector.",
    },
  ],
};

export const Cap05_Components: React.FC = () => {
  const meta = VECTORS_COURSE.cap05_components;

  return (
    <StateDrivenScene
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="05"
      title={meta.title}
      subtitle={meta.subtitle}
      sceneState={componentsSceneState}
    >
      {({ currentData, activeFocus }) => (
        <div className="grid grid-cols-12 gap-8 w-full items-center">
          {/* Mitad Izquierda: Construcción progresiva de la fórmula canónica */}
          <div className="col-span-6 flex flex-col">
            <ProgressiveFormula
              title="Descomposición Canónica en R²"
              subtitle="Construcción término a término de la combinación lineal ortogonal"
              stages={componentsStages}
              controlledStageIndex={currentData.stageIndex}
            />
          </div>

          {/* Mitad Derecha: Plano Cartesiano con proyecciones sincronizadas por color */}
          <div className="col-span-6 flex flex-col items-center justify-center p-6 bg-[#0F172A]/90 rounded-2xl border border-[#1E293B] shadow-xl">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
                Sincronización Geométrica
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                Foco Activo: <strong className="text-white">{activeFocus}</strong>
              </span>
            </div>

            <CoordinatePlane
              width={560}
              height={400}
              xRange={[-0.5, 4.5]}
              yRange={[-0.5, 4.5]}
            >
              <MorphingVector2D
                from={[0, 0]}
                to={[3, 4]}
                phase="components"
                progress={1}
                label="\\vec{v} = (3, 4)"
                activeFocus={activeFocus}
              />
            </CoordinatePlane>
          </div>
        </div>
      )}
    </StateDrivenScene>
  );
};
