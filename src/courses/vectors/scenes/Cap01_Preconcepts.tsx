/**
 * src/courses/vectors/scenes/Cap01_Preconcepts.tsx
 * Capítulo 01: Preconceptos Matemáticos Indispensables.
 * Rediseñado como Tablero Científico Dinámico:
 * - Fase 1: El Espacio Euclídeo R² y el Sistema de Coordenadas
 * - Fase 2: Trigonometría Rectangular y Razones Fundamentales
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
  { id: "euclid", label: "1. El Espacio Euclídeo R² & Coordenadas" },
  { id: "trig", label: "2. Trigonometría: Triángulo Rectángulo & Pitágoras" },
];

export const Cap01_Preconcepts: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 300 frames (total 600 frames = 10s @ 60 FPS)
  const currentPhaseIndex = frame < 300 ? 0 : 1;

  let activeTakeaway = "El espacio R² está dotado de la métrica euclidiana derivada directamente del Teorema de Pitágoras.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Trigonometría: x = r·cos(theta) e y = r·sin(theta) son el puente entre coordenadas polares y cartesianas.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="01"
      title="Preconceptos Matemáticos Clave"
      subtitle="El Espacio Euclídeo R², Geometría Cartesiana y Trigonometría Fundamental"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: EL ESPACIO EUCLÍDEO R² (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_EspacioEuclideo">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Definición Formal */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="SISTEMA DE REFERENCIA"
              title="El Plano Euclídeo R²"
              topic="vectors"
              accentColor={theme.primary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Conjunto de Pares Ordenados"
                formula="\mathbb{R}^2 = \{ (x, y) : x, y \in \mathbb{R} \}"
                terms={[
                  { symbol: "x", label: "Eje de Abscisas", color: theme.primary, explanation: "Posición horizontal independiente" },
                  { symbol: "y", label: "Eje de Ordenadas", color: theme.secondary, explanation: "Posición vertical ortogonal a 90°" },
                ]}
                steps={[
                  { label: "Métrica Euclidiana:", latex: "d(P, Q) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}", highlight: true },
                  { label: "Origen de Referencia:", latex: "O = (0, 0) \\in \\mathbb{R}^2" },
                ]}
                result={{
                  latex: "\\vec{r} = (x, y) = x\\hat{i} + y\\hat{j}",
                  label: "ISOMORFISMO GEOMÉTRICO",
                  interpretation: "Todo punto P del plano define unívocamente un vector de posición respecto al origen.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="axiom"
              topic="vectors"
              title="Ortogonalidad de los Ejes"
              text="Los ejes X e Y son mutuamente perpendiculares en el origen (0,0), permitiendo desacoplar completamente el movimiento horizontal del vertical."
            />
          </div>

          {/* Columna Derecha: Plano Cartesiano */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="REPRESENTACIÓN CARTESIANA"
              title="Punto de Referencia P = (3, 4)"
              topic="vectors"
              accentColor={theme.result}
            >
              <CoordinatePlane width={540} height={380} xRange={[-1, 5]} yRange={[-1, 5]}>
                <Vector2D from={[0, 0]} to={[3, 4]} color={theme.primary} label="P = (3, 4)" strokeWidth={4} showComponents={true} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: TRIGONOMETRÍA Y TRIÁNGULO RECTÁNGULO (300..600 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={300} name="Fase_Trigonometria">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Razones Trigonométricas */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="RELACIONES POLARES"
              title="Razones Trigonométricas Fundamentales"
              topic="vectors"
              accentColor={theme.secondary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Triángulo Rectángulo y Círculo de Radio r"
                formula="\cos(\theta) = \frac{x}{r}, \quad \sin(\theta) = \frac{y}{r}, \quad \tan(\theta) = \frac{y}{x}"
                steps={[
                  { label: "Cateto Horizontal Adyacente:", latex: "x = r \\cdot \\cos(\\theta)", highlight: true },
                  { label: "Cateto Vertical Opuesto:", latex: "y = r \\cdot \\sin(\\theta)", highlight: true },
                  { label: "Teorema Fundamental de Pitágoras:", latex: "r^2 = x^2 + y^2 \\implies r = \\sqrt{x^2 + y^2}" },
                ]}
                result={{
                  latex: "\\vec{v} = (r\\cos\\theta, \\; r\\sin\\theta)",
                  label: "FORMA POLAR CANÓNICA",
                  interpretation: "Permite transitar fluidamente entre magnitud/ángulo y componentes cartesianas.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="insight"
              topic="vectors"
              title="La Función Atan2 para Cuadrantes"
              text="Para calcular el ángulo theta = arctan(y/x) sin errores de signo, se debe emplear atan2(y, x), la cual inspecciona los signos de x e y para situar el vector en el cuadrante exacto (0° a 360°)."
            />
          </div>

          {/* Columna Derecha: Triángulo Rectángulo en el Plano */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="GEOMETRÍA POLAR"
              title="Descomposición del Triángulo (r, theta)"
              topic="vectors"
              accentColor={theme.secondary}
            >
              <CoordinatePlane width={540} height={380} xRange={[-0.5, 4.5]} yRange={[-0.5, 4.5]}>
                <Vector2D from={[0, 0]} to={[3, 4]} color={theme.result} label="r = 5, \\theta = 53.13^\\circ" strokeWidth={4.5} showComponents={true} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
