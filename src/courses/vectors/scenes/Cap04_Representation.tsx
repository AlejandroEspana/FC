/**
 * src/courses/vectors/scenes/Cap04_Representation.tsx
 * Capítulo 04: Representación y Equipolencia: Vector Libre vs Aplicado.
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
import { Equation } from "../../../components/equations/Equation";

const PHASES = [
  { id: "equipollence", label: "1. Vectores Libres & Equipolencia" },
  { id: "notations", label: "2. Las Tres Notaciones Estándar" },
];

export const Cap04_Representation: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 300 frames (total 600 frames = 10s @ 60 FPS)
  const currentPhaseIndex = frame < 300 ? 0 : 1;

  let activeTakeaway = "Equipolencia: Dos flechas en distintas posiciones representan el MISMO vector si comparten magnitud, dirección y sentido.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Notación: Par ordenado (x, y), vector columna [x; y] o combinación canónica x·î + y·ĵ son totalmente equivalentes.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="04"
      title="Representaciones y Equipolencia"
      subtitle="Vectores Libres, Vectores de Posición y Notaciones Canónicas en Física y Computación"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: VECTORES LIBRES & EQUIPOLENCIA (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_Equipolencia">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Definición de Equipolencia */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="CONCEPTO FUNDAMENTAL"
              title="Equipolencia de Segmentos Orientados"
              topic="vectors"
              accentColor={theme.primary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Clase de Equivalencia Geométrica"
                formula="\vec{AB} \sim \vec{CD} \iff \begin{cases} \|\vec{AB}\| = \|\vec{CD}\| \\ \text{rectas directrices paralelas} \\ \text{mismo sentido de avance} \end{cases}"
                steps={[
                  { label: "Vector de Posición (Atado al origen):", latex: "\\vec{v} = (3, 2), \\quad \\text{Origen en } (0, 0)" },
                  { label: "Vector Libre Trasladado:", latex: "\\vec{w} = (3, 2), \\quad \\text{Origen en } (1, 1) \\rightarrow (4, 3)", highlight: true },
                ]}
                result={{
                  latex: "\\vec{v} \\equiv \\vec{w} = (3, \\; 2)",
                  label: "IDENTIDAD MATEMÁTICA",
                  interpretation: "Son idénticos porque la diferencia de coordenadas extremas es idéntica.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="physics"
              topic="vectors"
              title="Física: Vectores Libres vs Fijos"
              text="La velocidad de traslación de un cuerpo rígido es un vector libre (todos sus puntos se mueven igual). En cambio, una fuerza que produce rotación es un vector deslizante o aplicado que depende del punto de contacto."
            />
          </div>

          {/* Columna Derecha: Gráfico con Dos Vectores Equipolentes */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <BoardPanel
              tag="DEMOSTRACIÓN VISUAL"
              title="Dos Flechas Distintas, el Mismo Vector (3, 2)"
              topic="vectors"
              accentColor={theme.result}
            >
              <CoordinatePlane width={540} height={380} xRange={[-0.5, 5]} yRange={[-0.5, 4]}>
                {/* Vector aplicado en el origen */}
                <Vector2D from={[0, 0]} to={[3, 2]} color={theme.primary} label="\\vec{v}_1 \\text{ desde }(0,0)" strokeWidth={4.5} delay={5} />
                {/* Vector idéntico trasladado a (1, 1) */}
                <Vector2D from={[1, 1]} to={[4, 3]} color={theme.secondary} label="\\vec{v}_2 \\text{ desde }(1,1)" strokeWidth={4.5} delay={25} />
              </CoordinatePlane>
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: LAS NOTACIONES ESTÁNDAR (300..600 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={300} name="Fase_Notaciones">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Notación de Base y Columna */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="FORMALISMO SINTÁCTICO"
              title="Las Tres Formas Canónicas de Escribir un Vector"
              topic="vectors"
              accentColor={theme.secondary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Equivalencia de Notaciones en Álgebra y Software"
                formula="\vec{v} = (v_x, v_y) = \begin{bmatrix} v_x \\ v_y \end{bmatrix} = v_x \hat{i} + v_y \hat{j}"
                steps={[
                  { label: "1. Par Ordenado Cartesiano:", latex: "\\vec{v} = (3, \\; 4) \\quad (\\text{Geometría analítica estándar})" },
                  { label: "2. Vector Columna Matricial:", latex: "\\vec{v} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} \\quad (\\text{Álgebra Lineal & NumPy})", highlight: true },
                  { label: "3. Combinación Ortonormal:", latex: "\\vec{v} = 3\\hat{i} + 4\\hat{j} \\quad (\\text{Física y Mecánica Clásica})" },
                ]}
                result={{
                  latex: "\\vec{v} = \\sum_{i=1}^n v_i \\hat{e}_i",
                  label: "GENERALIZACIÓN CANÓNICA",
                  interpretation: "Representación unificada para cualquier dimensión finita n.",
                }}
              />
            </BoardPanel>
          </div>

          {/* Columna Derecha: Comparativa de Versores Unitarios */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="BASE CANÓNICA R²"
              title="Los Versores Fundamentales î y ĵ"
              topic="vectors"
              accentColor={theme.tertiary}
            >
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-900">
                  <span className="text-blue-700 font-bold font-sans">Versor Horizontal î:</span>
                  <Equation latex="\hat{i} = (1, 0), \quad \|\hat{i}\| = 1" fontSize="text-sm" block={false} />
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-900">
                  <span className="text-amber-700 font-bold font-sans">Versor Vertical ĵ:</span>
                  <Equation latex="\hat{j} = (0, 1), \quad \|\hat{j}\| = 1" fontSize="text-sm" block={false} />
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-sans text-xs">
                  Cualquier vector en el plano es la suma de dos movimientos ortogonales escalados por los versores base: v = 3î + 4ĵ.
                </div>
              </div>
            </BoardPanel>

            <BoardCallout
              type="application"
              topic="vectors"
              title="NumPy y Shaders GPU"
              text="En Python (NumPy) o en sombreadores GLSL/HLSL, los vectores se indexan como arrays o tipos nativos vec2/vec3/vec4, permitiendo cálculos vectorizados simultáneos en la GPU."
            />
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
