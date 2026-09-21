import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { usePlane } from "./CoordinatePlane";

interface AnimatedVectorProps {
  from?: [number, number];
  to: [number, number];
  color?: string;
  label?: string;
  showComponents?: boolean;
  delay?: number;
  strokeWidth?: number;
  labelOffset?: [number, number];
}

export const AnimatedVector: React.FC<AnimatedVectorProps> = ({
  from = [0, 0],
  to,
  color = "#38BDF8",
  label,
  showComponents = false,
  delay = 0,
  strokeWidth = 3.5,
  labelOffset = [12, -12],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { toScreen } = usePlane();

  const localFrame = Math.max(0, frame - delay);
  const growProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Coordenadas matemáticas interpoladas
  const curX = from[0] + (to[0] - from[0]) * growProgress;
  const curY = from[1] + (to[1] - from[1]) * growProgress;

  const [startX, startY] = toScreen(from[0], from[1]);
  const [endX, endY] = toScreen(curX, curY);
  const [targetEndX, targetEndY] = toScreen(to[0], to[1]);
  const [projX, projY] = toScreen(to[0], from[1]);

  const markerId = `arrow-${color.replace("#", "")}`;

  // Calcular ángulo para la cabeza de flecha
  const angle = Math.atan2(endY - startY, endX - startX);
  const arrowLength = 14;

  const arrowP1 = [
    endX - arrowLength * Math.cos(angle - Math.PI / 7),
    endY - arrowLength * Math.sin(angle - Math.PI / 7),
  ];
  const arrowP2 = [
    endX - arrowLength * Math.cos(angle + Math.PI / 7),
    endY - arrowLength * Math.sin(angle + Math.PI / 7),
  ];

  const labelOpacity = interpolate(localFrame, [15, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <g>
      {/* Componentes ortogonales punteadas (opcional) */}
      {showComponents && growProgress > 0.9 && (
        <g opacity={interpolate(localFrame, [20, 30], [0, 0.7], { extrapolateRight: "clamp" })}>
          {/* Proyección horizontal (vx) */}
          <line
            x1={startX}
            y1={startY}
            x2={projX}
            y2={projY}
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Proyección vertical (vy) */}
          <line
            x1={projX}
            y1={projY}
            x2={targetEndX}
            y2={targetEndY}
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </g>
      )}

      {/* Trazado del cuerpo del vector */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Cabeza de flecha puntiaguda */}
      {growProgress > 0.05 && (
        <polygon
          points={`${endX},${endY} ${arrowP1[0]},${arrowP1[1]} ${arrowP2[0]},${arrowP2[1]}`}
          fill={color}
        />
      )}

      {/* Punto en el origen */}
      <circle cx={startX} cy={startY} r={strokeWidth * 0.9} fill={color} />

      {/* Etiqueta del vector */}
      {label && (
        <g
          opacity={labelOpacity}
          transform={`translate(${targetEndX + labelOffset[0]}, ${targetEndY + labelOffset[1]})`}
        >
          <rect
            x="-6"
            y="-16"
            width={label.length * 10 + 16}
            height="24"
            rx="6"
            fill="#0A0D18"
            fillOpacity="0.85"
            stroke={color}
            strokeWidth="1"
          />
          <text
            x="4"
            y="0"
            fill={color}
            fontSize="14"
            fontWeight="bold"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};
