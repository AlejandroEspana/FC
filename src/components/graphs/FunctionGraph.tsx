import React, { useMemo } from "react";
import { usePlane } from "./CoordinatePlane";

export interface FunctionGraphProps {
  f: (x: number) => number;
  xRange?: [number, number];
  steps?: number;
  color?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
}

export const FunctionGraph: React.FC<FunctionGraphProps> = ({
  f,
  xRange,
  steps = 200,
  color = "#38BDF8",
  strokeWidth = 2.5,
  strokeDasharray,
  opacity = 1,
}) => {
  const { toScreen, width, height } = usePlane();

  const pathData = useMemo(() => {
    const minX = xRange ? xRange[0] : 0;
    const maxX = xRange ? xRange[1] : 1;
    const dx = (maxX - minX) / steps;

    let d = "";
    let started = false;

    for (let i = 0; i <= steps; i++) {
      const x = minX + i * dx;
      const y = f(x);

      if (isNaN(y) || !isFinite(y)) {
        started = false;
        continue;
      }

      const [px, py] = toScreen(x, y);

      // Clamp dentro de la vista para evitar artefactos SVG gigantes
      if (py < -100 || py > height + 100) {
        started = false;
        continue;
      }

      if (!started) {
        d += `M ${px.toFixed(1)} ${py.toFixed(1)} `;
        started = true;
      } else {
        d += `L ${px.toFixed(1)} ${py.toFixed(1)} `;
      }
    }

    return d;
  }, [f, xRange, steps, toScreen, height]);

  return (
    <path
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={opacity}
    />
  );
};
