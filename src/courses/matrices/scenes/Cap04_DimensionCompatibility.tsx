/**
 * src/courses/matrices/scenes/Cap04_DimensionCompatibility.tsx
 * Capítulo 04: Compatibilidad Dimensional para la Multiplicación Matricial.
 * Rediseñado como Tablero Científico Dinámico con colores claros de Matrices.
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardEquationWorkbench,
  BoardCallout,
  BoardWipeTransition,
} from "../../../components/board";
import { MATRICES_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "inner_rule", label: "1. Regla de Índices Internos Compartidos" },
  { id: "examples", label: "2. Casos Válidos vs Dimensiones Incompatibles" },
];

export const Cap04_DimensionCompatibility: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.matrices;

  // 2 fases de 325 frames (total 650 frames = 10.8s @ 60 FPS)
  const currentPhaseIndex = frame < 325 ? 0 : 1;

  let activeTakeaway = "Regla de Oro: El número de columnas de A debe coincidir exactamente con el número de filas de B.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Si las dimensiones internas difieren, la multiplicación NO existe (error de compilación matemática).";
  }

  return (
    <DynamicBoardLayout
      topic="matrices"
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="04"
      title="Compatibilidad Dimensional Matricial"
      subtitle="La Regla de Índices Internos, Dimensiones Externas Resultantes y Casos de Incompatibilidad"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: LA REGLA DE LOS ÍNDICES INTERNOS (0..325 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={325} name="Fase_ReglaIndices">
        <BoardWipeTransition
          durationInFrames={325}
          wipeDurationFrames={32}
          direction="left-to-right"
          wiperColor="#2563EB"
          showIndicator={true}
        >
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Ecuación y Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="CONDICIÓN DE EXISTENCIA"
                title="Alineación de Índices Internos"
                topic="matrices"
                accentColor={theme.primary}
              >
                <BoardEquationWorkbench
                  topic="matrices"
                  title="Ecuación Dimensional General"
                  formula="A_{(m \times n)} \cdot B_{(n \times p)} = C_{(m \times p)}"
                  terms={[
                    { symbol: "n", label: "Índice Interno Común", color: theme.tertiary, explanation: "Cols de A = Filas de B" },
                    { symbol: "m \\times p", label: "Dimensión Resultante", color: theme.result, explanation: "Filas de A × Cols de B" },
                  ]}
                  steps={[
                    { label: "Matriz A:", latex: "A \\in \\mathbb{R}^{2 \\times 3} \\quad (2\\text{ filas, } 3\\text{ columnas})" },
                    { label: "Matriz B:", latex: "B \\in \\mathbb{R}^{3 \\times 4} \\quad (3\\text{ filas, } 4\\text{ columnas})", highlight: true },
                  ]}
                  result={{
                    latex: "C = A \\cdot B \\in \\mathbb{R}^{2 \\times 4}",
                    label: "PRODUCTO COMPATIBLE EXISTENTE",
                    interpretation: "Hereda las 2 filas de A y las 4 columnas de B.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="axiom"
                topic="matrices"
                title="¿Por qué deben ser iguales?"
                text="Cada elemento c_ij es el producto punto de una fila de A por una columna de B. Si la fila tiene 3 elementos y la columna tiene 2, no se pueden emparejar los términos término a término."
              />
            </div>

            {/* Columna Derecha: Esquema Visual de Índices */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="ESQUEMA NEMOTÉCNICO"
                title="Inspección Visual de Dimensiones"
                topic="matrices"
                accentColor={theme.secondary}
              >
                <div className="flex flex-col items-center justify-center p-6 gap-4 font-mono text-center">
                  <div className="flex items-center gap-3 text-2xl font-bold">
                    <span className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 shadow-sm">
                      (m × <strong className="text-amber-700 underline font-black">n</strong>)
                    </span>
                    <span className="text-slate-400 text-xl">×</span>
                    <span className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-sm">
                      (<strong className="text-amber-700 underline font-black">n</strong> × p)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-sans font-semibold">Los índices internos marcados en ámbar DEBEN coincidir exactamente</span>
                  </div>

                  <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm shadow-sm">
                    Matriz Resultante: <strong className="text-emerald-700 text-base font-bold font-mono">{"C_(m × p)"}</strong>
                  </div>
                </div>
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: CASOS VÁLIDOS VS INCOMPATIBLES (325..650 frames)
          ========================================================================= */}
      <Sequence from={325} durationInFrames={325} name="Fase_Casos">
        <BoardWipeTransition
          durationInFrames={325}
          wipeDurationFrames={32}
          direction="right-to-left"
          wiperColor="#059669"
          showIndicator={true}
        >
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Tarjeta de Casos Válidos */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="CASOS PERMITIDOS"
                title="Ejemplos de Productos Válidos"
                topic="matrices"
                accentColor={theme.result}
              >
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-slate-800">
                    <span className="font-sans font-medium text-slate-700">Caso 1: Vector Fila × Columna</span>
                    <span className="text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-md border border-emerald-200">(1 × 3) · (3 × 1) = (1 × 1)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-slate-800">
                    <span className="font-sans font-medium text-slate-700">Caso 2: Cuadradas de orden n</span>
                    <span className="text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-md border border-emerald-200">(3 × 3) · (3 × 3) = (3 × 3)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-slate-800">
                    <span className="font-sans font-medium text-slate-700">Caso 3: Rectangulares mixtas</span>
                    <span className="text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-md border border-emerald-200">(4 × 2) · (2 × 5) = (4 × 5)</span>
                  </div>
                </div>
              </BoardPanel>
            </div>

            {/* Tarjeta de Incompatibilidades */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="CASOS INVÁLIDOS"
                title="Ejemplos de Incompatibilidad Fatal"
                topic="matrices"
                accentColor={theme.warning}
              >
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800">
                    <span className="font-sans font-medium">(3 × 2) · (3 × 2)</span>
                    <span className="font-bold font-sans bg-white px-2.5 py-1 rounded-md border border-rose-200 text-rose-600">ERROR: 2 ≠ 3</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800">
                    <span className="font-sans font-medium">(2 × 4) · (3 × 4)</span>
                    <span className="font-bold font-sans bg-white px-2.5 py-1 rounded-md border border-rose-200 text-rose-600">ERROR: 4 ≠ 3</span>
                  </div>
                </div>
              </BoardPanel>

              <BoardCallout
                type="warning"
                topic="matrices"
                title="La Consecuencia de la No-Conmutatividad"
                text="Incluso cuando A · B existe (ej. 2×3 por 3×4), el producto inverso B · A (3×4 por 2×3) generalmente NI SIQUIERA está definido dimensionalmente."
              />
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>
    </DynamicBoardLayout>
  );
};
