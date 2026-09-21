/**
 * src/components/vectors/VectorProjectionGraph.tsx
 * Visualizador interactivo 2D de Proyecciones Ortogonales.
 * Muestra el vector u, el vector base v, la proyección vectorial proj_v(u),
 * la componente ortogonal u_perp, la línea punteada perpendicular
 * y el símbolo de ángulo recto de 90°.
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane, usePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";
import { vectorMagnitude, dotProduct } from "../../math/vectors";
import { TOPIC_THEMES } from "../../theme/boardTheme";

export interface VectorProjectionGraphProps {
  u?: [number, number];
  v?: [number, number];
  width?: number;
  height?: number;
  showDecomposition?: boolean;
  delay?: number;
}

// Subcomponente interno para renderizar dentro del contexto SVG del CoordinatePlane
const ProjectionOverlaySVG: React.FC<{
  u: [number, number];
  v: [number, number];
  proj: [number, number];
  progress: number;
}> = ({ u, v, proj, progress }) => {
  const { toScreen } = usePlane();
  const [uX, uY] = toScreen(u[0], u[1]);
  const [pX, pY] = toScreen(proj[0], proj[1]);
  const [originX, originY] = toScreen(0, 0);

  // Vector unitario a lo largo de v
  const vMag = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  const uX_norm = vMag > 0 ? v[0] / vMag : 1;
  const uY_norm = vMag > 0 ? v[1] / vMag : 0;
  // Perpendicular
  const perpX = -uY_norm;
  const perpY = uX_norm;

  // Tamaño del marcador de ángulo recto (en píxeles de pantalla)
  const sqSize = 14;
  const c1X = pX - uX_norm * sqSize;
  const c1Y = pY + uY_norm * sqSize;
  const c2X = c1X + perpX * sqSize;
  const c2Y = c1Y - perpY * sqSize;
  const c3X = pX + perpX * sqSize;
  const c3Y = pY - perpY * sqSize;

  return (
    <g opacity={progress}>
      {/* Línea punteada de proyección ortogonal desde la punta de u hasta la proyección */}
      <line
        x1={uX}
        y1={uY}
        x2={pX}
        y2={pY}
        stroke="#FB7185"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />

      {/* Símbolo de Ángulo Recto (90 grados) en la base de la proyección */}
      <polyline
        points={`${c1X},${c1Y} ${c2X},${c2Y} ${c3X},${c3Y}`}
        fill="none"
        stroke="#FB7185"
        strokeWidth="1.8"
      />

      {/* Punto de impacto de la proyección */}
      <circle cx={pX} cy={pY} r={4.5} fill="#34D399" />
    </g>
  );
};

export const VectorProjectionGraph: React.FC<VectorProjectionGraphProps> = ({
  u = [3, 3.5],
  v = [4.5, 0],
  width = 560,
  height = 380,
  showDecomposition = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = TOPIC_THEMES.vectors;

  // Cómputo matemático de la proyección
  const vMagSq = v[0] * v[0] + v[1] * v[1];
  const uDotV = u[0] * v[0] + u[1] * v[1];
  const factor = vMagSq > 0 ? uDotV / vMagSq : 0;
  const proj: [number, number] = [v[0] * factor, v[1] * factor];
  const perp: [number, number] = [u[0] - proj[0], u[1] - proj[1]];

  const scalarComp = vMagSq > 0 ? uDotV / Math.sqrt(vMagSq) : 0;

  const anim = spring({
    frame: Math.max(0, frame - delay - 30),
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <CoordinatePlane
        width={width}
        height={height}
        xRange={[-1, 6]}
        yRange={[-1, 5]}
      >
        {/* Recta directriz de v extendida */}
        <line
          x1={0}
          y1={height * 0.75}
          x2={width}
          y2={height * 0.75}
          stroke="#1E293B"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* 1. Vector base v sobre el que se proyecta */}
        <Vector2D
          from={[0, 0]}
          to={v}
          color={theme.secondary}
          label={`v = (${v[0]}, ${v[1]})`}
          delay={delay + 5}
          strokeWidth={4}
        />

        {/* 2. Vector u que se va a proyectar */}
        <Vector2D
          from={[0, 0]}
          to={u}
          color={theme.primary}
          label={`u = (${u[0]}, ${u[1]})`}
          delay={delay + 15}
          strokeWidth={4}
        />

        {/* 3. Marcador ortogonal de 90° y línea punteada */}
        {anim > 0.05 && (
          <ProjectionOverlaySVG u={u} v={v} proj={proj} progress={anim} />
        )}

        {/* 4. Vector Proyección proj_v(u) sobre el eje */}
        {anim > 0.3 && (
          <Vector2D
            from={[0, 0]}
            to={proj}
            color={theme.result}
            label={`proj = (${proj[0].toFixed(1)}, ${proj[1].toFixed(1)})`}
            delay={delay + 35}
            strokeWidth={5}
          />
        )}

        {/* 5. Componente ortogonal u_perp (si se activa la descomposición) */}
        {showDecomposition && anim > 0.6 && (
          <Vector2D
            from={proj}
            to={u}
            color={theme.warning}
            label={`u_perp = (${perp[0].toFixed(1)}, ${perp[1].toFixed(1)})`}
            delay={delay + 55}
            strokeWidth={3.5}
          />
        )}
      </CoordinatePlane>

      {/* Leyenda de colores claros y métricas numéricas */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono bg-black/40 px-4 py-2 rounded-xl border border-white/10 w-full max-w-[560px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
          <span>u = ({u[0]}, {u[1]})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
          <span>v = ({v[0]}, {v[1]})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.result }} />
          <span className="font-bold text-white">proj = ({proj[0].toFixed(1)}, {proj[1].toFixed(1)})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">comp = {scalarComp.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
