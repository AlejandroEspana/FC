import React, { createContext, useContext, useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface PlaneContextType {
  toScreen: (x: number, y: number) => [number, number];
  fromScreen: (px: number, py: number) => [number, number];
  width: number;
  height: number;
  originX: number;
  originY: number;
  scaleX: number;
  scaleY: number;
}

export const PlaneContext = createContext<PlaneContextType | null>(null);

export const usePlane = () => {
  const ctx = useContext(PlaneContext);
  if (!ctx) {
    throw new Error("usePlane must be used within a CoordinatePlane");
  }
  return ctx;
};

export interface CoordinatePlaneProps {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  stepX?: number;
  stepY?: number;
  showNumbers?: boolean;
  opacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({
  width = 640,
  height = 440,
  xRange = [-5, 5],
  yRange = [-3.5, 3.5],
  stepX = 1,
  stepY = 1,
  showNumbers = true,
  opacity: targetOpacity = 1,
  className = "",
  children,
}) => {
  const frame = useCurrentFrame();

  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const { toScreen, fromScreen, originX, originY, scaleX, scaleY } = useMemo(() => {
    const sX = width / (xMax - xMin);
    const sY = height / (yMax - yMin);
    const oX = -xMin * sX;
    const oY = yMax * sY; // El eje Y de pantalla baja hacia abajo

    const toScr = (x: number, y: number): [number, number] => [
      oX + x * sX,
      oY - y * sY,
    ];

    const fromScr = (px: number, py: number): [number, number] => [
      (px - oX) / sX,
      (oY - py) / sY,
    ];

    return { toScreen: toScr, fromScreen: fromScr, originX: oX, originY: oY, scaleX: sX, scaleY: sY };
  }, [width, height, xMin, xMax, yMin, yMax]);

  const animOpacity = interpolate(frame, [0, 15], [0, targetOpacity], {
    extrapolateRight: "clamp",
  });

  // Generar líneas de cuadrícula y marcas
  const gridLines = useMemo(() => {
    const vertical: number[] = [];
    const horizontal: number[] = [];

    const firstX = Math.ceil(xMin / stepX) * stepX;
    for (let x = firstX; x <= xMax; x += stepX) {
      if (Math.abs(x) > 1e-6) vertical.push(x);
    }

    const firstY = Math.ceil(yMin / stepY) * stepY;
    for (let y = firstY; y <= yMax; y += stepY) {
      if (Math.abs(y) > 1e-6) horizontal.push(y);
    }

    return { vertical, horizontal };
  }, [xMin, xMax, yMin, yMax, stepX, stepY]);

  return (
    <PlaneContext.Provider
      value={{ toScreen, fromScreen, width, height, originX, originY, scaleX, scaleY }}
    >
      <div
        style={{ width, height, opacity: animOpacity }}
        className={`relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm ${className}`}
      >
        <svg width={width} height={height} className="w-full h-full block">
          <defs>
            <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
            </pattern>
          </defs>

          {/* Cuadrícula de puntos */}
          <rect width={width} height={height} fill="url(#grid-dots)" />

          {/* Líneas de cuadrícula vertical */}
          {gridLines.vertical.map((x) => {
            const [px] = toScreen(x, 0);
            return (
              <line
                key={`grid-x-${x}`}
                x1={px}
                y1={0}
                x2={px}
                y2={height}
                stroke="#E2E8F0"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Líneas de cuadrícula horizontal */}
          {gridLines.horizontal.map((y) => {
            const [, py] = toScreen(0, y);
            return (
              <line
                key={`grid-y-${y}`}
                x1={0}
                y1={py}
                x2={width}
                y2={py}
                stroke="#E2E8F0"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Eje X */}
          {originY >= 0 && originY <= height && (
            <line
              x1={0}
              y1={originY}
              x2={width}
              y2={originY}
              stroke="#334155"
              strokeWidth="2.2"
            />
          )}

          {/* Eje Y */}
          {originX >= 0 && originX <= width && (
            <line
              x1={originX}
              y1={0}
              x2={originX}
              y2={height}
              stroke="#334155"
              strokeWidth="2.2"
            />
          )}

          {/* Marcas numéricas y ticks */}
          {showNumbers && (
            <>
              {gridLines.vertical.map((x) => {
                const [px, py] = toScreen(x, 0);
                return (
                  <g key={`lbl-x-${x}`}>
                    <line x1={px} y1={py - 4} x2={px} y2={py + 4} stroke="#64748B" strokeWidth="1.5" />
                    <text
                      x={px}
                      y={py + 16}
                      fill="#475569"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                    >
                      {x}
                    </text>
                  </g>
                );
              })}
              {gridLines.horizontal.map((y) => {
                const [px, py] = toScreen(0, y);
                return (
                  <g key={`lbl-y-${y}`}>
                    <line x1={px - 4} y1={py} x2={px + 4} y2={py} stroke="#64748B" strokeWidth="1.5" />
                    <text
                      x={px - 8}
                      y={py + 4}
                      fill="#475569"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      {y}
                    </text>
                  </g>
                );
              })}
              {/* Origen 0 */}
              <circle cx={originX} cy={originY} r="3.5" fill="#334155" />
              <text
                x={originX - 10}
                y={originY + 14}
                fill="#475569"
                fontSize="11"
                fontWeight="bold"
                fontFamily="JetBrains Mono, monospace"
              >
                0
              </text>

              {/* Nombre de los ejes */}
              <text
                x={width - 20}
                y={originY - 8}
                fill="#2563EB"
                fontSize="13"
                fontWeight="extrabold"
                fontFamily="monospace"
              >
                X
              </text>
              <text
                x={originX + 8}
                y={20}
                fill="#2563EB"
                fontSize="13"
                fontWeight="extrabold"
                fontFamily="monospace"
              >
                Y
              </text>
            </>
          )}

          {/* Elementos vectoriales y gráficos superpuestos */}
          {children}
        </svg>
      </div>
    </PlaneContext.Provider>
  );
};
