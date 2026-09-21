/**
 * src/courses/vectors/scenes/Cap06_Magnitude.tsx
 * Capítulo 06: Magnitud y Norma Euclidiana.
 * La fórmula |v| = √(x² + y²) se construye término a término delante del estudiante,
 * conectada con el Teorema de Pitágoras y el triángulo rectángulo en el plano.
 */

import React from "react";
import { StateDrivenScene } from "../../../engine/state/StateDrivenScene";
import { SceneState } from "../../../engine/state/types";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { MorphingVector2D } from "../../../components/vectors/MorphingVector2D";
import { ProgressiveFormula, FormulaStage } from "../../../components/equations/ProgressiveFormula";
import { VECTORS_COURSE } from "../content/data";
import { EDUCATIONAL_THEME } from "../../../theme/colors";

interface MagnitudeStateData {
  focus: string;
  stageIndex: number;
}

const magnitudeStages: FormulaStage[] = [
  {
    id: "stage_mag_symbol",
    stageFormula: "|\\vec{v}|",
    label: "Magnitud o Norma",
    activeTermKey: "hypotenuse",
    term: {
      symbol: "|\\vec{v}|",
      concept: "Magnitud del Vector",
      why: "Representa la distancia euclidiana escalar entre el punto inicial y la punta de la flecha.",
      color: EDUCATIONAL_THEME.result,
      roleBadge: "Longitud Escalar",
      geometryConnection: "La hipotenusa del triángulo rectángulo (longitud directa)",
    },
    durationFrames: 175,
  },
  {
    id: "stage_radical",
    stageFormula: "|\\vec{v}| = \\sqrt{\\dots}",
    label: "Operador Radical",
    activeTermKey: "hypotenuse",
    term: {
      symbol: "\\sqrt{\\dots}",
      concept: "Raíz Cuadrada Principal",
      why: "Invierte la elevación al cuadrado del Teorema de Pitágoras (c = √(a² + b²)) para devolver dimensiones lineales.",
      color: EDUCATIONAL_THEME.operation,
      roleBadge: "Operador Inverso",
      geometryConnection: "Convierte el área del cuadrado construido sobre la hipotenusa en su longitud lineal",
    },
    durationFrames: 175,
  },
  {
    id: "stage_components_sq",
    stageFormula: "|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}",
    label: "Suma de Cuadrados de Catetos",
    activeTermKey: "components",
    term: {
      symbol: "v_x^2 + v_y^2",
      concept: "Cuadrados de las Componentes Ortogonales",
      why: "Como las componentes son perpendiculares (ángulo de 90°), satisfacen rigurosamente el Teorema de Pitágoras.",
      color: EDUCATIONAL_THEME.studyVariable,
      roleBadge: "Catetos Pitagóricos",
      geometryConnection: "Los lados adyacente y opuesto del triángulo (3² = 9 y 4² = 16)",
    },
    durationFrames: 175,
  },
  {
    id: "stage_calculation",
    stageFormula: "|\\vec{v}| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5",
    label: "Cálculo Numérico Exacto",
    activeTermKey: "hypotenuse",
    term: {
      symbol: "5",
      concept: "Triángulo Notable (3, 4, 5)",
      why: "9 + 16 = 25, y la raíz cuadrada principal de 25 es exactamente 5 unidades.",
      color: EDUCATIONAL_THEME.result,
      roleBadge: "Resultado Final",
      geometryConnection: "El vector (3, 4) tiene una longitud física exacta de 5 unidades",
    },
    durationFrames: 175,
  },
];

const magnitudeSceneState: SceneState<MagnitudeStateData> = {
  initial: { focus: "hypotenuse", stageIndex: 0 },
  states: [
    {
      id: "state_mag_symbol",
      name: "Definición de Magnitud",
      durationFrames: 175,
      data: { focus: "hypotenuse", stageIndex: 0 },
      activeFocus: "hypotenuse",
      narration: "La magnitud o módulo de un vector mide su longitud intrínseca en el espacio euclidiano.",
    },
    {
      id: "state_radical",
      name: "El Radical Pitagórico",
      durationFrames: 175,
      data: { focus: "hypotenuse", stageIndex: 1 },
      activeFocus: "hypotenuse",
      narration: "La raíz cuadrada nos permite recuperar una medida de longitud a partir de las áreas construidas sobre los catetos.",
    },
    {
      id: "state_components_sq",
      name: "Suma de Cuadrados",
      durationFrames: 175,
      data: { focus: "component_x", stageIndex: 2 },
      activeFocus: "component_x",
      narration: "Al ser ortogonales las direcciones X e Y, sumamos los cuadrados de cada componente: tres al cuadrado más cuatro al cuadrado.",
    },
    {
      id: "state_calculation",
      name: "Norma Final Verificada",
      durationFrames: 175,
      data: { focus: "hypotenuse", stageIndex: 3 },
      activeFocus: "hypotenuse",
      narration: "Veinticinco bajo la raíz produce exactamente cinco: la norma euclidiana del vector es 5.",
    },
  ],
};

export const Cap06_Magnitude: React.FC = () => {
  const meta = VECTORS_COURSE.cap06_magnitude;

  return (
    <StateDrivenScene
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="06"
      title={meta.title}
      subtitle={meta.subtitle}
      sceneState={magnitudeSceneState}
    >
      {({ currentData, activeFocus }) => (
        <div className="grid grid-cols-12 gap-8 w-full items-center">
          {/* Mitad Izquierda: Construcción progresiva de la fórmula de la norma */}
          <div className="col-span-6 flex flex-col">
            <ProgressiveFormula
              title="Cálculo de la Norma Euclidiana"
              subtitle="Construcción deductiva basada en el Teorema de Pitágoras"
              stages={magnitudeStages}
              controlledStageIndex={currentData.stageIndex}
            />
          </div>

          {/* Mitad Derecha: Plano Cartesiano con el triángulo pitagórico sombreado continuo */}
          <div className="col-span-6 flex flex-col items-center justify-center p-6 bg-[#0F172A]/90 rounded-2xl border border-[#1E293B] shadow-xl">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs uppercase font-extrabold text-[#34D399] tracking-widest font-mono">
                Triángulo Rectángulo Pitagórico (3, 4, 5)
              </span>
              <span className="text-xs font-mono text-[#34D399] font-bold">
                |v| = 5
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
                phase="magnitude_triangle"
                progress={1}
                label="|\\vec{v}| = 5"
                activeFocus={activeFocus}
              />
            </CoordinatePlane>
          </div>
        </div>
      )}
    </StateDrivenScene>
  );
};
