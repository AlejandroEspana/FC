/**
 * tests/state.test.ts
 * Pruebas unitarias para el motor de estados continuos, interpolador morfológico
 * y validación de transiciones pedagógicas.
 */

import { test } from "node:test";
import assert from "node:assert";
import { interpolateValues } from "../src/engine/state/useEducationalStateMachine";
import { validateSceneTransitions, validateSemanticColorConsistency } from "../src/validation/validateTransitions";
import { SceneState } from "../src/engine/state/types";
import { EDUCATIONAL_THEME } from "../src/theme/colors";

test("StateMachine: Interpolación continua de valores numéricos, listas y objetos", () => {
  // 1. Números simples
  const numInterp = interpolateValues(10, 20, 0.5);
  assert.strictEqual(numInterp, 15, "El valor medio entre 10 y 20 a progreso 0.5 debe ser 15");

  // 2. Coordenadas vectoriales [x, y]
  const vecA = [0, 0];
  const vecB = [10, 20];
  const vecInterp = interpolateValues(vecA, vecB, 0.25);
  assert.strictEqual(vecInterp[0], 2.5);
  assert.strictEqual(vecInterp[1], 5.0);

  // 3. Estructuras complejas con propiedades mixtas
  const dataA = { x: 3, y: 4, label: "A", active: false };
  const dataB = { x: 6, y: 8, label: "B", active: true };

  const dataInterpMid = interpolateValues(dataA, dataB, 0.5);
  assert.strictEqual(dataInterpMid.x, 4.5);
  assert.strictEqual(dataInterpMid.y, 6.0);
  assert.strictEqual(dataInterpMid.label, "B", "Cadenas conmutan a target a >= 0.5");
  assert.strictEqual(dataInterpMid.active, true, "Booleanos conmutan a target a >= 0.5");
});

test("StateMachine: Validación de integridad de estados y detección de anomalías", () => {
  // Escena válida
  const validScene: SceneState<{ x: number }> = {
    initial: { x: 0 },
    states: [
      { id: "S1", name: "Estado 1", durationFrames: 100, data: { x: 0 } },
      { id: "S2", name: "Estado 2", durationFrames: 120, data: { x: 5 } },
    ],
  };

  const reportValid = validateSceneTransitions(validScene);
  assert.strictEqual(reportValid.isValid, true);
  assert.strictEqual(reportValid.totalDurationFrames, 220);
  assert.strictEqual(reportValid.totalStates, 2);

  // Escena inválida: duración no positiva y IDs duplicados
  const invalidScene: SceneState<{ x: number }> = {
    initial: { x: 0 },
    states: [
      { id: "DUP", durationFrames: 0, data: { x: 0 } },
      { id: "DUP", durationFrames: -30, data: { x: 5 } },
    ],
  };

  const reportInvalid = validateSceneTransitions(invalidScene);
  assert.strictEqual(reportInvalid.isValid, false);
  assert.ok(reportInvalid.issues.length >= 2, "Debe reportar múltiples anomalías");
});

test("Theme: Consistencia de paleta pedagógica semántica", () => {
  const checkOriginal = validateSemanticColorConsistency("originalData", EDUCATIONAL_THEME.originalData);
  assert.strictEqual(checkOriginal.isValid, true);

  const checkStudy = validateSemanticColorConsistency("studyVariable", EDUCATIONAL_THEME.studyVariable);
  assert.strictEqual(checkStudy.isValid, true);

  const checkOperation = validateSemanticColorConsistency("operation", EDUCATIONAL_THEME.operation);
  assert.strictEqual(checkOperation.isValid, true);

  const checkResult = validateSemanticColorConsistency("result", EDUCATIONAL_THEME.result);
  assert.strictEqual(checkResult.isValid, true);

  const checkWarning = validateSemanticColorConsistency("warning", EDUCATIONAL_THEME.warning);
  assert.strictEqual(checkWarning.isValid, true);

  // Fallo de consistencia intencional
  const checkMismatch = validateSemanticColorConsistency("originalData", "#FF00FF");
  assert.strictEqual(checkMismatch.isValid, false, "Debe detectar cuando un color no coincide con la semántica");
});
