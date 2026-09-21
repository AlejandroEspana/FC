import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";
import { Equation } from "../equations/Equation";

export interface VectorSumGraphProps {
  u?: [number, number];
  v?: [number, number];
}

export const VectorSumGraph: React.FC<VectorSumGraphProps> = ({
  u = [3, 1],
  v = [1.5, 2.5],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w: [number, number] = [u[0] + v[0], u[1] + v[1]];

  const shiftProgress = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const vCurrentStart: [number, number] = [
    u[0] * shiftProgress,
    u[1] * shiftProgress,
  ];

  const vCurrentEnd: [number, number] = [
    vCurrentStart[0] + v[0],
    vCurrentStart[1] + v[1],
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CoordinatePlane width={540} height={380} xRange={[-1, 6]} yRange={[-1, 5]}>
        {/* Vector u */}
        <Vector2D
          from={[0, 0]}
          to={u}
          color="#38BDF8"
          label="u = (3, 1)"
          delay={5}
          strokeWidth={4.5}
        />

        {/* Vector v (Se traslada dinámicamente) */}
        {frame >= 35 && (
          <Vector2D
            from={vCurrentStart}
            to={vCurrentEnd}
            color="#FACC15"
            label="v = (1.5, 2.5)"
            delay={35}
            strokeWidth={4.5}
          />
        )}

        {/* Vector resultante w = u + v */}
        {frame >= 120 && (
          <Vector2D
            from={[0, 0]}
            to={w}
            color="#34D399"
            label="w = u + v = (4.5, 3.5)"
            delay={120}
            strokeWidth={5}
          />
        )}
      </CoordinatePlane>

      <div className="flex items-center gap-6 text-xs text-[#94A3B8] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
          <span>u = (3, 1)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FACC15]" />
          <span>v = (1.5, 2.5)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#34D399]" />
          <span className="font-bold text-white">w = (4.5, 3.5)</span>
        </div>
      </div>
    </div>
  );
};
