/**
 * src/validation/validateTransitions.ts
 * Validador formal de continuidad de estados, transiciones y consistencia pedagógica.
 * Detecta saltos bruscos, duraciones inválidas, duplicaciones y desalineaciones de color semántico.
 */

import { SceneState, EducationalState } from "../engine/state/types";
import { EDUCATIONAL_THEME, SemanticRole } from "../theme/colors";

export interface TransitionValidationReport {
  isValid: boolean;
  totalDurationFrames: number;
  totalStates: number;
  issues: string[];
}

/**
 * Valida la coherencia de una máquina de estados educativos y sus transiciones
 */
export function validateSceneTransitions<T>(
  scene: SceneState<T>,
  maxAllowedJumpPerFrame: number = 20
): TransitionValidationReport {
  const issues: string[] = [];
  const stateIds = new Set<string>();
  let totalDuration = 0;

  if (!scene.states || scene.states.length === 0) {
    issues.push("La escena no contiene ningún estado educativo en 'states'.");
    return { isValid: false, totalDurationFrames: 0, totalStates: 0, issues };
  }

  scene.states.forEach((st, idx) => {
    // 1. Identificadores únicos
    if (!st.id || st.id.trim() === "") {
      issues.push(`El estado en índice [${idx}] carece de 'id' válido.`);
    } else if (stateIds.has(st.id)) {
      issues.push(`ID duplicado detectado: '${st.id}' en estado [${idx}].`);
    } else {
      stateIds.add(st.id);
    }

    // 2. Duraciones estrictamente positivas
    if (!st.durationFrames || st.durationFrames <= 0) {
      issues.push(`El estado '${st.id}' tiene una duración no positiva: ${st.durationFrames} frames.`);
    } else {
      totalDuration += st.durationFrames;
    }

    // 3. Verificación de discontinuidades o saltos numéricos extremos entre estados consecutivos
    if (idx < scene.states.length - 1) {
      const nextSt = scene.states[idx + 1];
      const dataA = st.data as Record<string, unknown>;
      const dataB = nextSt.data as Record<string, unknown>;

      if (dataA && dataB && typeof dataA === "object" && typeof dataB === "object") {
        for (const key of Object.keys(dataA)) {
          const valA = dataA[key];
          const valB = dataB[key];

          if (typeof valA === "number" && typeof valB === "number") {
            const delta = Math.abs(valB - valA);
            // Si el salto numérico es enorme y la transición dura muy pocos frames
            if (delta > maxAllowedJumpPerFrame * 10 && st.durationFrames < 15) {
              issues.push(
                `Discontinuidad potencial en propiedad '${key}' entre '${st.id}' (${valA}) y '${nextSt.id}' (${valB}): salto de ${delta} en solo ${st.durationFrames} frames.`
              );
            }
          }
        }
      }
    }
  });

  // 4. Verificación de transiciones explícitas personalizadas
  if (scene.transitions) {
    for (const tr of scene.transitions) {
      if (!stateIds.has(tr.fromId)) {
        issues.push(`Transición inválida: origen '${tr.fromId}' no existe en los estados.`);
      }
      if (!stateIds.has(tr.toId)) {
        issues.push(`Transición inválida: destino '${tr.toId}' no existe en los estados.`);
      }
      if (tr.durationFrames <= 0) {
        issues.push(`Transición '${tr.fromId} -> ${tr.toId}' tiene duración no positiva: ${tr.durationFrames}`);
      }
    }
  }

  return {
    isValid: issues.length === 0,
    totalDurationFrames: totalDuration,
    totalStates: scene.states.length,
    issues,
  };
}

/**
 * Validador de consistencia de la paleta semántica
 */
export function validateSemanticColorConsistency(
  role: SemanticRole,
  colorHex: string
): { isValid: boolean; expected: string; received: string } {
  let expected = "";
  switch (role) {
    case "originalData":
      expected = EDUCATIONAL_THEME.originalData.toLowerCase();
      break;
    case "studyVariable":
      expected = EDUCATIONAL_THEME.studyVariable.toLowerCase();
      break;
    case "operation":
      expected = EDUCATIONAL_THEME.operation.toLowerCase();
      break;
    case "result":
      expected = EDUCATIONAL_THEME.result.toLowerCase();
      break;
    case "warning":
      expected = EDUCATIONAL_THEME.warning.toLowerCase();
      break;
    default:
      expected = EDUCATIONAL_THEME.textSecondary.toLowerCase();
  }

  const received = colorHex.toLowerCase();
  return {
    isValid: expected === received,
    expected,
    received,
  };
}
