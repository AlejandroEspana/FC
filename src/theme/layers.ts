/**
 * src/theme/layers.ts
 * Sistema formal de capas Z-Index para evitar que elementos visuales se superpongan o tapen accidentalmente.
 */

export const LAYERS = {
  Background: 0,
  Grid: 10,
  Geometry: 20,
  MathObjects: 30,
  Equations: 40,
  Labels: 50,
  Highlights: 60,
  Explanations: 70,
  UI: 80,
} as const;

export type LayerName = keyof typeof LAYERS;
