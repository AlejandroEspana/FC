import test from "node:test";
import assert from "node:assert/strict";

import { VECTORS_CHAPTERS, TOTAL_VECTORS_DURATION } from "../src/courses/vectors";
import { MATRICES_CHAPTERS, TOTAL_MATRICES_DURATION } from "../src/courses/matrices";
import { DISCRETE_CHAPTERS, TOTAL_DISCRETE_DURATION } from "../src/courses/discrete-models";
import { validateSceneTiming } from "../src/validation/validateScene";

test("Cursos: Completitud y duraciones positivas", () => {
  // Vectores: 14 capítulos
  assert.equal(VECTORS_CHAPTERS.length, 14);
  assert.ok(TOTAL_VECTORS_DURATION > 5000);

  // Matrices: 11 capítulos
  assert.equal(MATRICES_CHAPTERS.length, 11);
  assert.ok(TOTAL_MATRICES_DURATION > 4000);

  // Modelos Discretos: 10 capítulos
  assert.equal(DISCRETE_CHAPTERS.length, 10);
  assert.ok(TOTAL_DISCRETE_DURATION > 4000);

  // Validación de tiempos de escena
  const sceneTimingCheck = validateSceneTiming("TestScene", 600, [
    { name: "Parte 1", from: 0, durationInFrames: 300 },
    { name: "Parte 2", from: 300, durationInFrames: 300 },
  ]);
  assert.equal(sceneTimingCheck.valid, true);
  assert.equal(sceneTimingCheck.errors.length, 0);
});
