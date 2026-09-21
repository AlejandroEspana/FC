/**
 * src/validation/validateLayout.ts
 * Validador de layout que comprueba safe-area y no-overlap para un conjunto de cajas delimitadoras.
 */

import { PositionedElement, validateBatchLayout } from "../layout/CollisionDetector";
import { validateInsideSafeArea } from "../layout/SafeArea";

export interface LayoutValidationReport {
  isValid: boolean;
  safeAreaErrors: string[];
  collisionErrors: string[];
}

export function validateLayoutReport(
  elements: PositionedElement[],
  minGap: number = 0
): LayoutValidationReport {
  const safeAreaErrors: string[] = [];

  for (const el of elements) {
    const check = validateInsideSafeArea(el.name, el.box);
    if (!check.isValid && check.message) {
      safeAreaErrors.push(check.message);
    }
  }

  const collisionCheck = validateBatchLayout(elements, minGap);

  return {
    isValid: safeAreaErrors.length === 0 && collisionCheck.valid,
    safeAreaErrors,
    collisionErrors: collisionCheck.collisions,
  };
}
