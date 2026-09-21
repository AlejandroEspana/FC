/**
 * src/layout/CollisionDetector.ts
 * Algoritmo matemático para prevenir el solapamiento de elementos visuales (AABB Collision Detection).
 */

import { BoundingBox2D } from "../math/geometry";

export interface PositionedElement {
  id: string;
  name: string;
  box: BoundingBox2D;
}

export interface CollisionResult {
  hasCollision: boolean;
  overlapArea: number;
  overlapBox?: BoundingBox2D;
  message?: string;
}

// 1. Detección de intersección entre dos cajas delimitadoras AABB con margen opcional
export function boxesIntersect(
  a: BoundingBox2D,
  b: BoundingBox2D,
  minGap: number = 0
): boolean {
  return !(
    a.x + a.width + minGap <= b.x ||
    b.x + b.width + minGap <= a.x ||
    a.y + a.height + minGap <= b.y ||
    b.y + b.height + minGap <= a.y
  );
}

// 2. Calcular la región exacta de solapamiento
export function computeOverlap(
  a: BoundingBox2D,
  b: BoundingBox2D,
  minGap: number = 0
): CollisionResult {
  if (!boxesIntersect(a, b, minGap)) {
    return { hasCollision: false, overlapArea: 0 };
  }

  const left = Math.max(a.x, b.x);
  const top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.width, b.x + b.width);
  const bottom = Math.min(a.y + a.height, b.y + b.height);

  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  const area = width * height;

  return {
    hasCollision: true,
    overlapArea: area,
    overlapBox: { x: left, y: top, width, height },
  };
}

// 3. Validador explícito entre dos elementos con mensaje de diagnóstico
export function validateNoOverlap(
  elementA: { name: string; box: BoundingBox2D },
  elementB: { name: string; box: BoundingBox2D },
  minGap: number = 0
): CollisionResult {
  const result = computeOverlap(elementA.box, elementB.box, minGap);
  if (result.hasCollision) {
    result.message = `[COLLISION_ERROR] Colisión detectada entre '${elementA.name}' y '${elementB.name}'. Área de solape: ${result.overlapArea.toFixed(1)}px².`;
  }
  return result;
}

// 4. Validador en lote para verificar un escenario completo
export function validateBatchLayout(
  elements: PositionedElement[],
  minGap: number = 0
): { valid: boolean; collisions: string[] } {
  const collisions: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const check = validateNoOverlap(elements[i], elements[j], minGap);
      if (check.hasCollision && check.message) {
        collisions.push(check.message);
      }
    }
  }

  return {
    valid: collisions.length === 0,
    collisions,
  };
}
