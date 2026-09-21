/**
 * src/content/types.ts
 * Contratos de datos y esquemas tipados para el contenido educativo de los cursos.
 * Desacopla 100% el "qué se dice" del "cómo se dibuja".
 */

export interface FormulaComponent {
  symbol: string;
  name: string;
  color: string;
  description: string;
}

export interface FormulaDeconstructionData {
  formula: string;
  title: string;
  subtitle?: string;
  components: FormulaComponent[];
}

export interface DefinitionCardData {
  title: string;
  category?: string;
  text: string;
  formula?: string;
  accentColor?: string;
}

export interface ErrorCardData {
  wrong: string;
  correct: string;
  why: string;
}

export interface BulletItemData {
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

export interface ExerciseStepData {
  label: string;
  math?: string;
  explanation?: string;
}

export interface ExerciseData {
  level: string;
  prompt: string;
  steps: ExerciseStepData[];
}

export interface ChapterMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  durationFrames: number;
}

export interface CourseMeta {
  id: string;
  title: string;
  subtitle: string;
  totalDurationFrames: number;
  chapters: ChapterMeta[];
}

export interface NarrationSegment {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  audioFile?: string;
}
