import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane, usePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";
import { TOPIC_THEMES } from "../../theme/boardTheme";

export interface VectorSumGraphProps {
  u?: [number, number];
  v?: [number, number];
  mode?: "tiptotail" | "parallelogram" | "both";
  width?: number;
  height?: number;
}

// Subcomponente SVG para dibujar las líneas del paralelogramo
const ParallelogramLines: React.FC<{
  u: [number, number];
  v: [number, number];
  w: [number, number];
  progress: number;
}> = ({ u, v, w, progress }) => {
  const { toScreen } = usePlane();
  const [oX, oY] = toScreen(0, 0);
  const [uX, uY] = toScreen(u[0], u[1]);
  const [vX, vY] = toScreen(v[0], v[1]);
  const [wX, wY] = toScreen(w[0], w[1]);

  return (
    <g opacity={progress}>
      {/* Área del paralelogramo sombreada */}
      <polygon
        points={`${oX},${oY} ${uX},${uY} ${wX},${wY} ${vX},${vY}`}
        fill="rgba(37, 99, 235, 0.08)"
        stroke="none"
      />
      {/* Lado paralelo a v desde u hasta w */}
      <line
        x1={uX}
        y1={uY}
        x2={wX}
        y2={wY}
        stroke="#D97706"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {/* Lado paralelo a u desde v hasta w */}
      <line
        x1={vX}
        y1={vY}
        x2={wX}
        y2={wY}
        stroke="#2563EB"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </g>
  );
};

export const VectorSumGraph: React.FC<VectorSumGraphProps> = ({
  u = [3, 1],
  v = [1.5, 2.5],
  mode = "both",
  width = 540,
  height = 380,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = TOPIC_THEMES.vectors;

  const w: [number, number] = [u[0] + v[0], u[1] + v[1]];

  // Animación para traslación punta-cola
  const shiftProgress = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const vCurrentStart: [number, number] = mode === "parallelogram"
    ? [0, 0]
    : [u[0] * shiftProgress, u[1] * shiftProgress];

  const vCurrentEnd: [number, number] = [
    vCurrentStart[0] + v[0],
    vCurrentStart[1] + v[1],
  ];

  // Animación del paralelogramo
  const paraProgress = spring({
    frame: Math.max(0, frame - 100),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <CoordinatePlane width={width} height={height} xRange={[-1, 6]} yRange={[-1, 5]}>
        {/* Líneas auxiliares del paralelogramo si aplica */}
        {(mode === "parallelogram" || mode === "both") && paraProgress > 0.05 && (
          <ParallelogramLines u={u} v={v} w={w} progress={paraProgress} />
        )}

        {/* Vector u */}
        <Vector2D
          from={[0, 0]}
          to={u}
          color={theme.primary}
          label="\\vec{u} = (3, 1)"
          delay={5}
          strokeWidth={4.5}
        />

        {/* Vector v original en el origen (siempre visible como referencia en modo ambos o paralelogramo) */}
        {(mode === "parallelogram" || (mode === "both" && shiftProgress > 0.1)) && (
          <Vector2D
            from={[0, 0]}
            to={v}
            color={`${theme.secondary}90`}
            delay={25}
            strokeWidth={3}
          />
        )}

        {/* Vector v que se traslada o posa en el origen */}
        {frame >= 25 && (
          <Vector2D
            from={vCurrentStart}
            to={vCurrentEnd}
            color={theme.secondary}
            label="\\vec{v} = (1.5, 2.5)"
            delay={25}
            strokeWidth={4.5}
          />
        )}

        {/* Vector resultante w = u + v */}
        {frame >= 110 && (
          <Vector2D
            from={[0, 0]}
            to={w}
            color={theme.result}
            label="\\vec{w} = \\vec{u} + \\vec{v} = (4.5, 3.5)"
            delay={110}
            strokeWidth={5}
          />
        )}
      </CoordinatePlane>

      <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-700 font-mono bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full max-w-[540px] shadow-2xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
          <span className="font-semibold">u = (3, 1)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
          <span className="font-semibold">v = (1.5, 2.5)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.result }} />
          <span className="font-black text-slate-900">w = (4.5, 3.5)</span>
        </div>
      </div>
    </div>
  );
};
