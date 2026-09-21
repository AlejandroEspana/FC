import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { usePlane } from "../graphs/CoordinatePlane";

export interface Vector2DProps {
  from?: [number, number];
  to: [number, number];
  color?: string;
  label?: string;
  showComponents?: boolean;
  strokeWidth?: number;
  delay?: number;
}

export const Vector2D: React.FC<Vector2DProps> = ({
  from = [0, 0],
  to,
  color = "#38BDF8",
  label,
  showComponents = false,
  strokeWidth = 4,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { toScreen } = usePlane();

  const animProgress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const [startX, startY] = toScreen(from[0], from[1]);
  const [targetEndX, targetEndY] = toScreen(to[0], to[1]);

  const currentEndX = startX + (targetEndX - startX) * animProgress;
  const currentEndY = startY + (targetEndY - startY) * animProgress;

  const dx = currentEndX - startX;
  const dy = currentEndY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len < 1) return null;

  const headSize = Math.min(18, Math.max(8, strokeWidth * 3));
  const ux = dx / len;
  const uy = dy / len;

  const arrowPointX = currentEndX;
  const arrowPointY = currentEndY;
  const arrowBaseX = currentEndX - ux * headSize;
  const arrowBaseY = currentEndY - uy * headSize;
  const perpX = -uy * (headSize * 0.5);
  const perpY = ux * (headSize * 0.5);

  const leftWingX = arrowBaseX + perpX;
  const leftWingY = arrowBaseY + perpY;
  const rightWingX = arrowBaseX - perpX;
  const rightWingY = arrowBaseY - perpY;

  // Proyecciones ortogonales
  const [projX_X, projX_Y] = toScreen(to[0], 0);
  const [projY_X, projY_Y] = toScreen(0, to[1]);

  const labelOpacity = interpolate(animProgress, [0.7, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g>
      {showComponents && animProgress > 0.4 && (
        <g opacity={labelOpacity * 0.7}>
          {/* Proyección vertical punteada */}
          <line
            x1={targetEndX}
            y1={targetEndY}
            x2={projX_X}
            y2={projX_Y}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Proyección horizontal punteada */}
          <line
            x1={targetEndX}
            y1={targetEndY}
            x2={projY_X}
            y2={projY_Y}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </g>
      )}

      {/* Cuerpo de la flecha */}
      <line
        x1={startX}
        y1={startY}
        x2={arrowBaseX}
        y2={arrowBaseY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Punta de flecha triangular rellena */}
      <polygon
        points={`${arrowPointX},${arrowPointY} ${leftWingX},${leftWingY} ${rightWingX},${rightWingY}`}
        fill={color}
      />

      {/* Etiqueta del vector */}
      {label && animProgress > 0.3 && (() => {
        const cleanLabel = label
          .replace(/\\\\vec\{([^}]+)\}/g, "$1")
          .replace(/\\vec\{([^}]+)\}/g, "$1")
          .replace(/\\mathrm\{([^}]+)\}/g, "$1")
          .replace(/\\hat\{([^}]+)\}/g, "$1̂")
          .replace(/\\theta/g, "θ")
          .replace(/\\perp/g, "⟂")
          .replace(/\\parallel/g, "∥")
          .replace(/\\text\{([^}]+)\}/g, "$1")
          .replace(/\\/g, "");

        const rectWidth = Math.max(48, cleanLabel.length * 7.5 + 16);
        const isNearRight = arrowPointX + rectWidth > 490;
        const rectX = isNearRight ? arrowPointX - rectWidth - 8 : arrowPointX + 8;
        const textX = rectX + 8;

        return (
          <g opacity={labelOpacity}>
            <rect
              x={rectX}
              y={arrowPointY - 14}
              width={rectWidth}
              height={20}
              rx={6}
              fill="#0A0D18"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.95"
            />
            <text
              x={textX}
              y={arrowPointY}
              fill="#F8FAFC"
              fontSize="11"
              fontWeight="bold"
              fontFamily="JetBrains Mono, monospace"
            >
              {cleanLabel}
            </text>
          </g>
        );
      })()}
    </g>
  );
};
