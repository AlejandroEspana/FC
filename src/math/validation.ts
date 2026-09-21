/**
 * src/math/validation.ts
 * Validadores numéricos y algebraicos antes de la visualización en pantalla.
 */

import { AnyVector, dotProduct, vectorMagnitude } from "./vectors";
import { Matrix, canMultiplyMatrices, getMatrixDimensions } from "./matrices";

export function isOrthogonal(a: AnyVector, b: AnyVector, tolerance: number = 1e-6): boolean {
  return Math.abs(dotProduct(a, b)) < tolerance;
}

export function isUnitVector(v: AnyVector, tolerance: number = 1e-6): boolean {
  return Math.abs(vectorMagnitude(v) - 1.0) < tolerance;
}

export function areMatricesCompatibleForMultiplication(A: Matrix, B: Matrix): boolean {
  return canMultiplyMatrices(A, B);
}

export function isSquareMatrix(m: Matrix): boolean {
  const dim = getMatrixDimensions(m);
  return dim.rows === dim.cols && dim.rows > 0;
}
