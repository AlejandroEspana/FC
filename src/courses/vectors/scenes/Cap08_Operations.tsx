/**
 * src/courses/vectors/scenes/Cap08_Operations.tsx
 * Capítulo 08: Operaciones Vectoriales Fundamentales al Máximo Detalle.
 * Rediseñado como Tablero Científico Dinámico:
 * - Fase 1: Suma Vectorial (Punta-Cola, Paralelogramo y Componentes)
 * - Fase 2: Resta Vectorial (Vector Opuesto y Desplazamiento Relativo)
 * - Fase 3: Multiplicación por Escalar (Homotecia en 5 Regímenes)
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
import { VectorSumGraph } from "../../../components/vectors/VectorSumGraph";
import { VectorSubtractionGraph } from "../../../components/vectors/VectorSubtractionGraph";
import { ScalarMultGraph } from "../../../components/vectors/ScalarMultGraph";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "sum", label: "1. Suma Punta-Cola & Paralelogramo" },
  { id: "sub", label: "2. Resta & Desplazamiento Relativo" },
  { id: "scale", label: "3. Multiplicación Escalar & Homotecia" },
];

export const Cap08_Operations: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 300 frames por fase (900 frames totales = 15 segundos @ 60 FPS)
  const currentPhaseIndex = frame < 300 ? 0 : frame < 600 ? 1 : 2;

  let activeTakeaway = "Suma Vectorial: u + v combina desplazamientos y satisface la conmutatividad.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Resta Vectorial: u - v equivale a sumar el vector opuesto u + (-v).";
  } else if (currentPhaseIndex === 2) {
    activeTakeaway = "Escalamiento: c·v preserva la recta directriz (colinealidad) e invierte sentido si c < 0.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="08"
      title="Operaciones Vectoriales en Detalle"
      subtitle="Suma Geométrica y Analítica, Vector Opuesto y Homotecia Escalar"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={3}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: SUMA VECTORIAL (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_SumaVectorial">
        <BoardWipeTransition topic="vectors" durationInFrames={300} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Formulación Analítica & Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="ÁLGEBRA & PROPIEDADES"
                title="Adición Término a Término"
                topic="vectors"
                accentColor={theme.primary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Ecuación de Superposición Vectorial"
                  formula="\vec{w} = \vec{u} + \vec{v} = (u_x + v_x)\hat{i} + (u_y + v_y)\hat{j}"
                  terms={[
                    { symbol: "\\vec{u}", label: "Primer Vector", color: theme.primary, numericValue: "(3, 1)" },
                    { symbol: "\\vec{v}", label: "Segundo Vector", color: theme.secondary, numericValue: "(1.5, 2.5)" },
                  ]}
                  steps={[
                    { label: "Suma en Abscisas X:", latex: "w_x = 3.0 + 1.5 = 4.5", highlight: true },
                    { label: "Suma en Ordenadas Y:", latex: "w_y = 1.0 + 2.5 = 3.5", highlight: true },
                  ]}
                  result={{
                    latex: "\\vec{w} = (4.5, \\; 3.5)",
                    label: "VECTOR RESULTANTE TOTAL",
                    interpretation: "Une el origen inicial con la punta final tras la traslación.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="axiom"
                topic="vectors"
                title="Axioma de Conmutatividad y Paralelogramo"
                text="El orden de los sumandos no altera el resultado: u + v = v + u. Ambas trayectorias trazan los lados del mismo paralelogramo cuya diagonal principal es w."
                math="\vec{u} + \vec{v} = \vec{v} + \vec{u}"
              />
            </div>

            {/* Columna Derecha: Tablero Gráfico Interactivo */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="ESPACIO GEOMÉTRICO 2D"
                title="Método Punta-Cola y Regla del Paralelogramo"
                topic="vectors"
                accentColor={theme.result}
                delay={10}
              >
                <VectorSumGraph u={[3, 1]} v={[1.5, 2.5]} mode="both" />
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: RESTA VECTORIAL (300..600 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={300} name="Fase_RestaVectorial">
        <BoardWipeTransition topic="vectors" durationInFrames={300} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Definición del Opuesto & Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="DEFINICIÓN FORMAL"
                title="Resta como Suma con el Opuesto"
                topic="vectors"
                accentColor={theme.warning}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Diferencia de Vectores"
                  formula="\vec{d} = \vec{u} - \vec{v} = \vec{u} + (-\vec{v})"
                  terms={[
                    { symbol: "\\vec{u}", label: "Vector Minuendo", color: theme.primary, numericValue: "(4, 2)" },
                    { symbol: "-\\vec{v}", label: "Vector Opuesto", color: theme.warning, numericValue: "(-1.5, -3)" },
                  ]}
                  steps={[
                    { label: "Resta en Abscisas X:", latex: "d_x = 4.0 - 1.5 = 2.5", highlight: true },
                    { label: "Resta en Ordenadas Y:", latex: "d_y = 2.0 - 3.0 = -1.0", highlight: true },
                  ]}
                  result={{
                    latex: "\\vec{d} = (2.5, \\; -1.0)",
                    label: "VECTOR DIFERENCIA RELATIVA",
                    interpretation: "Representa el desplazamiento desde la punta de v hasta la punta de u.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="physics"
                topic="vectors"
                title="Cinemática y Posición Relativa"
                text="En física, la resta de vectores r_rel = r_A - r_B describe exactamente cómo ve el observador B al móvil A en el espacio."
                math="\\vec{r}_{A/B} = \\vec{r}_A - \\vec{r}_B"
              />
            </div>

            {/* Columna Derecha: Gráfico de Inversión y Puntas */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="GEOMETRÍA DEL VECTOR OPUESTO"
                title="Inversión a 180° y Desplazamiento Entre Puntas"
                topic="vectors"
                accentColor={theme.warning}
                delay={10}
              >
                <VectorSubtractionGraph u={[4, 2]} v={[1.5, 3]} />
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 3: MULTIPLICACIÓN POR ESCALAR (600..900 frames)
          ========================================================================= */}
      <Sequence from={600} durationInFrames={300} name="Fase_Escalamiento">
        <BoardWipeTransition topic="vectors" durationInFrames={300} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Los 5 Casos de Homotecia */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="HOMOTECIA CONTINUA"
                title="Escalamiento y Colinealidad"
                topic="vectors"
                accentColor={theme.secondary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Multiplicación por un Escalar Real c"
                  formula="c\\vec{v} = (c \\cdot v_x)\\hat{i} + (c \\cdot v_y)\\hat{j}"
                  steps={[
                    { label: "Caso c > 1:", latex: "2\\vec{v} = (4, 2)", note: "Dilatación sin cambio de sentido" },
                    { label: "Caso 0 < c < 1:", latex: "0.5\\vec{v} = (1, 0.5)", note: "Contracción sin cambio de sentido" },
                    { label: "Caso c = 0:", latex: "0\\vec{v} = (0, 0) = \\vec{0}", note: "Colapso al origen nulo" },
                    { label: "Caso c < 0:", latex: "-1.5\\vec{v} = (-3, -1.5)", note: "Inversión estricta de 180°" },
                  ]}
                  result={{
                    latex: "|c\\vec{v}| = |c| \\cdot |\\vec{v}|",
                    label: "PROPIEDAD DE LA NORMA",
                    interpretation: "La longitud se multiplica por el valor absoluto del escalar.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="insight"
                topic="vectors"
                title="Preservación de la Recta Directriz"
                text="La multiplicación escalar altera la magnitud y puede invertir el sentido, pero JAMÁS cambia la inclinación de la recta directriz que sustenta al vector."
                math="\\forall c \\neq 0: \\quad c\\vec{v} \\parallel \\vec{v}"
              />
            </div>

            {/* Columna Derecha: Gráfico Dinámico de Homotecia */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="HOMOTECIA EN TIEMPO REAL"
                title="Evolución Continua del Factor Escalar c"
                topic="vectors"
                accentColor={theme.secondary}
                delay={10}
              >
                <ScalarMultGraph />
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>
    </DynamicBoardLayout>
  );
};
