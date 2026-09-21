import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";

export const ScalarMultGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseV: [number, number] = [2, 1];

  let c = 1.0;
  let phaseName = "Vector Base (c = 1)";
  let phaseColor = "#38BDF8";

  if (frame >= 60 && frame < 140) {
    const p = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [1.0, 2.0]);
    phaseName = "Dilatación (c = 2 > 1)";
    phaseColor = "#34D399";
  } else if (frame >= 140 && frame < 220) {
    const p = spring({ frame: frame - 140, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [2.0, 0.5]);
    phaseName = "Contracción (0 < c = 0.5 < 1)";
    phaseColor = "#FACC15";
  } else if (frame >= 220) {
    const p = spring({ frame: frame - 220, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [0.5, -1.5]);
    phaseName = "Inversión 180° y Dilatación (c = -1.5 < 0)";
    phaseColor = "#F43F5E";
  }

  const scaledV: [number, number] = [baseV[0] * c, baseV[1] * c];

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex items-center justify-between w-full max-w-[540px] px-2">
        <span style={{ color: phaseColor }} className="text-xs font-bold uppercase font-mono">
          {phaseName}
        </span>
        <span className="text-xs font-mono font-bold bg-[#121829] px-2.5 py-1 rounded-md border border-[#1E2942] text-white">
          Factor c = {c.toFixed(2)}
        </span>
      </div>

      <CoordinatePlane width={540} height={360} xRange={[-4, 5]} yRange={[-3, 3]}>
        {/* Línea directriz infinita (colinealidad) */}
        <line
          x1={540 * 0.05}
          y1={360 * 0.8}
          x2={540 * 0.95}
          y2={360 * 0.2}
          stroke="#1E2942"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Vector original como referencia translúcida */}
        <Vector2D from={[0, 0]} to={baseV} color="#64748B" strokeWidth={2} />

        {/* Vector escalado en tiempo real */}
        <Vector2D
          from={[0, 0]}
          to={scaledV}
          color={phaseColor}
          label={`c·v = (${scaledV[0].toFixed(1)}, ${scaledV[1].toFixed(1)})`}
          strokeWidth={4.5}
        />
      </CoordinatePlane>
    </div>
  );
};
