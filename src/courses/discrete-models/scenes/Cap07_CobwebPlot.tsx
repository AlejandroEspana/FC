/**
 * src/courses/discrete-models/scenes/Cap07_CobwebPlot.tsx
 * Capítulo 07: El Diagrama de Telaraña (Cobweb Plot) en Sistemas Dinámicos.
 * Rediseñado como Tablero Científico Dinámico con colores claros de Modelos Discretos.
 */

import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardEquationWorkbench,
  BoardCallout,
} from "../../../components/board";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { FunctionGraph } from "../../../components/graphs/FunctionGraph";
import { CobwebPlot } from "../../../components/graphs/CobwebPlot";
import { generateCobwebPath } from "../../../math/discrete";
import { DISCRETE_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "cobweb", label: "Iteración en Espacio de Fases (Telaraña)" },
];

export const Cap07_CobwebPlot: React.FC = () => {
  const meta = DISCRETE_COURSE.cap07_cobweb_plot;
  const theme = TOPIC_THEMES.discrete;
  const r = meta.rValue;
  const x0 = meta.x0;

  const logisticFn = (x: number) => r * x * (1 - x);

  const segments = useMemo(() => {
    return generateCobwebPath(logisticFn, x0, 10);
  }, [r, x0]);

  return (
    <DynamicBoardLayout
      topic="discrete"
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="07"
      title="El Diagrama de Telaraña (Cobweb Plot)"
      subtitle="Visualización Geométrica de Órbitas, Convergencia al Atractor y Rebote sobre la Recta Identidad"
      currentPhaseIndex={0}
      totalPhases={1}
      phases={PHASES}
      activeTakeaway="Mecánica Cobweb: Paso vertical evalúa f(x_n); paso horizontal sobre y = x proyecta la salida como nueva entrada."
    >
      <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
        {/* Columna Izquierda: Gráfica de Telaraña (Cobweb) */}
        <div className="col-span-7 flex flex-col items-center justify-center">
          <BoardPanel
            tag="ESPACIO DE FASES DISCRETO"
            title={`Mapa Logístico (r = ${r}, x₀ = ${x0})`}
            topic="discrete"
            accentColor={theme.primary}
          >
            <div className="flex items-center justify-between w-full px-2 mb-2 font-mono text-xs">
              <span className="text-cyan-300 font-bold">Curva f(x) = {r}x(1-x)</span>
              <span className="text-amber-300 font-bold">Semilla Inicial x₀ = {x0}</span>
            </div>

            <CoordinatePlane
              width={540}
              height={380}
              xRange={[-0.05, 1.05]}
              yRange={[-0.05, 1.05]}
              stepX={0.2}
              stepY={0.2}
            >
              {/* Recta identidad y = x */}
              <FunctionGraph
                f={(x) => x}
                xRange={[0, 1]}
                color="#F8FAFC"
                strokeDasharray="4 4"
                strokeWidth={1.8}
              />

              {/* Curva logística y = r x (1 - x) */}
              <FunctionGraph
                f={logisticFn}
                xRange={[0, 1]}
                color={theme.primary}
                strokeWidth={3.5}
              />

              {/* Trayectoria de telaraña dinámica */}
              <CobwebPlot
                segments={segments}
                color={theme.secondary}
                delayPerSegmentFrames={15}
              />
            </CoordinatePlane>
          </BoardPanel>
        </div>

        {/* Columna Derecha: Workbench y Callout */}
        <div className="col-span-5 flex flex-col gap-3.5">
          <BoardPanel
            tag="ALGORITMO COBWEB"
            title="Los Dos Pasos de la Órbita"
            topic="discrete"
            accentColor={theme.result}
          >
            <BoardEquationWorkbench
              topic="discrete"
              title="Evolución Iterativa"
              formula="x_{n+1} = f(x_n) = 2.8 \cdot x_n (1 - x_n)"
              steps={[
                { label: "1. Salto Vertical:", latex: "(x_n, \\; x_n) \\rightarrow (x_n, \\; f(x_n))", note: "Evalúa la función f" },
                { label: "2. Salto Horizontal:", latex: "(x_n, \\; f(x_n)) \\rightarrow (f(x_n), \\; f(x_n))", note: "Viaja a la recta y = x", highlight: true },
              ]}
              result={{
                latex: "x^* = 1 - \\frac{1}{r} = 1 - \\frac{1}{2.8} \\approx 0.643",
                label: "PUNTO FIJO ATRACTOR ESTABLE",
                interpretation: "La espiral se cierra convergiendo exactamente al valor de equilibrio.",
              }}
            />
          </BoardPanel>

          <BoardCallout
            type="insight"
            topic="discrete"
            title="Criterio de Estabilidad Derivativo"
            text="Dado que |f'(x*)| = |2 - r| = |2 - 2.8| = 0.8 < 1, el punto fijo actúa como un sumidero o atractor asintótico estable que captura todas las trayectorias cercanas."
            math="|f'(x^*)| < 1 \\implies \\text{Órbita Asintóticamente Estable}"
          />
        </div>
      </div>
    </DynamicBoardLayout>
  );
};
