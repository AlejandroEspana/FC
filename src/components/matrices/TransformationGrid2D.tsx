import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "../vectors/Vector2D";
import { Matrix } from "../../math/matrices";
import { Vector2, vec2 } from "../../math/vectors";

export interface TransformationGrid2DProps {
  targetMatrix: Matrix; // Matriz 2x2 objetivo
  transformationName: string;
  delayFrames?: number;
}

export const TransformationGrid2D: React.FC<TransformationGrid2DProps> = ({
  targetMatrix,
  transformationName,
  delayFrames = 15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Interpolar de la identidad I a la matriz objetivo M
  const m00 = 1 + (targetMatrix[0][0] - 1) * progress;
  const m01 = 0 + (targetMatrix[0][1] - 0) * progress;
  const m10 = 0 + (targetMatrix[1][0] - 0) * progress;
  const m11 = 1 + (targetMatrix[1][1] - 1) * progress;

  const transformPoint = (p: Vector2): [number, number] => [
    m00 * p.x + m01 * p.y,
    m10 * p.x + m11 * p.y,
  ];

  // Cuadrado unitario transformado
  const p0 = transformPoint(vec2(0, 0));
  const p1 = transformPoint(vec2(1, 0));
  const p2 = transformPoint(vec2(1, 1));
  const p3 = transformPoint(vec2(0, 1));

  // Versores base transformados
  const iHatTransformed = transformPoint(vec2(1, 0));
  const jHatTransformed = transformPoint(vec2(0, 1));

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex items-center justify-between w-full max-w-[540px] px-2">
        <span className="text-xs uppercase font-mono font-bold text-[#38BDF8]">
          {transformationName}
        </span>
        <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          Progreso: {(progress * 100).toFixed(0)}%
        </span>
      </div>

      <CoordinatePlane width={540} height={380} xRange={[-3.5, 4.5]} yRange={[-3.5, 3.5]}>
        {/* Polígono del cuadrado unitario transformado */}
        <polygon
          points={`${540 * (p0[0] + 3.5) / 8},${380 * (3.5 - p0[1]) / 7} ${540 * (p1[0] + 3.5) / 8},${380 * (3.5 - p1[1]) / 7} ${540 * (p2[0] + 3.5) / 8},${380 * (3.5 - p2[1]) / 7} ${540 * (p3[0] + 3.5) / 8},${380 * (3.5 - p3[1]) / 7}`}
          fill="#38BDF8"
          fillOpacity={0.18}
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Versor i transformado (Cian) */}
        <Vector2D
          from={[0, 0]}
          to={iHatTransformed}
          color="#38BDF8"
          label="T(i)"
          strokeWidth={4.5}
        />

        {/* Versor j transformado (Amarillo) */}
        <Vector2D
          from={[0, 0]}
          to={jHatTransformed}
          color="#FACC15"
          label="T(j)"
          strokeWidth={4.5}
        />
      </CoordinatePlane>
    </div>
  );
};
