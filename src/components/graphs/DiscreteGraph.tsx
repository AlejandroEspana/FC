import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { usePlane } from "./CoordinatePlane";
import { DiscreteStep } from "../../math/discrete";

export interface DiscreteGraphProps {
  series: DiscreteStep[];
  color?: string;
  dotRadius?: number;
  showStems?: boolean;
  delayPerPointFrames?: number;
}

export const DiscreteGraph: React.FC<DiscreteGraphProps> = ({
  series,
  color = "#34D399",
  dotRadius = 4.5,
  showStems = true,
  delayPerPointFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { toScreen } = usePlane();

  return (
    <g>
      {series.map((step, idx) => {
        const pointDelay = idx * delayPerPointFrames;
        const progress = interpolate(frame, [pointDelay, pointDelay + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        if (progress === 0) return null;

        const [px, py] = toScreen(step.n, step.value);
        const [, basePy] = toScreen(step.n, 0);

        return (
          <g key={`discrete-${step.n}`} opacity={progress}>
            {/* Bastón vertical desde el eje horizontal */}
            {showStems && (
              <line
                x1={px}
                y1={basePy}
                x2={px}
                y2={py}
                stroke={color}
                strokeWidth={1.8}
                strokeDasharray="2 2"
                opacity={0.6 * progress}
              />
            )}

            {/* Punto de dato */}
            <circle
              cx={px}
              cy={py}
              r={dotRadius * progress}
              fill={color}
              stroke="#0A0D18"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </g>
  );
};
