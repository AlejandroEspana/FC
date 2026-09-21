/**
 * src/courses/vectors/scenes/Cap07_Direction.tsx
 * Capítulo 07: Dirección Polar y Vector Unitario (Normalización).
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
  { id: "angle", label: "1. Ángulo Polar theta & Cuadrantes" },
  { id: "unit", label: "2. Normalización: El Versor Unitario u_hat" },
];

export const Cap07_Direction: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 350 frames (total 700 frames = 11.6s @ 60 FPS)
  const currentPhaseIndex = frame < 350 ? 0 : 1;

  let activeTakeaway = "Dirección polar: theta = atan2(y, x) sitúa unívocamente la inclinación del vector en [0°, 360°).";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Normalización: Dividir un vector entre su norma produce un versor unitario con ||u_hat|| = 1 que preserva la dirección.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="07"
      title="Dirección Polar y Vector Unitario"
      subtitle="Ángulo de Inclinación Polar, Cuadrantes Cartesianos y Normalización Canónica"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: ÁNGULO POLAR THETA (0..350 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={350} name="Fase_AnguloPolar">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Ecuación y Workbench */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="ORIENTACIÓN ESPACIAL"
              title="Cálculo del Ángulo de Inclinación"
              topic="vectors"
              accentColor={theme.primary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Función Arco Tangente de Dos Argumentos"
                formula="\theta = \mathrm{atan2}(v_y, v_x) = \begin{cases} \arctan(v_y/v_x) & \text{si } v_x > 0 \\ \arctan(v_y/v_x) + 180^\circ & \text{si } v_x < 0 \end{cases}"
                steps={[
                  { label: "Vector de Prueba:", latex: "\\vec{v} = (3.0, \\; 4.0)" },
                  { label: "Cociente Tangente:", latex: "\\tan(\\theta) = 4.0 / 3.0 \\approx 1.333" },
                  { label: "Inclinación Polar:", latex: "\\theta = \\arctan(1.333) \\approx 53.13^\\circ", highlight: true },
                ]}
                result={{
                  latex: "\\theta = 53.13^\\circ \\quad (0.927\\text{ rad})",
                  label: "ÁNGULO EN EL PRIMER CUADRANTE",
                  interpretation: "Inclinación respecto al semieje positivo de las abscisas X.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="warning"
              topic="vectors"
              title="Peligro: El Cuadrante Olvidado"
              text="Para v = (-3, -4), el cociente -4/-3 = 1.333 daría falsamente 53.13° en una calculadora simple. Pero al estar en el III cuadrante, el ángulo real es 53.13° + 180° = 233.13°."
            />
          </div>

          {/* Columna Derecha: Gráfica del Ángulo en el Plano */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="PLANO POLAR"
              title="Vector con Inclinación theta = 53.13°"
              topic="vectors"
              accentColor={theme.result}
            >
              <CoordinatePlane width={540} height={380} xRange={[-1, 5]} yRange={[-1, 5]}>
                <Vector2D from={[0, 0]} to={[3, 4]} color={theme.primary} label="\\vec{v} = (3, 4)" strokeWidth={4.5} showComponents={true} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: NORMALIZACIÓN Y VERSOR UNITARIO (350..700 frames)
          ========================================================================= */}
      <Sequence from={350} durationInFrames={350} name="Fase_Normalizacion">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Fórmula de Normalización */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="NORMALIZACIÓN CANÓNICA"
              title="Extracción Pura de la Dirección (Norma = 1)"
              topic="vectors"
              accentColor={theme.secondary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Versor Unitario Asociado"
                formula="\hat{u} = \frac{\vec{v}}{\|\vec{v}\|} = \left( \frac{v_x}{\|\vec{v}\|}, \; \frac{v_y}{\|\vec{v}\|} \right)"
                terms={[
                  { symbol: "\\vec{v}", label: "Vector Original", color: theme.secondary, numericValue: "(3, 4)" },
                  { symbol: "\\|\\vec{v}\\|", label: "Norma Escalar", color: theme.tertiary, numericValue: "5.0" },
                ]}
                steps={[
                  { label: "1. División por la Norma:", latex: "\\hat{u} = (3/5, \\; 4/5) = (0.6, \\; 0.8)", highlight: true },
                  { label: "2. Verificación de Norma:", latex: "\\|\\hat{u}\\| = \\sqrt{0.6^2 + 0.8^2} = \\sqrt{0.36 + 0.64} = 1.0" },
                ]}
                result={{
                  latex: "\\|\hat{u}\\| = 1.000, \\quad \\hat{u} \\parallel \\vec{v}",
                  label: "VERSOR ADIMENSIONAL",
                  interpretation: "Contiene el 100% de la información direccional sin magnitud dimensional.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="application"
              topic="vectors"
              title="Uso Masivo en Computación Gráfica y Shaders"
              text="En sombreadores 3D (Phong, PBR), los vectores de luz (L), de vista (V) y normales (N) DEBEN ser normalizados obligatoriamente a norma 1 para que el producto punto N · L calcule la intensidad de iluminación exacta de 0 a 1."
            />
          </div>

          {/* Columna Derecha: Gráfico con Círculo Unitario y Versor */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="CÍRCULO UNITARIO"
              title="Vector Base v vs Versor Normalizado u_hat"
              topic="vectors"
              accentColor={theme.result}
            >
              <CoordinatePlane width={540} height={380} xRange={[-1.2, 4.5]} yRange={[-1.2, 4.5]}>
                {/* Vector original */}
                <Vector2D from={[0, 0]} to={[3, 4]} color={theme.secondary} label="\\vec{v} = (3, 4)" strokeWidth={3.5} />
                {/* Versor unitario sobre el círculo */}
                <Vector2D from={[0, 0]} to={[0.6, 0.8]} color={theme.result} label="\\hat{u} = (0.6, 0.8)" delay={25} strokeWidth={5} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
