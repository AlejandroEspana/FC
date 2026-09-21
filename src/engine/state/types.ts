/**
 * src/engine/state/types.ts
 * Arquitectura formal de estados continuos, máquinas de estados y transiciones
 * para enseñanza matemática y física visual programática.
 */

export interface EducationalState<T> {
  /** Identificador único del estado (ej: "INITIAL", "VECTOR_CREATED", "COMPONENTS_VISIBLE") */
  id: string;
  /** Nombre o título pedagógico visible opcional */
  name?: string;
  /** Datos matemáticos tipados correspondientes a este estado */
  data: T;
  /** Duración de este estado en frames a 60 FPS */
  durationFrames: number;
  /** Término o componente matemático actualmente enfocado/resaltado (ej: "component_x", "hypotenuse") */
  activeFocus?: string;
  /** Frase explicativa o narración asociada a este momento */
  narration?: string;
  /** Clave que enlaza el término con la fórmula matemática activa */
  activeTermKey?: string;
}

export interface StateTransition {
  /** Estado de origen */
  fromId: string;
  /** Estado de destino */
  toId: string;
  /** Duración de la interpolación entre estados en frames (ej: 30 frames = 0.5s) */
  durationFrames: number;
  /** Función de suavizado para la transición */
  easing?: "linear" | "smooth" | "decelerate" | "accelerate";
}

export interface SceneState<T> {
  /** Estado inicial por defecto */
  initial: T;
  /** Secuencia ordenada de estados educativos por los que evoluciona la escena */
  states: EducationalState<T>[];
  /** Transiciones personalizadas opcionales entre pares de estados */
  transitions?: StateTransition[];
}

export interface ActiveStateProgress<T> {
  /** Índice del estado actual (0-indexed) */
  stateIndex: number;
  /** El estado activo actual */
  currentState: EducationalState<T>;
  /** El siguiente estado hacia el que se transiciona (o undefined si es el último) */
  nextState?: EducationalState<T>;
  /** Progreso global dentro del estado actual (0 a 1) */
  stateProgress: number;
  /** Indica si actualmente se está en la ventana de transición hacia el siguiente estado */
  isInTransition: boolean;
  /** Progreso de la transición actual (0 a 1 con easing aplicado) */
  transitionProgress: number;
  /** Objeto de datos con valores numéricos interpolados suavemente entre currentState y nextState */
  currentData: T;
  /** Término o elemento enfocado en este frame */
  activeFocus?: string;
  /** Narración activa en este frame */
  narration?: string;
}
