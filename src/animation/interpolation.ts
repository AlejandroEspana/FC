/**
 * src/animation/interpolation.ts
 * Utilidades matemáticas para interpolaciones cinemáticas seguras en Remotion.
 */

import { interpolate } from "remotion";
import { EASINGS } from "./easing";

export interface InterpolateOptions {
  easing?: (t: number) => number;
  delay?: number;
  duration?: number;
}

// Interpolación normalizada de 0 a 1 con clamping estricto
export function smoothProgress(
  frame: number,
  startFrame: number = 0,
  durationFrames: number = 20,
  easing: (t: number) => number = EASINGS.decelerate
): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// Fade in de opacidad de 0 a 1
export function fadeInOpacity(
  frame: number,
  startFrame: number = 0,
  durationFrames: number = 15
): number {
  return smoothProgress(frame, startFrame, durationFrames, EASINGS.decelerate);
}

// Fade out de opacidad de 1 a 0
export function fadeOutOpacity(
  frame: number,
  startFrame: number,
  durationFrames: number = 15
): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.accelerate,
  });
}
