/**
 * src/validation/validateScene.ts
 * Validador formal de duraciones e integridad temporal de escenas.
 */

export interface SceneValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateSceneTiming(
  sceneName: string,
  totalDurationFrames: number,
  subSequences: { name: string; from: number; durationInFrames: number }[]
): SceneValidationResult {
  const errors: string[] = [];

  if (totalDurationFrames <= 0) {
    errors.push(`[TIMING_ERROR] La escena '${sceneName}' debe tener duración positiva. Valor actual: ${totalDurationFrames}`);
  }

  for (const seq of subSequences) {
    if (seq.from + seq.durationInFrames > totalDurationFrames) {
      errors.push(
        `[TIMING_OVERFLOW] La subsecuencia '${seq.name}' termina en frame ${seq.from + seq.durationInFrames}, superando la duración total de '${sceneName}' (${totalDurationFrames} frames).`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
