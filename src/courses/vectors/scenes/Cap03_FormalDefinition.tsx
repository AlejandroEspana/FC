/**
 * src/courses/vectors/scenes/Cap03_FormalDefinition.tsx
 * Capítulo 03: Definición Formal de Vector Euclidiano y Axiomas.
 * Rediseñado como Tablero Científico Dinámico.
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardEquationWorkbench,
  BoardCallout,
} from "../../../components/board";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "formal_def", label: "1. Definición Formal en R^n" },
  { id: "axioms", label: "2. Axiomas del Espacio Vectorial" },
];

export const Cap03_FormalDefinition: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 300 frames (total 600 frames = 10s @ 60 FPS)
  const currentPhaseIndex = frame < 300 ? 0 : 1;

  let activeTakeaway = "Un vector es un elemento de un espacio vectorial dotado de suma interna y producto por escalares.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Los 8 axiomas de Peano garantizan la consistencia algebraica en cualquier dimensión n.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="03"
      title="Definición Formal de Vector Euclidiano"
      subtitle="Axiomática del Espacio Vectorial, Propiedades de Grupo Abeliano y Cuerpos de Escalares"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: DEFINICIÓN FORMAL EN R^n (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_DefinicionFormal">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Definición Rigurosa */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="RIGOR ALGEBRAICO"
              title="El Vector como Elemento de R^n"
              topic="vectors"
              accentColor={theme.primary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Estructura Formal"
                formula="\vec{v} = (v_1, v_2, \dots, v_n) \in \mathbb{R}^n, \quad \|\vec{v}\| \ge 0"
                steps={[
                  { label: "1. Magnitud Euclidiana:", latex: "\\|\\vec{v}\\| = \\sqrt{\\sum_{i=1}^n v_i^2} \\ge 0", highlight: true },
                  { label: "2. Vector Nulo Exclusivo:", latex: "\\|\\vec{v}\\| = 0 \\iff \\vec{v} = \\vec{0} = (0, 0, \\dots, 0)" },
                ]}
                result={{
                  latex: "(V, +, \\cdot, \\mathbb{R})",
                  label: "ESPACIO VECTORIAL FORMAL",
                  interpretation: "Conjunto cerrado bajo adición de vectores y ponderación escalar.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="axiom"
              topic="vectors"
              title="Independencia del Origen"
              text="Aunque usualmente anclamos el vector en el origen (0,0), un vector euclidiano es un objeto geométrico libre: dos flechas con igual longitud, dirección paralela y mismo sentido representan exactamente el mismo vector."
            />
          </div>

          {/* Columna Derecha: Gráfica del Vector en R² */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="ESPACIO VECTORIAL R²"
              title="Vector en Posición Estándar v = (3.5, 2.5)"
              topic="vectors"
              accentColor={theme.result}
            >
              <CoordinatePlane width={540} height={380} xRange={[-1, 5]} yRange={[-1, 4]}>
                <Vector2D from={[0, 0]} to={[3.5, 2.5]} color={theme.result} label="\\vec{v} = (3.5, 2.5)" strokeWidth={4.5} showComponents={true} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: LOS AXIOMAS DEL ESPACIO VECTORIAL (300..600 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={300} name="Fase_Axiomas">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Clausura y Operaciones */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="LEYES DE CLAUSURA"
              title="Cerradura bajo Suma y Escalamiento"
              topic="vectors"
              accentColor={theme.secondary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Condiciones de Estructura Lineal"
                formula="\forall \\vec{u}, \\vec{v} \\in V, \\; \\forall c \\in \\mathbb{R}: \\quad \\vec{u} + \\vec{v} \\in V, \\quad c\\vec{v} \\in V"
                steps={[
                  { label: "1. Clausura en la Suma:", latex: "\\vec{u} + \\vec{v} \\in V \\quad (\\text{Nunca escapa del espacio})" },
                  { label: "2. Clausura en el Producto:", latex: "c \\cdot \\vec{v} \\in V \\quad (\\text{Preserva la pertenencia al espacio})" },
                  { label: "3. Existencia del Cero:", latex: "\\exists \\vec{0} \\in V : \\quad \\vec{v} + \\vec{0} = \\vec{v}", highlight: true },
                ]}
                result={{
                  latex: "\\vec{v} + (-\vec{v}) = \\vec{0}",
                  label: "ELEMENTO SIMÉTRICO INVERSO",
                  interpretation: "Todo vector posee un opuesto unívoco con el que se cancela al origen.",
                }}
              />
            </BoardPanel>
          </div>

          {/* Columna Derecha: Resumen de los Axiomas */}
          <div className="col-span-6 flex flex-col gap-3">
            <BoardPanel
              tag="LOS 8 PILARES AXIOMÁTICOS"
              title="Axiomas de Espacio Vectorial"
              topic="vectors"
              accentColor={theme.tertiary}
            >
              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">1. Conmutatividad:</span>
                  <span className="font-mono text-blue-700 font-bold">u + v = v + u</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">2. Asociatividad:</span>
                  <span className="font-mono text-amber-700 font-bold">(u + v) + w = u + (v + w)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">3. Distributividad Escalar:</span>
                  <span className="font-mono text-emerald-700 font-bold">c(u + v) = cu + cv</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">4. Elemento Unidad:</span>
                  <span className="font-mono text-purple-700 font-bold">1 · v = v</span>
                </div>
              </div>
            </BoardPanel>

            <BoardCallout
              type="application"
              topic="vectors"
              title="Escalabilidad Dimensional Infinita"
              text="Gracias a estos axiomas, el álgebra vectorial funciona idénticamente en 2 dimensiones, en 3 dimensiones o en espacios funcionales de Hilbert de dimensión infinita."
            />
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
