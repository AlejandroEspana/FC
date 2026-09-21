/**
 * src/courses/vectors/scenes/Cap10_CrossProduct.tsx
 * Capítulo 10: El Producto Cruz en R³ con Máximo Detalle.
 * Rediseñado como Tablero Científico Dinámico:
 * - Fase 1: Pseudodeterminante 3x3 y Expansión por Menores de Laplace
 * - Fase 2: Magnitud como Área del Paralelogramo y Regla de la Mano Derecha
 * - Fase 3: Visualizador Orbital Tridimensional con Three.js a 60 FPS
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
import { Vector3D } from "../../../components/vectors/Vector3D";
import { Equation } from "../../../components/equations/Equation";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "determinant", label: "1. Determinante 3x3 & Menores de Laplace" },
  { id: "area", label: "2. Área del Paralelogramo & Doble Ortogonalidad" },
  { id: "threejs", label: "3. Simulación Espacial 3D (Three.js)" },
];

export const Cap10_CrossProduct: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 3 fases (300f, 270f, 280f -> total 850 frames)
  const currentPhaseIndex = frame < 300 ? 0 : frame < 570 ? 1 : 2;

  let activeTakeaway = "El producto cruz SOLO existe en R³ y engendra un vector simultáneamente perpendicular a ambos.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "La norma ||a × b|| equivale exactamente al área del paralelogramo sustentado por a y b.";
  } else if (currentPhaseIndex === 2) {
    activeTakeaway = "Regla de la mano derecha: a × b = -(b × a). El producto cruz es estrictamente anti-conmutativo.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="10"
      title="El Producto Cruz en R³ en Detalle"
      subtitle="Pseudodeterminante 3×3, Expansión de Laplace, Área y Visualización 3D"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={3}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: DETERMINANTE 3x3 & MENORES DE LAPLACE (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_Determinante">
        <BoardWipeTransition topic="vectors" durationInFrames={300} wipeDurationFrames={35}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Ecuación y Workbench */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="ALGORITMO MATRICIAL"
                title="Pseudodeterminante Formal por Fila 1"
                topic="vectors"
                accentColor={theme.primary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Desarrollo por Cofactores con Signos (+ - +)"
                  formula="\vec{a} \times \vec{b} = \det \begin{bmatrix} \hat{i} & \hat{j} & \hat{k} \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{bmatrix}"
                  steps={[
                    { label: "Menor en i (+):", latex: "(a_y b_z - a_z b_y)\\hat{i} = (0 - 0)\\hat{i} = 0\\hat{i}" },
                    { label: "Menor en j (-):", latex: "-(a_x b_z - a_z b_x)\\hat{j} = -(0 - 0)\\hat{j} = 0\\hat{j}" },
                    { label: "Menor en k (+):", latex: "(a_x b_y - a_y b_x)\\hat{k} = ((3)(2.5) - (0)(1.5))\\hat{k} = 7.5\\hat{k}", highlight: true },
                  ]}
                  result={{
                    latex: "\\vec{a} \\times \\vec{b} = (0, \\; 0, \\; 7.5)",
                    label: "VECTOR NORMAL PERPENDICULAR",
                    interpretation: "Apunta directamente a lo largo del eje Z, perpendicular al plano XY.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="warning"
                topic="vectors"
                title="Propiedad Anti-Conmutativa"
                text="Invertir el orden de los factores invierte la dirección de la normal: a × b = -(b × a). El producto vectorial NUNCA es conmutativo."
                math="\vec{a} \times \vec{b} = -(\vec{b} \times \vec{a})"
              />
            </div>

            {/* Columna Derecha: Tarjeta de Desglose de Menores 2x2 */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="CÁLCULO PASO A PASO"
                title="Los Tres Determinantes 2×2 de Laplace"
                topic="vectors"
                accentColor={theme.tertiary}
                delay={10}
              >
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-2xs">
                    <span className="text-slate-600 font-sans font-medium">Componente X:</span>
                    <Equation latex="\det \begin{bmatrix} a_y & a_z \\ b_y & b_z \end{bmatrix} \hat{i}" fontSize="text-sm" block={false} />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-2xs">
                    <span className="text-slate-600 font-sans font-medium">Componente Y (signo negativo):</span>
                    <Equation latex="-\det \begin{bmatrix} a_x & a_z \\ b_x & b_z \end{bmatrix} \hat{j}" fontSize="text-sm" block={false} />
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between shadow-xs">
                    <span className="text-blue-900 font-bold font-sans">Componente Z (Cruz 2D):</span>
                    <Equation latex="\det \begin{bmatrix} a_x & a_y \\ b_x & b_y \end{bmatrix} \hat{k} = (a_x b_y - a_y b_x)\hat{k}" fontSize="text-sm" block={false} />
                  </div>
                </div>
              </BoardPanel>

              <BoardCallout
                type="axiom"
                topic="vectors"
                title="Criterio de Colinealidad en R³"
                text="Dos vectores son paralelos o proporcionales si y solo si su producto cruz es el vector nulo cero."
                math="\vec{a} \times \vec{b} = \vec{0} \iff \vec{a} \parallel \vec{b}"
              />
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 2: ÁREA DEL PARALELOGRAMO & ORTOGONALIDAD DUAL (300..570 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={270} name="Fase_AreaOrtogonalidad">
        <BoardWipeTransition topic="vectors" durationInFrames={270} wipeDurationFrames={30}>
          <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
            {/* Columna Izquierda: Magnitud Geométrica y Área */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="GEOMETRÍA MÉTRICA"
                title="La Magnitud como Área Sustentada"
                topic="vectors"
                accentColor={theme.secondary}
                delay={0}
              >
                <BoardEquationWorkbench
                  topic="vectors"
                  title="Norma del Producto Cruz"
                  formula="\|\vec{a} \times \vec{b}\| = \|\vec{a}\| \|\vec{b}\| \sin(\theta) = \text{Área del Paralelogramo}"
                  steps={[
                    { label: "Base del paralelogramo:", latex: "b = \\|\\vec{a}\\| = 3.0" },
                    { label: "Altura perpendicular:", latex: "h = \\|\\vec{b}\\| \\sin(\\theta) = 2.5" },
                    { label: "Área = Base × Altura:", latex: "\\text{Área} = (3.0)(2.5) = 7.5\\text{ u}^2", highlight: true },
                  ]}
                  result={{
                    latex: "\\text{Área}(\\Delta) = \\frac{1}{2}\\|\\vec{a} \\times \\vec{b}\\| = 3.75\\text{ u}^2",
                    label: "ÁREA DEL TRIÁNGULO",
                    interpretation: "La mitad del área del paralelogramo equivale al triángulo formado por ambos vectores.",
                  }}
                />
              </BoardPanel>

              <BoardCallout
                type="physics"
                topic="vectors"
                title="Física: Momento de Torsión (Torque)"
                text="En mecánica clásica, el torque o momento de fuerza tau = r × F mide la capacidad de una fuerza para producir rotación alrededor de un eje."
                math="\\vec{\\tau} = \\vec{r} \\times \\vec{F} \\quad [\\text{N}\\cdot\\text{m}]"
              />
            </div>

            {/* Columna Derecha: Teorema de Doble Ortogonalidad */}
            <div className="col-span-6 flex flex-col gap-3.5">
              <BoardPanel
                tag="DEMOSTRACIÓN DE ORTOGONALIDAD"
                title="Perpendicularidad Simultánea a Ambos Vectores"
                topic="vectors"
                accentColor={theme.result}
                delay={10}
              >
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
                    <span className="text-slate-600 font-sans font-medium">1. Ortogonalidad con el vector a:</span>
                    <Equation latex="(\vec{a} \times \vec{b}) \cdot \vec{a} = 0" fontSize="text-sm" />
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
                    <span className="text-slate-600 font-sans font-medium">2. Ortogonalidad con el vector b:</span>
                    <Equation latex="(\vec{a} \times \vec{b}) \cdot \vec{b} = 0" fontSize="text-sm" />
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans text-xs font-medium shadow-2xs">
                    Cualquier vector resultante w = a × b es ortogonal a TODO vector perteneciente al plano generado por a y b (el vector normal del plano).
                  </div>
                </div>
              </BoardPanel>

              <BoardCallout
                type="axiom"
                topic="vectors"
                title="Regla de la Mano Derecha"
                text="Extiende los 4 dedos de la mano derecha a lo largo de a. Ciérralos girando hacia b. El dedo pulgar erguido señalará sin ambigüedad el sentido de w = a × b."
              />
            </div>
          </div>
        </BoardWipeTransition>
      </Sequence>

      {/* =========================================================================
          FASE 3: SIMULACIÓN ESPACIAL THREE.JS (570..850 frames)
          ========================================================================= */}
      <Sequence from={570} durationInFrames={280} name="Fase_ThreeJS3D">
        <BoardWipeTransition topic="vectors" durationInFrames={280} wipeDurationFrames={30}>
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <BoardPanel
              tag="MOTOR THREE.JS 3D A 60 FPS"
              title="Cámara Orbital: Plano XY, Paralelogramo y Vector Normal Z"
              topic="vectors"
              accentColor={theme.result}
              delay={0}
              className="w-full max-w-4xl"
            >
              <Vector3D width={720} height={420} />
            </BoardPanel>
          </div>
        </BoardWipeTransition>
      </Sequence>
    </DynamicBoardLayout>
  );
};
