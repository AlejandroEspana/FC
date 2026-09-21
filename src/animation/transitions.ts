/**
 * src/animation/transitions.ts
 * Estilos reactivos listos para consumir en componentes visuales (opacidad, traslación, escala).
 */

import { CSSProperties } from "react";
import { spring } from "remotion";
import { smoothProgress } from "./interpolation";
import { EASINGS } from "./easing";

export function getEntranceTransition(
  frame: number,
  fps: number = 60,
  delay: number = 0,
  durationFrames: number = 20
): CSSProperties {
  const localFrame = Math.max(0, frame - delay);
  const opacity = smoothProgress(localFrame, 0, durationFrames, EASINGS.decelerate);

  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const translateY = (1 - spr) * 20; // Sube suavemente 20px
  const scale = 0.96 + spr * 0.04;   // Crece de 0.96 a 1.0

  return {
    opacity,
    transform: `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`,
  };
}

export function getHighlightStyle(
  isActive: boolean,
  highlightColor: string = "#38BDF8"
): CSSProperties {
  if (!isActive) return {};
  return {
    borderColor: highlightColor,
    boxShadow: `0 0 24px ${highlightColor}40`,
  };
}
