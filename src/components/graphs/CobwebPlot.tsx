import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { usePlane } from "./CoordinatePlane";
import { CobwebSegment } from "../../math/discrete";

export interface CobwebPlotProps {
  segments: CobwebSegment[];
  color?: string;
  strokeWidth?: number;
  delayPerSegmentFrames?: number;
}

export const CobwebPlot: React.FC<CobwebPlotProps> = ({
  segments,
  color = "#FACC15",
  strokeWidth = 2.2,
  delayPerSegmentFrames = 12,
}) => {
  const frame = useCurrentFrame();
  const { toScreen } = usePlane();

  return (
    <g>
      {segments.map((seg, idx) => {
        const segDelay = idx * delayPerSegmentFrames;
        const progress = interpolate(frame, [segDelay, segDelay + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        if (progress === 0) return null;

        const [x1, y1] = toScreen(seg.from.x, seg.from.y);
        const [x2Target, y2Target] = toScreen(seg.to.x, seg.to.y);

        const currentX2 = x1 + (x2Target - x1) * progress;
        const currentY2 = y1 + (y2Target - y1) * progress;

        return (
          <g key={`cobweb-${idx}`}>
            <line
              x1={x1}
              y1={y1}
              x2={currentX2}
              y2={currentY2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Punto móvil en la cabeza del segmento activo */}
            {progress < 1 && (
              <circle
                cx={currentX2}
                cy={currentY2}
                r={3.5}
                fill="#34D399"
                stroke="#0A0D18"
                strokeWidth={1.5}
              />
            )}
          </g>
        );
      })}
    </g>
  );
};
