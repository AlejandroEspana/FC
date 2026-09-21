import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";
import { TOPIC_THEMES } from "../../theme/boardTheme";

export interface VectorSubtractionGraphProps {
  u?: [number, number];
  v?: [number, number];
  width?: number;
  height?: number;
}

export const VectorSubtractionGraph: React.FC<VectorSubtractionGraphProps> = ({
  u = [4, 2],
  v = [1.5, 3],
  width = 540,
  height = 380,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = TOPIC_THEMES.vectors;

  const diff: [number, number] = [u[0] - v[0], u[1] - v[1]];
  const negV: [number, number] = [-v[0], -v[1]];

  const showOpposite = frame >= 40;
  const showTipToTail = frame >= 80;
  const showDiff = frame >= 120;

  // Animación del vector opuesto trasladado a la punta de u
  const shiftProgress = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const negV_Start: [number, number] = [
    u[0] * shiftProgress,
    u[1] * shiftProgress,
  ];
  const negV_End: [number, number] = [
    negV_Start[0] + negV[0],
    negV_Start[1] + negV[1],
  ];

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <CoordinatePlane
        width={width}
        height={height}
        xRange={[-2.5, 5.5]}
        yRange={[-3.5, 4.5]}
      >
        {/* Vector u */}
        <Vector2D
          from={[0, 0]}
          to={u}
          color={theme.primary}
          label="\\vec{u} = (4, 2)"
          delay={5}
          strokeWidth={4.5}
        />

        {/* Vector v original */}
        <Vector2D
          from={[0, 0]}
          to={v}
          color={theme.secondary}
          label="\\vec{v} = (1.5, 3)"
          delay={20}
          strokeWidth={4.5}
        />

        {/* Vector opuesto -v en el origen */}
        {showOpposite && (
          <Vector2D
            from={[0, 0]}
            to={negV}
            color={`${theme.warning}80`}
            label="-\\vec{v} = (-1.5, -3)"
            delay={40}
            strokeWidth={3}
          />
        )}

        {/* Vector opuesto trasladado a la punta de u: u + (-v) */}
        {showTipToTail && (
          <Vector2D
            from={negV_Start}
            to={negV_End}
            color={theme.warning}
            label="-\\vec{v}"
            delay={80}
            strokeWidth={4}
          />
        )}

        {/* Vector resta directo desde la punta de v hasta la punta de u (Desplazamiento Relativo) */}
        {showDiff && (
          <Vector2D
            from={v}
            to={u}
            color={theme.result}
            label="\\vec{u} - \\vec{v} = (2.5, -1)"
            delay={120}
            strokeWidth={5}
          />
        )}
      </CoordinatePlane>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700 font-mono bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full max-w-[540px] shadow-2xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
          <span className="font-semibold">u = (4, 2)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
          <span className="font-semibold">v = (1.5, 3)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.warning }} />
          <span className="font-semibold">-v (Opuesto)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.result }} />
          <span className="font-black text-slate-900">u - v (Punta a Punta)</span>
        </div>
      </div>
    </div>
  );
};
