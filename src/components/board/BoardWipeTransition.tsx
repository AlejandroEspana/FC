/**
 * src/components/board/BoardWipeTransition.tsx
 * Componente de Transición de Borrado de Pizarra Estilo Manim.
 * Simula el borrado físico de un pizarrón en blanco ("el tablero se llena
 * de información y se borre cuando la temática esté abordada"):
 * - Revelación progresiva al inicio.
 * - Barrido físico de borrador (wiper sweep) con barra de fieltro técnico al culminar.
 * - Limpieza total a lienzo inmaculado para la siguiente sección.
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";

export interface BoardWipeTransitionProps {
  topic?: CourseTopic;
  durationInFrames: number;
  wipeDurationFrames?: number; // Duración en frames del barrido final (default: 30f = 0.5s)
  introDurationFrames?: number; // Duración de entrada progresiva (default: 20f)
  label?: string;
  direction?: "left-to-right" | "right-to-left";
  wiperColor?: string; // Color personalizado del borrador
  showIndicator?: boolean; // Mostrar barra de borrador física
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const BoardWipeTransition: React.FC<BoardWipeTransitionProps> = ({
  topic = "vectors",
  durationInFrames,
  wipeDurationFrames = 30,
  introDurationFrames = 20,
  label = "LIMPIANDO TABLERO PARA SIGUIENTE FASE",
  direction = "left-to-right",
  wiperColor,
  showIndicator = true,
  children,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTopicTheme(topic);
  const activeWiperColor = wiperColor || theme.primary;

  // 1. Animación de entrada progresiva
  const introAnim = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });
  const introOpacity = interpolate(introAnim, [0, 1], [0, 1]);
  const introScale = interpolate(introAnim, [0, 1], [0.985, 1]);

  // 2. Animación de borrado al final de la temática
  const wipeStartFrame = Math.max(0, durationInFrames - wipeDurationFrames);
  const isWiping = frame >= wipeStartFrame;

  const wipeProgress = isWiping
    ? spring({
        frame: frame - wipeStartFrame,
        fps,
        config: { damping: 18, stiffness: 90 },
      })
    : 0;

  const clampedProgress = Math.min(1, Math.max(0, wipeProgress));

  // Recorte de contenido (clipPath) a medida que el borrador avanza
  const clipInset =
    direction === "left-to-right"
      ? `inset(0 0 0 ${(clampedProgress * 100).toFixed(2)}%)`
      : `inset(0 ${(clampedProgress * 100).toFixed(2)}% 0 0)`;

  // Posición en porcentaje de la barra física del borrador
  const wiperPosPercent =
    direction === "left-to-right"
      ? clampedProgress * 100
      : (1 - clampedProgress) * 100;

  return (
    <div
      style={{
        ...style,
      }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Contenido en el tablero con recorte según el avance del borrado */}
      <div
        style={{
          opacity: introOpacity,
          transform: `scale(${introScale})`,
          clipPath: isWiping ? clipInset : undefined,
          transition: "none",
        }}
        className="w-full h-full"
      >
        {children}
      </div>

      {/* Barra física de borrador (Whiteboard Wiper Bar) activa únicamente durante el borrado */}
      {isWiping && showIndicator && clampedProgress > 0.01 && clampedProgress < 0.99 && (
        <div
          style={{
            left: `${wiperPosPercent}%`,
            transform: "translateX(-50%)",
            borderColor: activeWiperColor,
          }}
          className="absolute top-0 bottom-0 w-8 z-50 pointer-events-none flex flex-col items-center justify-between py-6"
        >
          {/* Estructura del borrador técnico */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: activeWiperColor,
              boxShadow: `0 0 20px rgba(0,0,0,0.15), -4px 0 12px ${activeWiperColor}30`,
            }}
            className="w-4 h-full rounded-full border-2 flex flex-col items-center justify-between py-8 shadow-2xl relative overflow-hidden"
          >
            {/* Textura de fieltro de borrador */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `linear-gradient(45deg, ${activeWiperColor} 25%, transparent 25%), linear-gradient(-45deg, ${activeWiperColor} 25%, transparent 25%)`,
                backgroundSize: "6px 6px",
              }}
            />

            {/* Marcador superior */}
            <div
              className="w-2 h-2 rounded-full z-10 animate-ping"
              style={{ backgroundColor: activeWiperColor }}
            />

            {/* Etiqueta vertical rotada */}
            <span
              style={{ color: theme.textPrimary }}
              className="rotate-90 whitespace-nowrap text-[9px] font-mono font-black tracking-widest uppercase select-none z-10"
            >
              {label.slice(0, 18)}
            </span>

            {/* Marcador inferior */}
            <div
              className="w-2 h-2 rounded-full z-10"
              style={{ backgroundColor: activeWiperColor }}
            />
          </div>

          {/* Destello de estela de borrado limpio */}
          <div
            style={{
              background: `linear-gradient(to right, transparent, ${theme.boardBg})`,
            }}
            className="absolute -left-12 top-0 bottom-0 w-12 pointer-events-none opacity-80"
          />
        </div>
      )}
    </div>
  );
};
