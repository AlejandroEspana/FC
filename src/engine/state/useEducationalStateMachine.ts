/**
 * src/engine/state/useEducationalStateMachine.ts
 * Hook de React + Remotion para controlar el ciclo de vida continuo de estados educativos,
 * interpolando datos suavemente para evitar saltos o parpadeos entre conceptos.
 */

import { useCurrentFrame } from "remotion";
import { SceneState, ActiveStateProgress, EducationalState } from "./types";
import { smoothProgress } from "../../animation/interpolation";
import { EASINGS } from "../../animation/easing";

/**
 * Función pura para interpolar recursivamente valores numéricos entre dos estructuras de datos
 */
export function interpolateValues<T>(fromVal: T, toVal: T, progress: number): T {
  if (typeof fromVal === "number" && typeof toVal === "number") {
    return (fromVal + (toVal - fromVal) * progress) as unknown as T;
  }

  if (Array.isArray(fromVal) && Array.isArray(toVal)) {
    return fromVal.map((item, idx) => {
      const targetItem = idx < toVal.length ? toVal[idx] : item;
      return interpolateValues(item, targetItem, progress);
    }) as unknown as T;
  }

  if (
    fromVal !== null &&
    typeof fromVal === "object" &&
    toVal !== null &&
    typeof toVal === "object"
  ) {
    const result: Record<string, unknown> = { ...(fromVal as unknown as Record<string, unknown>) };
    const fromObj = fromVal as unknown as Record<string, unknown>;
    const toObj = toVal as unknown as Record<string, unknown>;

    for (const key of Object.keys(toObj)) {
      const vFrom = fromObj[key];
      const vTo = toObj[key];

      if (vFrom !== undefined) {
        result[key] = interpolateValues(vFrom, vTo, progress);
      } else {
        result[key] = progress >= 0.5 ? vTo : vFrom;
      }
    }
    return result as unknown as T;
  }

  // Para booleanos, cadenas u otros tipos discretos, conmutar en el punto medio o final
  return progress >= 0.5 ? toVal : fromVal;
}

/**
 * Hook principal para consumir una máquina de estados educativos en cualquier componente Remotion
 */
export function useEducationalStateMachine<T>(
  sceneState: SceneState<T>,
  defaultTransitionFrames: number = 30
): ActiveStateProgress<T> {
  const frame = useCurrentFrame();
  const { states, transitions } = sceneState;

  if (states.length === 0) {
    return {
      stateIndex: 0,
      currentState: { id: "EMPTY", data: sceneState.initial, durationFrames: 60 },
      stateProgress: 0,
      isInTransition: false,
      transitionProgress: 0,
      currentData: sceneState.initial,
    };
  }

  // 1. Calcular los offsets de inicio y fin de cada estado
  let accumulated = 0;
  const stateWindows: { state: EducationalState<T>; start: number; end: number }[] = [];

  for (const st of states) {
    const start = accumulated;
    const end = start + st.durationFrames;
    stateWindows.push({ state: st, start, end });
    accumulated = end;
  }

  // 2. Determinar en qué ventana de estado cae el frame actual
  let activeIndex = stateWindows.length - 1;
  for (let i = 0; i < stateWindows.length; i++) {
    if (frame < stateWindows[i].end) {
      activeIndex = i;
      break;
    }
  }

  const currentWindow = stateWindows[activeIndex];
  const currentState = currentWindow.state;
  const nextWindow = activeIndex < stateWindows.length - 1 ? stateWindows[activeIndex + 1] : undefined;
  const nextState = nextWindow?.state;

  // 3. Calcular progreso local dentro del estado actual
  const framesIntoState = Math.max(0, frame - currentWindow.start);
  const stateProgress = Math.min(1, framesIntoState / currentWindow.state.durationFrames);

  // 4. Determinar ventana de transición hacia el siguiente estado
  let transDuration = defaultTransitionFrames;
  if (nextState && transitions) {
    const customTrans = transitions.find(
      (t) => t.fromId === currentState.id && t.toId === nextState.id
    );
    if (customTrans) transDuration = customTrans.durationFrames;
  }

  // La transición ocurre en los últimos `transDuration` frames del estado actual
  const transitionStartFrame = Math.max(0, currentWindow.state.durationFrames - transDuration);
  const isInTransition = Boolean(nextState && framesIntoState >= transitionStartFrame);

  let rawTransitionProgress = 0;
  if (isInTransition && transDuration > 0) {
    rawTransitionProgress = Math.min(
      1,
      (framesIntoState - transitionStartFrame) / transDuration
    );
  }

  const transitionProgress = smoothProgress(
    rawTransitionProgress,
    0,
    1,
    EASINGS.decelerate
  );

  // 5. Interpolar datos si está en transición
  let currentData: T = currentState.data;
  if (isInTransition && nextState) {
    currentData = interpolateValues(currentState.data, nextState.data, transitionProgress);
  }

  const activeFocus =
    isInTransition && transitionProgress >= 0.5 && nextState?.activeFocus
      ? nextState.activeFocus
      : currentState.activeFocus;

  const narration =
    isInTransition && transitionProgress >= 0.5 && nextState?.narration
      ? nextState.narration
      : currentState.narration;

  return {
    stateIndex: activeIndex,
    currentState,
    nextState,
    stateProgress,
    isInTransition,
    transitionProgress,
    currentData,
    activeFocus,
    narration,
  };
}
