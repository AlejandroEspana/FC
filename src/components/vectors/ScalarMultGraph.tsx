import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";
import { TOPIC_THEMES } from "../../theme/boardTheme";

export interface ScalarMultGraphProps {
  width?: number;
  height?: number;
}

export const ScalarMultGraph: React.FC<ScalarMultGraphProps> = ({
  width = 540,
  height = 360,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = TOPIC_THEMES.vectors;

  const baseV: [number, number] = [2, 1];

  let c = 1.0;
  let regimeName = "Vector Base (c = 1)";
  let regimeTag = "REFERENCIA";
  let regimeColor = theme.primary;

  if (frame < 50) {
    c = 1.0;
    regimeName = "Vector Base Original (c = 1.0)";
    regimeTag = "BASE";
    regimeColor = theme.primary;
  } else if (frame >= 50 && frame < 120) {
    const p = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [1.0, 2.0]);
    regimeName = "Dilatación Homotética (c = 2 > 1)";
    regimeTag = "AMPLIFICACIÓN";
    regimeColor = theme.result;
  } else if (frame >= 120 && frame < 180) {
    const p = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [2.0, 0.5]);
    regimeName = "Contracción Homotética (0 < c = 0.5 < 1)";
    regimeTag = "REDUCCIÓN";
    regimeColor = theme.secondary;
  } else if (frame >= 180 && frame < 220) {
    const p = spring({ frame: frame - 180, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [0.5, 0.0]);
    regimeName = "Colapso al Vector Nulo (c = 0)";
    regimeTag = "VECTOR NULO";
    regimeColor = theme.tertiary;
  } else {
    const p = spring({ frame: frame - 220, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [0.0, -1.5]);
    regimeName = "Inversión de Sentido 180° (c = -1.5 < 0)";
    regimeTag = "INVERSIÓN OPUESTA";
    regimeColor = theme.warning;
  }

  const scaledV: [number, number] = [baseV[0] * c, baseV[1] * c];

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Indicador de régimen en vivo */}
      <div className="flex items-center justify-between w-full max-w-[540px] px-2">
        <div className="flex items-center gap-2">
          <span
            style={{
              backgroundColor: `${regimeColor}20`,
              borderColor: `${regimeColor}50`,
              color: regimeColor,
            }}
            className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border"
          >
            {regimeTag}
          </span>
          <span style={{ color: regimeColor }} className="text-xs font-bold font-mono">
            {regimeName}
          </span>
        </div>
        <span className="text-xs font-mono font-bold bg-black/40 px-2.5 py-1 rounded-md border border-white/10 text-white">
          Factor c = {c.toFixed(2)}
        </span>
      </div>

      <CoordinatePlane width={width} height={height} xRange={[-4, 5]} yRange={[-3, 3]}>
        {/* Recta directriz colineal extendida */}
        <line
          x1={width * 0.05}
          y1={height * 0.8}
          x2={width * 0.95}
          y2={height * 0.2}
          stroke="#1E293B"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Vector original como referencia translúcida */}
        <Vector2D
          from={[0, 0]}
          to={baseV}
          color="rgba(148, 163, 184, 0.4)"
          label="\\vec{v}"
          strokeWidth={2}
        />

        {/* Vector escalado en tiempo real */}
        {Math.abs(c) > 0.05 ? (
          <Vector2D
            from={[0, 0]}
            to={scaledV}
            color={regimeColor}
            label={`c\\vec{v} = (${scaledV[0].toFixed(1)}, ${scaledV[1].toFixed(1)})`}
            strokeWidth={4.5}
          />
        ) : (
          /* Punto en el origen para el vector nulo c = 0 */
          <g>
            <circle cx={width / 2} cy={height / 2} r={6} fill={theme.tertiary} />
            <text
              x={width / 2 + 10}
              y={height / 2 - 10}
              fill="white"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              \\vec{0} = (0, 0)
            </text>
          </g>
        )}
      </CoordinatePlane>
    </div>
  );
};
