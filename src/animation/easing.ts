/**
 * src/animation/easing.ts
 * Curvas de aceleración y desaceleración cinemática estándar para animaciones fluidas.
 */

import { Easing } from "remotion";

export const EASINGS = {
  standard: Easing.bezier(0.2, 0.0, 0.0, 1.0),
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1.0),
  accelerate: Easing.bezier(0.4, 0.0, 1.0, 1.0),
  smoothCubic: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  inOutSine: Easing.inOut(Easing.sin),
  outExpo: Easing.out(Easing.exp),
};
