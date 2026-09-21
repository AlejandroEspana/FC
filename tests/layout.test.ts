import test from "node:test";
import assert from "node:assert/strict";

import {
  boxesIntersect,
  computeOverlap,
  validateNoOverlap,
  validateBatchLayout,
} from "../src/layout/CollisionDetector";

import {
  isInsideSafeArea,
  validateInsideSafeArea,
  SAFE_AREAS,
} from "../src/layout/SafeArea";

test("Layout: Detección geométrica de colisiones AABB", () => {
  const boxA = { x: 100, y: 100, width: 200, height: 100 };
  const boxB = { x: 250, y: 150, width: 200, height: 100 }; // Se solapan
  const boxC = { x: 500, y: 500, width: 100, height: 100 }; // Lejos, sin solapamiento

  assert.equal(boxesIntersect(boxA, boxB), true);
  assert.equal(boxesIntersect(boxA, boxC), false);

  // Comprobar región de solape calculada
  const overlap = computeOverlap(boxA, boxB);
  assert.equal(overlap.hasCollision, true);
  assert.equal(overlap.overlapArea, 50 * 50); // (300-250) * (200-150) = 2500

  // Validador de no-overlap
  const valFail = validateNoOverlap({ name: "Caja A", box: boxA }, { name: "Caja B", box: boxB });
  assert.equal(valFail.hasCollision, true);

  const valPass = validateNoOverlap({ name: "Caja A", box: boxA }, { name: "Caja C", box: boxC });
  assert.equal(valPass.hasCollision, false);

  // Validador por lote
  const batchCheck = validateBatchLayout([
    { id: "1", name: "A", box: boxA },
    { id: "2", name: "C", box: boxC },
  ]);
  assert.equal(batchCheck.valid, true);
});

test("Layout: Bounding Box dentro de Safe Area 1080p", () => {
  const safeBox = { x: 120, y: 150, width: 600, height: 400 };
  assert.equal(isInsideSafeArea(safeBox, "educationContentZone"), true);

  const overflowBox = { x: 10, y: 50, width: 1800, height: 950 };
  assert.equal(isInsideSafeArea(overflowBox, "educationContentZone"), false);

  const check = validateInsideSafeArea("Elemento Test", safeBox);
  assert.equal(check.isValid, true);
  assert.equal(check.overflowX, 0);
  assert.equal(check.overflowY, 0);
});
