/**
 * src/courses/matrices/scenes/Cap05_MultiplicationAlgorithm.tsx
 * Capítulo 05: El Algoritmo de Multiplicación: Fila × Columna al Máximo Detalle.
 * Rediseñado como Tablero Científico Dinámico con colores claros de Matrices.
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardCallout,
  BoardWipeTransition,
} from "../../../components/board";
import { MatrixMultiplicationStep } from "../../../components/matrices/MatrixMultiplicationStep";
import { MATRICES_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "c11", label: "1. Fila 1 de A · Columna 1 de B -> Elemento c_11" },
  { id: "c21", label: "2. Fila 2 de A · Columna 1 de B -> Elemento c_21" },
];

export const Cap05_MultiplicationAlgorithm: React.FC = () => {
  const frame = useCurrentFrame();
  const meta = MATRICES_COURSE.cap05_multiplication_algorithm;
  const theme = TOPIC_THEMES.matrices;

  // 2 fases de 375 frames (total 750 frames = 12.5s @ 60 FPS)
  const currentPhaseIndex = frame < 375 ? 0 : 1;

  let activeTakeaway = "Algoritmo Fila × Columna: El elemento c_ij es la suma de los productos de la fila i de A por la columna j de B.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Cada celda de la matriz resultante C es el resultado de un producto escalar independiente.";
  }

  return (
    <DynamicBoardLayout
      topic="matrices"
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="05"
      title="El Algoritmo Fila × Columna"
      subtitle="Cálculo Paso a Paso de Elementos c_ij Mediante Productos Escalares Sincronizados"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: CÁLCULO DE C_11 (0..375 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={375} name="CalculoC11">
        <BoardWipeTransition
          durationInFrames={375}
          wipeDurationFrames={35}
          direction="left-to-right"
          wiperColor="#2563EB"
          showIndicator={true}
        >
          <div className="w-full h-full flex flex-col items-center justify-center px-4 gap-4">
            <BoardPanel
              tag="ALGORITMO EN ACCIÓN"
              title="Paso 1: Fila 1 de A · Columna 1 de B"
              topic="matrices"
              accentColor={theme.primary}
              className="w-full max-w-4xl"
            >
              <MatrixMultiplicationStep
                A={meta.matrixA}
                B={meta.matrixB}
                C={meta.matrixC}
                currentRow={0}
                currentCol={0}
              />
            </BoardPanel>

            <BoardCallout
              type="insight"
              topic="matrices"
              title="Fórmula del Término General"
              text="c_ij = sum_{k=1}^n a_ik * b_kj. Multiplica cada elemento de la fila horizontal por el elemento homólogo de la columna vertical y suma los resultados."
              math="c_{11} = a_{11} b_{11} + a_{12} b_{21}"
              className="w-full max-w-4xl"
            />
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: CÁLCULO DE C_21 (375..750 frames)
          ========================================================================= */}
      <Sequence from={375} durationInFrames={375} name="CalculoC21">
        <div className="w-full h-full flex flex-col items-center justify-center px-4 gap-4">
          <BoardPanel
            tag="ALGORITMO EN ACCIÓN"
            title="Paso 2: Fila 2 de A · Columna 1 de B"
            topic="matrices"
            accentColor={theme.secondary}
            className="w-full max-w-4xl"
          >
            <MatrixMultiplicationStep
              A={meta.matrixA}
              B={meta.matrixB}
              C={meta.matrixC}
              currentRow={1}
              currentCol={0}
            />
          </BoardPanel>

          <BoardCallout
            type="application"
            topic="matrices"
            title="Complejidad Computacional O(n³)"
            text="Multiplicar dos matrices n × n requiere n³ multiplicaciones escalares y n²(n - 1) sumas. Algoritmos avanzados como Strassen logran O(n^{2.807}) para acelerar el entrenamiento de redes neuronales."
            className="w-full max-w-4xl"
          />
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
