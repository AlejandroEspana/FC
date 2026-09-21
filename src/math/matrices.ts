/**
 * src/math/matrices.ts
 * Capa matemática pura de operaciones matriciales y transformaciones lineales.
 * Proporciona cómputos exactos y descomposición pedagógica paso a paso.
 */

import { Vector2, vec2 } from "./vectors";

export type Matrix = number[][];

export interface MatrixDimension {
  rows: number;
  cols: number;
}

export function getMatrixDimensions(m: Matrix): MatrixDimension {
  const rows = m.length;
  const cols = rows > 0 ? m[0].length : 0;
  return { rows, cols };
}

// 1. Creación de matrices especiales
export function createMatrix(rows: number, cols: number, defaultValue: number = 0): Matrix {
  return Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
}

export function identityMatrix(n: number): Matrix {
  const I = createMatrix(n, n, 0);
  for (let i = 0; i < n; i++) {
    I[i][i] = 1;
  }
  return I;
}

export function zeroMatrix(rows: number, cols: number): Matrix {
  return createMatrix(rows, cols, 0);
}

// 2. Suma y Resta elemento a elemento
export function addMatrices(A: Matrix, B: Matrix): Matrix {
  const dimA = getMatrixDimensions(A);
  const dimB = getMatrixDimensions(B);
  if (dimA.rows !== dimB.rows || dimA.cols !== dimB.cols) {
    throw new Error(`Dimensiones incompatibles para suma matricial: (${dimA.rows}x${dimA.cols}) vs (${dimB.rows}x${dimB.cols})`);
  }
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

export function subtractMatrices(A: Matrix, B: Matrix): Matrix {
  const dimA = getMatrixDimensions(A);
  const dimB = getMatrixDimensions(B);
  if (dimA.rows !== dimB.rows || dimA.cols !== dimB.cols) {
    throw new Error(`Dimensiones incompatibles para resta matricial: (${dimA.rows}x${dimA.cols}) vs (${dimB.rows}x${dimB.cols})`);
  }
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

// 3. Multiplicación por escalar
export function scaleMatrix(A: Matrix, scalar: number): Matrix {
  return A.map((row) => row.map((val) => val * scalar));
}

// 4. Compatibilidad para multiplicación A(m x n) * B(n x p)
export function canMultiplyMatrices(A: Matrix, B: Matrix): boolean {
  const dimA = getMatrixDimensions(A);
  const dimB = getMatrixDimensions(B);
  return dimA.cols === dimB.rows && dimA.rows > 0 && dimB.cols > 0;
}

// 5. Multiplicación matricial estándar A * B
export function multiplyMatrices(A: Matrix, B: Matrix): Matrix {
  if (!canMultiplyMatrices(A, B)) {
    const dimA = getMatrixDimensions(A);
    const dimB = getMatrixDimensions(B);
    throw new Error(
      `Dimensiones incompatibles para multiplicación: A(${dimA.rows}x${dimA.cols}) y B(${dimB.rows}x${dimB.cols}). Las columnas de A deben ser iguales a las filas de B.`
    );
  }

  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  const C = createMatrix(rowsA, colsB, 0);

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }

  return C;
}

// 6. Desglose analítico paso a paso para visualizaciones educativas
export interface MultiplicationStepDetail {
  rowIndex: number;
  colIndex: number;
  rowValues: number[];
  colValues: number[];
  terms: { a: number; b: number; product: number }[];
  sumResult: number;
  latexExpression: string;
}

export function computeMultiplicationStep(A: Matrix, B: Matrix, i: number, j: number): MultiplicationStepDetail {
  const dimA = getMatrixDimensions(A);
  const dimB = getMatrixDimensions(B);

  if (i < 0 || i >= dimA.rows || j < 0 || j >= dimB.cols) {
    throw new Error(`Índices fuera de rango (${i}, ${j})`);
  }

  const rowValues = A[i];
  const colValues = B.map((row) => row[j]);
  const terms: { a: number; b: number; product: number }[] = [];
  let sum = 0;

  for (let k = 0; k < dimA.cols; k++) {
    const a = rowValues[k];
    const b = colValues[k];
    const product = a * b;
    terms.push({ a, b, product });
    sum += product;
  }

  const termStrs = terms.map((t) => `(${t.a} \\cdot ${t.b})`).join(" + ");
  const latexExpression = `c_{${i + 1}${j + 1}} = ${termStrs} = ${sum}`;

  return {
    rowIndex: i,
    colIndex: j,
    rowValues,
    colValues,
    terms,
    sumResult: sum,
    latexExpression,
  };
}

// 7. Transpuesta de una matriz
export function transposeMatrix(A: Matrix): Matrix {
  const dim = getMatrixDimensions(A);
  const T = createMatrix(dim.cols, dim.rows, 0);
  for (let i = 0; i < dim.rows; i++) {
    for (let j = 0; j < dim.cols; j++) {
      T[j][i] = A[i][j];
    }
  }
  return T;
}

// 8. Determinante 2x2
export function determinant2x2(A: Matrix): number {
  const dim = getMatrixDimensions(A);
  if (dim.rows !== 2 || dim.cols !== 2) {
    throw new Error("determinant2x2 requiere una matriz cuadrada de 2x2");
  }
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

// 9. Determinante 3x3 (Regla de Sarrus / Desarrollo por Laplace)
export function determinant3x3(A: Matrix): number {
  const dim = getMatrixDimensions(A);
  if (dim.rows !== 3 || dim.cols !== 3) {
    throw new Error("determinant3x3 requiere una matriz cuadrada de 3x3");
  }
  return (
    A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
    A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
    A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
  );
}

// 10. Transformaciones Lineales 2D como Matrices 2x2
export function scaleMatrix2D(sx: number, sy: number): Matrix {
  return [
    [sx, 0],
    [0, sy],
  ];
}

export function rotationMatrix2D(radians: number): Matrix {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [
    [cos, -sin],
    [sin, cos],
  ];
}

export function shearMatrix2D(kx: number, ky: number = 0): Matrix {
  return [
    [1, kx],
    [ky, 1],
  ];
}

export function reflectionMatrix2D(axis: "x" | "y" | "origin"): Matrix {
  switch (axis) {
    case "x":
      return [
        [1, 0],
        [0, -1],
      ];
    case "y":
      return [
        [-1, 0],
        [0, 1],
      ];
    case "origin":
      return [
        [-1, 0],
        [0, -1],
      ];
  }
}

// 11. Aplicar transformación lineal 2D a un vector posición (M * v)
export function transformPoint2D(M: Matrix, p: Vector2): Vector2 {
  return vec2(
    M[0][0] * p.x + M[0][1] * p.y,
    M[1][0] * p.x + M[1][1] * p.y
  );
}
