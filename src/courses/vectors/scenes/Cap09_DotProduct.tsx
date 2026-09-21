/**
 * src/courses/vectors/scenes/Cap09_DotProduct.tsx
 * Capítulo 09: El Producto Punto (Escalar) con Máximo Detalle.
 * Rediseñado como Tablero Científico Dinámico:
 * - Fase 1: La Doble Naturaleza (Fórmula Algebraica vs Geométrica)
 * - Fase 2: Criterio Fundamental de Ortogonalidad y Signo del Coseno
 * - Fase 3: Extracción del Ángulo y Trabajo Mecánico en Física
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
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "nature", label: "1. Doble Definición: Álgebra vs Coseno" },
  { id: "ortho", label: "2. Criterio de Ortogonalidad & Signos" },
  { id: "angle", label: "3. Cálculo del Ángulo & Trabajo Físico" },
];

export const Cap09_DotProduct: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 3 fases de 270 frames cada una (810 frames totales = 13.5s @ 60 FPS)
  const currentPhaseIndex = frame < 270 ? 0 : frame < 540 ? 1 : 2;

  let activeTakeaway = "El producto escalar produce un NÚMERO REAL (escalar), jamás un vector.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Test de Perpendicularidad: u · v = 0 si y solo si u es ortogonal a v (con vectores no nulos).";
  } else if (currentPhaseIndex === 2) {
    activeTakeaway = "Física: El trabajo mecánico W = F · d mide la transferencia neta de energía en la dirección del movimiento.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="09"
      title="El Producto Punto al Máximo Detalle"
      subtitle="Equivalencia Geométrica-Algebraica, Criterio de Ortogonalidad y Ángulo Relativo"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={3}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: LA DOBLE NATURALEZA (0..270 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={270} name="Fase_DobleNaturaleza">
        <BoardWipeTransition topic="vectors" durationInFrames={270} wipeDurationFrames={30}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Ecuación y Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="EQUIVALENCIA DUAL"
                title="Formulación Algebraica y Geométrica"
                topic="vectors"
                accentColor={theme.primary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Producto Escalar Estándar"
                  formula="\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y = \|\vec{u}\| \|\vec{v}\| \cos(\theta)"
                  terms={[
                    { symbol: "\\vec{u}", label: "Vector Base", color: theme.primary, numericValue: "(4.0, 0.0)" },
                    { symbol: "\\vec{v}", label: "Vector Inclinado", color: theme.secondary, numericValue: "(2.0, 2.5)" },
                  ]}
                  steps={[
                    { label: "Producto en X:", latex: "(u_x)(v_x) = (4.0)(2.0) = 8.0", highlight: true },
                    { label: "Producto en Y:", latex: "(u_y)(v_y) = (0.0)(2.5) = 0.0", highlight: true },
                    { label: "Suma de Productos:", latex: "8.0 + 0.0 = 8.0" },
                  ]}
                  result={{
                    latex: "\\vec{u} \cdot \vec{v} = 8.0 \\;\\in \\mathbb{R}",
                    label: "ESCALAR NETO OBTENIDO",
                    interpretation: "Un único número real que cuantifica la coincidencia direccional.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="warning"
                topic="vectors"
                title="Falacia Muy Frecuente en Exámenes"
                text="El producto punto NUNCA genera un vector. Escribir u · v = (8, 0) es un error conceptual grave; el resultado carece de dirección y flecha."
                math="\vec{u} \cdot \vec{v} \in \\mathbb{R} \quad (\\text{NO } \\mathbb{R}^2)"
              />
            </div>

            {/* Columna Derecha: Gráfico de Proyección y Solape */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="INTERPRETACIÓN GEOMÉTRICA"
                title="Solapamiento Direccional de u y v"
                topic="vectors"
                accentColor={theme.result}
                delay={10}
              >
                <CoordinatePlane width={540} height={380} xRange={[-0.5, 5]} yRange={[-0.5, 3.5]}>
                  {/* Vector u horizontal */}
                  <Vector2D from={[0, 0]} to={[4, 0]} color={theme.primary} label="\\vec{u} = (4, 0)" strokeWidth={4.5} delay={5} />
                  {/* Vector v inclinado */}
                  <Vector2D from={[0, 0]} to={[2, 2.5]} color={theme.secondary} label="\\vec{v} = (2, 2.5)" strokeWidth={4.5} delay={20} />
                  {/* Proyección punteada vertical sobre u */}
                  <line x1={320} y1={120} x2={320} y2={280} stroke="#D97706" strokeWidth="2" strokeDasharray="4 4" />
                </CoordinatePlane>
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: CRITERIO DE ORTOGONALIDAD (270..540 frames)
          ========================================================================= */}
      <Sequence from={270} durationInFrames={270} name="Fase_Ortogonalidad">
        <BoardWipeTransition topic="vectors" durationInFrames={270} wipeDurationFrames={30}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Los 3 Casos del Coseno */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="CONDICIÓN DE PERPENDICULARIDAD"
                title="El Test Definitivo de Ortogonalidad"
                topic="vectors"
                accentColor={theme.result}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Dependencia del Ángulo Polar theta"
                  formula="\vec{u} \cdot \vec{v} = \|\vec{u}\| \|\vec{v}\| \cos(\theta)"
                  steps={[
                    { label: "Caso 1: theta < 90°", latex: "\\cos(\\theta) > 0 \\implies \\vec{u} \\cdot \\vec{v} > 0", note: "Ángulo Agudo (Mismo sentido)" },
                    { label: "Caso 2: theta = 90°", latex: "\\cos(90^\\circ) = 0 \\implies \\vec{u} \\cdot \\vec{v} = 0", note: "Vectores Perpendiculares / Ortogonales", highlight: true },
                    { label: "Caso 3: theta > 90°", latex: "\\cos(\\theta) < 0 \\implies \\vec{u} \\cdot \\vec{v} < 0", note: "Ángulo Obtuso (Sentidos contrarios)" },
                  ]}
                  result={{
                    latex: "\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0",
                    label: "TEOREMA DE ORTOGONALIDAD",
                    interpretation: "Permite comprobar perpendicularidad sin calcular ángulos con trigonometría.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="axiom"
                topic="vectors"
                title="Verificación Instantánea"
                text="Dado u = (3, 4) y v = (4, -3): u · v = (3)(4) + (4)(-3) = 12 - 12 = 0. Son ortogonales exactos sin necesidad de graficar."
                math="(3, 4) \\cdot (4, -3) = 0 \\implies \\vec{u} \\perp \\vec{v}"
              />
            </div>

            {/* Columna Derecha: Gráfico de Perpendicularidad 90 grados */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="GEOMETRÍA ORTOGONAL"
                title="Vectores Perpendiculares en el Plano"
                topic="vectors"
                accentColor={theme.result}
                delay={10}
              >
                <CoordinatePlane width={540} height={380} xRange={[-1, 5]} yRange={[-4, 5]}>
                  <Vector2D from={[0, 0]} to={[3, 4]} color={theme.primary} label="\\vec{u} = (3, 4)" strokeWidth={4.5} delay={5} />
                  <Vector2D from={[0, 0]} to={[4, -3]} color={theme.secondary} label="\\vec{v} = (4, -3)" strokeWidth={4.5} delay={20} />
                </CoordinatePlane>
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 3: CÁLCULO DEL ÁNGULO & FÍSICA (540..810 frames)
          ========================================================================= */}
      <Sequence from={540} durationInFrames={270} name="Fase_AnguloYFisica">
        <BoardWipeTransition topic="vectors" durationInFrames={270} wipeDurationFrames={30}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Despeje del Ángulo */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="APLICACIÓN TRIGONOMÉTRICA"
                title="Extracción Exacta del Ángulo entre Vectores"
                topic="vectors"
                accentColor={theme.tertiary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Despeje del Coseno del Ángulo"
                  formula="\theta = \\arccos\\left( \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|} \\right)"
                  steps={[
                    { label: "1. Producto Escalar:", latex: "\\vec{u} \\cdot \\vec{v} = 11.0" },
                    { label: "2. Producto de Normas:", latex: "\\|u\\| = 5.0, \\quad \\|v\\| = 2.236 \\implies 11.18" },
                    { label: "3. Cociente Coseno:", latex: "\\cos(\\theta) = 11.0 / 11.18 \\approx 0.9838" },
                  ]}
                  result={{
                    latex: "\\theta = \\arccos(0.9838) \\approx 10.3^\\circ",
                    label: "ÁNGULO INTERNO",
                    interpretation: "Ángulo geométrico más corto entre ambas rectas directrices.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="physics"
                topic="vectors"
                title="Trabajo Mecánico en Dinámica Clásica"
                text="El trabajo mecánico W es la integral del producto escalar de la fuerza aplicada por el desplazamiento: si la fuerza es perpendicular a la trayectoria, el trabajo es nulo."
                math="W = \\vec{F} \\cdot \\Delta\\vec{r} = |\\vec{F}| |\\Delta\\vec{r}| \\cos(\\theta) \\quad [\\text{Joules}]"
              />
            </div>

            {/* Columna Derecha: Gráfico de Ángulo */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <BoardPanel
                tag="APLICACIÓN FÍSICA"
                title="Fuerza y Desplazamiento Concurrentes"
                topic="vectors"
                accentColor={theme.secondary}
                delay={10}
              >
                <CoordinatePlane width={540} height={380} xRange={[-0.5, 6]} yRange={[-0.5, 4]}>
                  <Vector2D from={[0, 0]} to={[5, 0]} color={theme.primary} label="\\Delta\\vec{r} = (5, 0)\\text{ m}" strokeWidth={4.5} delay={5} />
                  <Vector2D from={[0, 0]} to={[4, 2.5]} color={theme.secondary} label="\\vec{F} = (4, 2.5)\\text{ N}" strokeWidth={4.5} delay={20} />
                </CoordinatePlane>
              </BoardPanel>
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>
    </DynamicBoardLayout>
  );
};
