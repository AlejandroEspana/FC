/**
 * src/courses/vectors/scenes/Cap11_Projections.tsx
 * Capítulo 11: Proyecciones Escalares y Vectoriales al Máximo Detalle.
 * Rediseñado como Tablero Científico Dinámico:
 * - Fase 1: Sombra Escalar y Vector Proyección Ortogonal
 * - Fase 2: Descomposición Ortogonal (Paralela + Perpendicular) y Gram-Schmidt
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
import { VectorProjectionGraph } from "../../../components/vectors/VectorProjectionGraph";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "proj_vector", label: "1. Proyección Escalar vs Vectorial" },
  { id: "decomp", label: "2. Descomposición Ortogonal u = u_|| + u_perp" },
];

export const Cap11_Projections: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 350 frames cada una (total 700 frames = 11.6s @ 60 FPS)
  const currentPhaseIndex = frame < 350 ? 0 : 1;

  let activeTakeaway = "La proyección vectorial proj_v(u) extrae la sombra dirigida de u sobre la recta generada por v.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Descomposición Ortogonal: Todo vector se descompone de forma única en una parte paralela y una parte normal.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="11"
      title="Proyecciones Ortogonales en Detalle"
      subtitle="Componente Escalar, Vector Sombra y Descomposición Canónica"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: PROYECCIÓN ESCALAR VS VECTORIAL (0..350 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={350} name="Fase_ProyeccionVectorial">
        <BoardWipeTransition topic="vectors" durationInFrames={350} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Ecuaciones y Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="FORMULACIÓN EXACTA"
                title="De la Sombra Escalar al Vector Proyección"
                topic="vectors"
                accentColor={theme.primary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Vector Proyección Ortogonal"
                  formula="\mathrm{proj}_{\vec{v}}(\vec{u}) = \left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|^2} \right) \vec{v}"
                  terms={[
                    { symbol: "\\mathrm{comp}", label: "Componente Escalar", color: theme.secondary, numericValue: "3.0" },
                    { symbol: "\\mathrm{proj}", label: "Vector Sombra", color: theme.result, numericValue: "(3.0, 0.0)" },
                  ]}
                  steps={[
                    { label: "1. Producto Escalar u · v:", latex: "(3)(4.5) + (3.5)(0) = 13.5" },
                    { label: "2. Norma al Cuadrado ||v||²:", latex: "(4.5)^2 + (0)^2 = 20.25" },
                    { label: "3. Factor de Escala:", latex: "c = 13.5 / 20.25 = 2/3 \\approx 0.667", highlight: true },
                  ]}
                  result={{
                    latex: "\\mathrm{proj}_{\\vec{v}}(\\vec{u}) = \\frac{2}{3}(4.5, \\; 0) = (3.0, \\; 0.0)",
                    label: "VECTOR PROYECCIÓN",
                    interpretation: "Vector colineal a v con longitud igual a la sombra proyectada.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="insight"
                topic="vectors"
                title="Diferencia Crucial: Escalar vs Vector"
                text="La componente escalar comp_v(u) es solo la longitud con signo (un número real). La proyección vectorial proj_v(u) multiplica ese escalar por el versor unitario de v para darle dirección."
                math="\mathrm{proj}_{\vec{v}}(\vec{u}) = \mathrm{comp}_{\vec{v}}(\vec{u}) \cdot \hat{v}"
              />
            </div>

            {/* Columna Derecha: Gráfico 2D de Proyección */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="ESPACIO GEOMÉTRICO 2D"
                title="Caída Perpendicular con Ángulo Recto de 90°"
                topic="vectors"
                accentColor={theme.result}
                delay={10}
              >
                <VectorProjectionGraph
                  u={[3, 3.5]}
                  v={[4.5, 0]}
                  showDecomposition={false}
                />
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: DESCOMPOSICIÓN ORTOGONAL (350..700 frames)
          ========================================================================= */}
      <Sequence from={350} durationInFrames={350} name="Fase_DescomposicionOrtogonal">
        <BoardWipeTransition topic="vectors" durationInFrames={350} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Componente Residual Perpendicular */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="TEOREMA DE DESCOMPOSICIÓN"
                title="Separación en Componente Paralela y Normal"
                topic="vectors"
                accentColor={theme.result}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Descomposición Ortogonal de u"
                  formula="\vec{u} = \vec{u}_\parallel + \vec{u}_\perp = \mathrm{proj}_{\vec{v}}(\vec{u}) + (\vec{u} - \mathrm{proj}_{\vec{v}}(\vec{u}))"
                  steps={[
                    { label: "Parte Paralela u_||:", latex: "\\vec{u}_\\parallel = (3.0, \\; 0.0)" },
                    { label: "Parte Ortogonal u_perp:", latex: "\\vec{u}_\\perp = (3.0, 3.5) - (3.0, 0.0) = (0.0, \\; 3.5)", highlight: true },
                    { label: "Test de Ortogonalidad:", latex: "\\vec{u}_\\parallel \\cdot \\vec{u}_\\perp = (3.0)(0) + (0)(3.5) = 0" },
                  ]}
                  result={{
                    latex: "\\vec{u}_\\parallel \\perp \\vec{u}_\\perp \\implies |\\vec{u}|^2 = |\\vec{u}_\\parallel|^2 + |\\vec{u}_\\perp|^2",
                    label: "PITÁGORAS GENERALIZADO",
                    interpretation: "La energía de la norma euclidiana se conserva perfectamente.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="application"
                topic="vectors"
                title="Base del Algoritmo de Gram-Schmidt"
                text="Este principio es el núcleo del proceso de Gram-Schmidt: tomar una base arbitraria de vectores y restar sucesivamente sus proyecciones para generar una base ortonormal perfecta para computación gráfica y machine learning."
              />
            </div>

            {/* Columna Derecha: Gráfico con Descomposición Completa */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="SÍNTESIS GEOMÉTRICA"
                title="Vectores Paralelo y Perpendicular en Acción"
                topic="vectors"
                accentColor={theme.warning}
                delay={10}
              >
                <VectorProjectionGraph
                  u={[3, 3.5]}
                  v={[4.5, 0]}
                  showDecomposition={true}
                />
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>
    </DynamicBoardLayout>
  );
};
