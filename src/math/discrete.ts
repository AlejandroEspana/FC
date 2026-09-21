/**
 * src/math/discrete.ts
 * Capa matemática pura para Modelos Discretos, Ecuaciones en Diferencias y Sistemas Dinámicos.
 */

export interface DiscreteStep {
  n: number;
  value: number;
}

export interface CobwebPoint {
  x: number;
  y: number;
}

export interface CobwebSegment {
  from: CobwebPoint;
  to: CobwebPoint;
  type: "vertical" | "horizontal";
  stepIndex: number;
}

export interface FixedPointAnalysis {
  xStar: number;
  derivative: number;
  isStable: boolean;
  classification: "Atractor Estable" | "Repulsor Inestable" | "Neutro / Bifurcación";
}

// 1. Generador general de evolución temporal x_{n+1} = f(x_n)
export function generateRecurrenceSeries(
  f: (x: number) => number,
  x0: number,
  totalSteps: number
): DiscreteStep[] {
  const series: DiscreteStep[] = [{ n: 0, value: x0 }];
  let current = x0;

  for (let n = 1; n <= totalSteps; n++) {
    current = f(current);
    series.push({ n, value: current });
  }

  return series;
}

// 2. Modelo de Malthus (Crecimiento / Decaimiento Exponencial Discreto: x_{n+1} = r * x_n)
export function malthusianSeries(r: number, x0: number, steps: number): DiscreteStep[] {
  return generateRecurrenceSeries((x) => r * x, x0, steps);
}

// 3. Ecuación Logística Poblacional Discreta: x_{n+1} = r * x_n * (1 - x_n)
export function logisticMapSeries(r: number, x0: number, steps: number): DiscreteStep[] {
  return generateRecurrenceSeries((x) => r * x * (1 - x), x0, steps);
}

// 4. Análisis de Puntos Fijos y Estabilidad para el Mapa Logístico
export function analyzeLogisticFixedPoints(r: number): FixedPointAnalysis[] {
  const results: FixedPointAnalysis[] = [];

  // Punto fijo trivial x* = 0
  const deriv0 = r;
  results.push({
    xStar: 0,
    derivative: deriv0,
    isStable: Math.abs(deriv0) < 1,
    classification:
      Math.abs(deriv0) < 1
        ? "Atractor Estable"
        : Math.abs(deriv0) > 1
        ? "Repulsor Inestable"
        : "Neutro / Bifurcación",
  });

  // Punto fijo no trivial x* = 1 - 1/r (si r > 1)
  if (r > 1) {
    const xStar2 = 1 - 1 / r;
    const deriv2 = r * (1 - 2 * xStar2); // f'(x) = r(1 - 2x) -> r(1 - 2(1 - 1/r)) = 2 - r
    results.push({
      xStar: xStar2,
      derivative: deriv2,
      isStable: Math.abs(deriv2) < 1,
      classification:
        Math.abs(deriv2) < 1
          ? "Atractor Estable"
          : Math.abs(deriv2) > 1
          ? "Repulsor Inestable"
          : "Neutro / Bifurcación",
    });
  }

  return results;
}

// 5. Generador de la Trayectoria de Telaraña (Cobweb Plot)
export function generateCobwebPath(
  f: (x: number) => number,
  x0: number,
  iterations: number
): CobwebSegment[] {
  const segments: CobwebSegment[] = [];
  let currentX = x0;

  // Paso inicial: desde (x0, 0) verticalmente hasta la curva f(x0)
  const firstY = f(currentX);
  segments.push({
    from: { x: currentX, y: 0 },
    to: { x: currentX, y: firstY },
    type: "vertical",
    stepIndex: 0,
  });

  for (let i = 0; i < iterations; i++) {
    const nextY = f(currentX);

    // 1. Horizontal hacia la recta identidad y = x en (nextY, nextY)
    segments.push({
      from: { x: currentX, y: nextY },
      to: { x: nextY, y: nextY },
      type: "horizontal",
      stepIndex: i,
    });

    currentX = nextY;

    // 2. Vertical desde la identidad hacia la función f en (currentX, f(currentX))
    const futureY = f(currentX);
    if (i < iterations - 1) {
      segments.push({
        from: { x: currentX, y: currentX },
        to: { x: currentX, y: futureY },
        type: "vertical",
        stepIndex: i + 1,
      });
    }
  }

  return segments;
}
