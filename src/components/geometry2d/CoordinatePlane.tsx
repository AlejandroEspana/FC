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

interface CoordinatePlaneProps {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  stepX?: number;
  stepY?: number;
  showNumbers?: boolean;
  opacity?: number;
  children?: React.ReactNode;
}

export const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({
  width = 720,
  height = 540,
  xRange = [-5, 5],
  yRange = [-3.5, 3.5],
  stepX = 1,
  stepY = 1,
  showNumbers = true,
  opacity: targetOpacity = 1,
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

  // Generar líneas de cuadrícula
  const gridLines = useMemo(() => {
    const vertical: number[] = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += stepX) {
      if (x !== 0) vertical.push(x);
    }
    const horizontal: number[] = [];
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += stepY) {
      if (y !== 0) horizontal.push(y);
    }
    return { vertical, horizontal };
  }, [xMin, xMax, yMin, yMax, stepX, stepY]);

  return (
    <PlaneContext.Provider
      value={{ toScreen, fromScreen, width, height, originX, originY, scaleX, scaleY }}
    >
      <div
        style={{ opacity: animOpacity, width, height }}
        className="relative bg-[#070A12] rounded-2xl border border-[#1E2942] overflow-hidden shadow-2xl flex items-center justify-center"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
        >
          <defs>
            <marker
              id="axis-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#8F9CAE" />
            </marker>
          </defs>

          {/* Cuadrícula secundaria */}
          {gridLines.vertical.map((x) => {
            const [px] = toScreen(x, 0);
            return (
              <line
                key={`v-${x}`}
                x1={px}
                y1={0}
                x2={px}
                y2={height}
                stroke="#1B2538"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            );
          })}
          {gridLines.horizontal.map((y) => {
            const [, py] = toScreen(0, y);
            return (
              <line
                key={`h-${y}`}
                x1={0}
                y1={py}
                x2={width}
                y2={py}
                stroke="#1B2538"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Eje X principal */}
          <line
            x1={0}
            y1={originY}
            x2={width - 4}
            y2={originY}
            stroke="#8F9CAE"
            strokeWidth="2"
            markerEnd="url(#axis-arrow)"
          />
          {/* Eje Y principal */}
          <line
            x1={originX}
            y1={height}
            x2={originX}
            y2={4}
            stroke="#8F9CAE"
            strokeWidth="2"
            markerEnd="url(#axis-arrow)"
          />

          {/* Etiquetas y Ticks de los ejes */}
          {showNumbers && (
            <>
              {gridLines.vertical.map((x) => {
                const [px, py] = toScreen(x, 0);
                return (
                  <g key={`lbl-x-${x}`}>
                    <line x1={px} y1={py - 4} x2={px} y2={py + 4} stroke="#8F9CAE" strokeWidth="1.5" />
                    <text
                      x={px}
                      y={py + 16}
                      fill="#64748B"
                      fontSize="12"
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
                    <line x1={px - 4} y1={py} x2={px + 4} y2={py} stroke="#8F9CAE" strokeWidth="1.5" />
                    <text
                      x={px - 10}
                      y={py + 4}
                      fill="#64748B"
                      fontSize="12"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      {y}
                    </text>
                  </g>
                );
              })}
              {/* Origen (0,0) */}
              <circle cx={originX} cy={originY} r="3" fill="#8F9CAE" />
              <text
                x={originX - 10}
                y={originY + 16}
                fill="#64748B"
                fontSize="12"
                fontFamily="JetBrains Mono, monospace"
              >
                0
              </text>

              {/* Nombre de los ejes */}
              <text
                x={width - 20}
                y={originY - 10}
                fill="#38BDF8"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
              >
                X
              </text>
              <text
                x={originX + 10}
                y={20}
                fill="#38BDF8"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Y
              </text>
            </>
          )}

          {/* Capas y elementos vectoriales superpuestos */}
          {children}
        </svg>
      </div>
    </PlaneContext.Provider>
  );
};
