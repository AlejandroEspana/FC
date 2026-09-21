import test from "node:test";
import assert from "node:assert/strict";

import {
  vec2,
  vec3,
  addVectors,
  subtractVectors,
  scaleVector,
  vectorMagnitude,
  dotProduct,
  crossProduct,
  normalizeVector,
} from "../src/math/vectors";

import {
  multiplyMatrices,
  canMultiplyMatrices,
  determinant2x2,
  determinant3x3,
  computeMultiplicationStep,
} from "../src/math/matrices";

import {
  malthusianSeries,
  logisticMapSeries,
  analyzeLogisticFixedPoints,
} from "../src/math/discrete";

test("Vectores: Operaciones básicas y álgebra euclidiana", () => {
  const u = vec2(3, 4);
  const v = vec2(1, 2);

  // Suma
  const sum = addVectors(u, v);
  assert.equal(sum.x, 4);
  assert.equal(sum.y, 6);

  // Resta
  const diff = subtractVectors(u, v);
  assert.equal(diff.x, 2);
  assert.equal(diff.y, 2);

  // Magnitud / Norma Pitagórica 3-4-5
  const mag = vectorMagnitude(u);
  assert.equal(mag, 5);

  // Normalización
  const unitU = normalizeVector(u);
  assert.ok(Math.abs(unitU.x - 0.6) < 1e-6);
  assert.ok(Math.abs(unitU.y - 0.8) < 1e-6);
  assert.ok(Math.abs(vectorMagnitude(unitU) - 1.0) < 1e-6);

  // Producto Escalar u · v = (3)(1) + (4)(2) = 3 + 8 = 11
  assert.equal(dotProduct(u, v), 11);

  // Producto Cruz en R³: (1, 0, 0) x (0, 1, 0) = (0, 0, 1)
  const iHat = vec3(1, 0, 0);
  const jHat = vec3(0, 1, 0);
  const kHat = crossProduct(iHat, jHat);
  assert.equal(kHat.x, 0);
  assert.equal(kHat.y, 0);
  assert.equal(kHat.z, 1);
});

test("Matrices: Multiplicación, determinantes y descomposición", () => {
  const A = [
    [1, 2],
    [3, 4],
  ];
  const B = [
    [2, 0],
    [1, 2],
  ];

  // Compatibilidad
  assert.equal(canMultiplyMatrices(A, B), true);

  // Multiplicación A * B = [[4, 4], [10, 8]]
  const C = multiplyMatrices(A, B);
  assert.deepEqual(C, [
    [4, 4],
    [10, 8],
  ]);

  // Paso detallado c_11 = (1)(2) + (2)(1) = 4
  const step = computeMultiplicationStep(A, B, 0, 0);
  assert.equal(step.sumResult, 4);
  assert.equal(step.terms.length, 2);

  // Determinante 2x2: det(A) = 1*4 - 2*3 = -2
  assert.equal(determinant2x2(A), -2);

  // Determinante 3x3 de la identidad
  const I3 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  assert.equal(determinant3x3(I3), 1);
});

test("Modelos Discretos: Recurrencias, puntos fijos y estabilidad", () => {
  // Malthus: x0 = 10, r = 2 -> [10, 20, 40, 80]
  const mSeries = malthusianSeries(2, 10, 3);
  assert.equal(mSeries.length, 4);
  assert.equal(mSeries[3].value, 80);

  // Mapa Logístico: x0 = 0.5, r = 2 -> x1 = 2 * 0.5 * 0.5 = 0.5 (punto fijo)
  const logSeries = logisticMapSeries(2, 0.5, 3);
  assert.equal(logSeries[0].value, 0.5);
  assert.equal(logSeries[1].value, 0.5);

  // Análisis de puntos fijos para r = 2.5: x* = 1 - 1/2.5 = 0.6
  const analysis = analyzeLogisticFixedPoints(2.5);
  const nonTrivial = analysis.find((p) => p.xStar > 0);
  assert.ok(nonTrivial);
  assert.ok(Math.abs(nonTrivial.xStar - 0.6) < 1e-6);
  assert.equal(nonTrivial.isStable, true); // |f'(0.6)| = 0.5 < 1
});
