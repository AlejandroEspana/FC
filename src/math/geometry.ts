/**
 * src/math/geometry.ts
 * Utilidades geométricas puras: transformaciones cartesianas/polares, distancias e interpolaciones.
 */

import { Vector2, vec2 } from "./vectors";

export interface BoundingBox2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function polarToCartesian(radius: number, angleRadians: number): Vector2 {
  return vec2(radius * Math.cos(angleRadians), radius * Math.sin(angleRadians));
}

export function cartesianToPolar(x: number, y: number): { radius: number; angleRadians: number; angleDegrees: number } {
  const radius = Math.sqrt(x * x + y * y);
  const angleRadians = Math.atan2(y, x);
  let deg = (angleRadians * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return { radius, angleRadians, angleDegrees: deg };
}

export function euclideanDistance(a: Vector2, b: Vector2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVector2(a: Vector2, b: Vector2, t: number): Vector2 {
  return vec2(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
}
