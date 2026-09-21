/**
 * src/layout/LayoutConstraints.ts
 * Reglas de espaciado basadas en una cuadrícula de 8pt y restricciones de dimensiones legibles.
 */

export const SPACING_8PT = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  section: 80,
} as const;

export const LAYOUT_CONSTRAINTS = {
  maxContentWidth: 1728,
  maxContentHeight: 890,
  minReadableFontSizePx: 14,
  defaultCardRadius: 16, // rounded-2xl
  minTouchableArea: 48,
  standardColumnGap: 32,
  standardRowGap: 24,
} as const;
